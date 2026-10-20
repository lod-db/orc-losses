const fs = require('node:fs');
const { isDeepStrictEqual } = require('node:util');
const { mergeRecords } = require('../update-losses/merge-records');

const repository = process.env.GITHUB_REPOSITORY;
const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const expected = event.pull_request;
const publishingBot = 'orc-loss-counter[bot]';

async function api(resource, options = {}) {
  const response = await fetch(`${process.env.GITHUB_API_URL}/repos/${repository}/${resource}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`GitHub approval request failed (HTTP ${response.status}). Check workflow permissions and the repository approval setting.`);
  }

  return response.json();
}

function verifyPullRequest(pull) {
  if (process.env.GITHUB_ACTOR !== publishingBot || event.sender.login !== publishingBot
    || pull.user.login !== publishingBot || pull.user.type !== 'Bot'
    || pull.state !== 'open' || pull.draft
    || pull.head.repo.full_name !== repository || pull.base.repo.full_name !== repository
    || pull.head.ref !== 'agent/daily-loss-update' || pull.base.ref !== 'main'
    || pull.head.sha !== expected.head.sha || pull.base.sha !== expected.base.sha
    || pull.changed_files !== 1) {
    throw new Error('The PR is not an unchanged, dataset-only update from the publishing App. Automatic approval withheld.');
  }
}

async function readDataset(sha) {
  return api(`contents/russian-losses.json?ref=${sha}`, {
    headers: { Accept: 'application/vnd.github.raw+json' },
  });
}

async function main() {
  const resource = `pulls/${expected.number}`;
  verifyPullRequest(await api(resource));

  const files = await api(`${resource}/files?per_page=2`);
  if (files.length !== 1 || files[0].filename !== 'russian-losses.json' || files[0].status !== 'modified') {
    throw new Error('Automatic approval is limited to modifying russian-losses.json.');
  }

  const [base, head] = await Promise.all([
    readDataset(expected.base.sha),
    readDataset(expected.head.sha),
  ]);
  const { added, records } = mergeRecords(base, head);
  if (added.length === 0 || !isDeepStrictEqual(records, head)) {
    throw new Error('The PR must append new daily reports without modifying existing records.');
  }

  verifyPullRequest(await api(resource));
  await api(`${resource}/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      event: 'APPROVE',
      commit_id: expected.head.sha,
      body: 'Automated review: schema and value validation passed. This publishing-App PR changes only russian-losses.json, appends consecutive daily reports, and preserves existing records.',
    }),
  });
  console.log('Approved the validated dataset update at its checked commit.');
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
