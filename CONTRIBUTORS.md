# Contribution guide

Contributions to source research, historical coverage, data corrections, translations, documentation, and the website are welcome. Start with the [README](README.md) and the [data collection methodology](METHODOLOGY.md).

## Contribution language

Use English for all contribution communication: issue titles and descriptions, PR titles and descriptions, commit messages, review comments, and discussions. Translated website and README content should use its target language, and source quotations may remain in their original language with an English explanation.

## Where to contribute

| Area | Files or repository |
| --- | --- |
| Report records | `russian-losses.json` |
| Field definitions | `schema/` (English, French, German, Ukrainian, Russian) |
| Website and translations | `docs/_layouts/default.html`, `docs/_data/translations.yml`, `docs/css/app.css`, `docs/js/app.js` |

## Reporting a data issue

Open an [issue](https://github.com/lod-db/orc-losses/issues) or a focused pull request. Include the report date, category, current value, proposed value, and a direct official report link. Prefer the [MoD article](https://mod.gov.ua), including an archive capture if needed, then the General Staff's [Telegram report](https://t.me/GeneralStaffZSU), then its [Facebook post](https://www.facebook.com/GeneralStaff.ua) for that date. Explain disagreements between sources and any official correction or revision. Secondary datasets help locate discrepancies, but the final change needs official evidence.

## Submitting data changes

PR titles and commit messages must follow Conventional Commits: `type(scope): description`, with an optional scope. Use `fix` for corrections, `feat` for new functionality, `docs` for documentation, or `chore` for maintenance. For example:

```text
fix(data): correct totals for YYYY-MM-DD
docs: clarify data collection sources
```

Write the title and description in English. Describe the resulting change, evidence, checks run, and any remaining limitations. Do not include credentials, access tokens, or unrelated data changes.

1. Work on a branch in your fork. Keep backfills, corrections, and unrelated website changes in separate PRs when possible.
2. Follow the methodology's source selection and historical field conventions. Preserve `null` values where appropriate and keep records unique and ordered newest first. Add actual reports, not estimates.
3. Keep exactly one record per report date. For corrections, edit the existing record for that date and change only the fields supported by the evidence; do not add a second record. For backfills, add records only for dates missing from the dataset and leave existing records unchanged. Include primary-source links, before/after values, surrounding totals, and published daily changes in the PR description.
4. Check the affected dates and both surrounding records. For longer gaps, check the entire chain and its endpoints. Explain legitimate decreases or revision-related differences.
5. Run the value check and validate against all five schemas. The standard value check compares only the two newest records, so historical edits need additional checks as described in the methodology.

Run the same basic checks as CI from the repository root (Node.js and `ajv-cli` are required):

```sh
node .github/workflows/pr-loss-auto-check/index.js
```

```powershell
Get-ChildItem schema/*.schema.json | ForEach-Object {
    ajv validate -s $_.FullName -d russian-losses.json --strict=false --spec=draft2020
    if ($LASTEXITCODE -ne 0) { throw "Schema validation failed: $($_.Name)" }
}
```

## Automated dataset updates

The `Update Losses` workflow keeps its implementation in `.github/workflows/update-losses/`. It refreshes the hosted MoD scraper and receives its JSON feed in a single POST request, appends new dates, and creates or updates one PR on `agent/daily-loss-update` using the `orc-losses-counter` GitHub App. Existing report records are preserved; corrections and historical backfills remain separate contributions.

Configure these Actions secrets in this repository:

| Secret | Purpose |
| --- | --- |
| `LOSSES_FEED_URL` | Full HTTPS URL of the combined `POST /api/scrape/mod` endpoint. Required. The request has no body or scraper selector and returns the refreshed JSON feed. |
| `APP_ID` | ID of the existing publishing GitHub App installed on this repository. |
| `APP_KEY` | Publishing App private key. The installation needs Contents and Pull requests write permissions. |

Endpoint URLs are read from secrets and are not included in logs, generated PR descriptions, or artifacts. Feed request errors omit the URL and response body. The PR links only to official report sources. URLs containing credentials should never be committed to this repository.

For rollout, deploy [scraper PR #39](https://github.com/lod-db/orc-losses-scraper/pull/39) first and set `LOSSES_FEED_URL` to its combined endpoint. Merge the workflow and run it manually with **dry-run enabled** (the default). Review the Actions job summary and schema/value validation. A dry run refreshes the hosted scraper and reads its feed, but it does not create a branch or PR. Publishing is allowed only from `main`; manual runs on other branches are preview-only.

Disable the old repository's publishing schedule before enabling this repository's schedule. Set the Actions variable `LOSSES_UPDATES_ENABLED` to `true` to enable the four daily runs at 01:37, 04:37, 12:37, and 20:37 UTC. Manual runs remain available while the schedule is disabled. Uncheck dry-run to publish a manual update from `main`.

The updater rejects empty or malformed feeds, duplicate dates, future new reports, and gaps between new daily reports. It checks each added report's category changes and validates the resulting dataset against all five schemas before publishing. Null category values remain null. If validation fails, investigate the source report rather than relaxing bounds automatically.

After schema and value validation pass, the `Losses Pull Request Review` workflow uses `github-actions[bot]` to approve eligible updates authored and triggered by `orc-losses-counter[bot]`. Approval is restricted to the same repository's `agent/daily-loss-update` branch targeting `main`, with only `russian-losses.json` modified. The approval job runs code from the trusted base commit, checks that existing records are unchanged, and approves the exact validated head commit. Other PRs continue to require normal review.

Enable **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**. No reviewer secret or personal token is needed. Organization policy must permit this setting. Keep the validation job required by branch protection, and enable dismissal of stale approvals when new commits are pushed. If branch protection requires review from a code-owner team, the Actions approval does not replace that team's approval.

Auto-merge is disabled by default. Set the Actions variable `LOSSES_AUTO_MERGE` to `true` to request squash auto-merge on the bot PR. GitHub auto-merge must also be enabled in the repository settings. Required checks, approvals, and code-owner rules still apply. Do not manually edit the bot's update branch: subsequent runs regenerate it from `main` and the feed.

## Website, translations, and documentation

Update shared templates and all six website locales when changing public source wording. The two English locales share a schema; the website also supports French, German, Ukrainian, and Russian. Keep links and source labels accurate for MoD articles, archive captures, and General Staff posts.

The GitHub Pages workflow copies the dataset into `docs/_data/russian-losses.json`, copies the dataset and schemas into `docs/assets/`, then builds `docs/` with Jekyll. For website changes, verify the rendered pages on desktop and mobile and check the relevant translations and structured metadata. Keep generated build output out of the PR.
