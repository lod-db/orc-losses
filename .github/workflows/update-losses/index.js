const fs = require('node:fs');
const path = require('node:path');
const { fetchFeed } = require('./fetch-feed');
const { mergeRecords } = require('./merge-records');
const { renderSummary } = require('./render-summary');

async function main() {
  const existing = JSON.parse(fs.readFileSync('russian-losses.json', 'utf8'));
  const feed = await fetchFeed();
  const { previous, added, records } = mergeRecords(existing, feed);

  if (added.length === 0) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changed=false\n');
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, 'The feed contains no new reports. No pull request is needed.\n');
    return;
  }

  const summary = renderSummary(previous, added);
  fs.writeFileSync('russian-losses.json', JSON.stringify(records, null, 2));
  fs.writeFileSync(path.join(process.env.RUNNER_TEMP, 'losses-pr.md'), summary);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=true\ndate=${added.at(-1).date}\n`);
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  console.log(`Prepared ${added.length} new report(s).`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
