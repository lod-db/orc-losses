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

## Issue and pull request labels

Apply the appropriate existing labels to every issue and pull request, including draft PRs and automated data update PRs. Keep labels aligned with the item's scope as work changes.

| Label | Use |
| --- | --- |
| `data update` | Dataset data changes or issues requesting those changes, including automatic and manual updates, corrections, and historical backfills. |
| `website` | Issues or changes affecting the public webpage, including its layout, behavior, and translations. |
| `enhancement` | New features or feature requests outside dataset data updates. |
| `bug` | Significant software bugs or fixes outside dataset data corrections. |
| `documentation` | Repository level documentation, such as `README.md`, `METHODOLOGY.md`, `CONTRIBUTORS.md`, and `AGENTS.md`. |
| `duplicate` | Any issue or pull request that duplicates an existing issue or pull request. Link to the original item. |

Never apply `enhancement` and `bug` to the same issue or pull request. Dataset data fixes use `data update`; do not add `bug` or `enhancement` for those fixes. Reserve `website` for public webpage work and `documentation` for repository documentation; the `docs/` directory contains the public website, so its name alone does not justify `documentation`.

Combine labels when their scopes apply. For example, a new public webpage feature uses `website` and `enhancement`, a significant public webpage bug fix uses `website` and `bug`, a dataset correction uses `data update`, and a contribution guide change uses `documentation`. Apply `duplicate` whenever an issue or PR is a duplicate, regardless of its other labels.

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

## Automated update approval

The public update workflow creates PRs as `orc-loss-counter[bot]` and enables auto-merge. After `verify-json` passes, `request-update-approval` dispatches the private `lod-db/orc-losses-scraper` workflow `approve-loss-update.yml` on `main`, passing the PR number, exact head SHA, and validation run ID. That workflow verifies the update independently and supplies account approval; CODEOWNERS and required checks still control merging.

The public repository uses its existing `LOSS_COUNTER_APP_CLIENT_ID` and `LOSS_COUNTER_APP_PRIVATE_KEY` secrets to mint a dispatch token with Actions: write restricted to the scraper repository. The App must be installed there with that permission approved. The approving account's `ACCESS_TOKEN` stays only in the private repository. Merge and configure the private approval workflow before deploying this dispatch change. For an existing update PR, manually dispatch the private workflow with its current commit and successful validation run; rerunning an old public run does not load a new workflow definition. See the private repository's [approval setup](https://github.com/lod-db/orc-losses-scraper/blob/main/.github/workflows/approve-loss-update/README.md) for account-token permissions and rollout checks.

## Website, translations, and documentation

Update shared templates and all six website locales when changing public source wording. The two English locales share a schema; the website also supports French, German, Ukrainian, and Russian. Keep links and source labels accurate for MoD articles, archive captures, and General Staff posts.

The GitHub Pages workflow copies the dataset into `docs/_data/russian-losses.json`, copies the dataset and schemas into `docs/assets/`, then builds `docs/` with Jekyll. For website changes, verify the rendered pages on desktop and mobile and check the relevant translations and structured metadata. Keep generated build output out of the PR.
