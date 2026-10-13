# Data collection methodology

## Sources and collection

The [Ministry of Defence (MoD)](https://mod.gov.ua) republishes the daily loss reports produced by the General Staff. Prefer a complete MoD Ukrainian article that agrees with the General Staff's report. If it is unavailable, use a dated [Wayback Machine](https://web.archive.org) capture or the MoD's English article, including an archived copy. When no usable MoD article exists or the MoD versions contain a misprint, consult the [General Staff Telegram channel](https://t.me/GeneralStaffZSU) first, then a direct [General Staff Facebook post](https://www.facebook.com/GeneralStaff.ua). Both provide official text and infographics. Check the full report and its date: posts can be edited or replaced.

The separate [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) project retrieves and parses MoD articles through an Azure-hosted API. Scheduled GitHub Actions runs download its feed and open update PRs for newer report dates, with automated approval and auto-merge after required checks pass. Existing records are preserved; historical gaps and corrections need separate review.

## Interpreting records

Keep exactly one record per report date, ordered newest first. `date` is the report date, not the collection or archive capture date; `sourceUri` links to the specific official report or archived copy. Each number is a cumulative total since 24 February 2022. Personnel means reported casualties (killed and wounded), not deaths alone. These are estimates from a party to the war, subject to rounding, bias, and revision; checking copies verifies transcription and consistency, not individual battlefield losses.

`null` means unavailable or excluded under historical dataset conventions, not zero. Preserve those conventions when filling gaps: `unarmoredVehicles` combines cars and fuel tankers listed separately in early reports, as corrected in [#801](https://github.com/lod-db/orc-losses/pull/801); `specialEquipment` and `missiles` are null before 30 April 2022. Submarines are null before their first inclusion on 14 September 2023. The first record, 27 February 2022, combines 24–26 February; earlier partial tallies cannot be reliably split into daily records.

## Backfills, corrections, and validation

Fill missing dates from actual official reports, never interpolation. Compare affected fields with the same date's official text or infographic and, where possible, a separately located official copy. Check that the previous total plus the published daily change equals the current total and that the next report continues the chain. For gaps, check every added date and both existing endpoints. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) and [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) help locate discrepancies but are secondary copies that may contain errors or backdate revisions.

Correct copying errors and misprints using official evidence. Use documented same-day official corrections; record later revisions on their publication date without rewriting earlier reports to make totals increase smoothly. Legitimate revisions can decrease totals or disagree with a printed daily change. Arithmetic alone does not justify a correction. Keep dates, fields, old/new values, primary-source links, and exceptions in the PR. Some corrected records retain a MoD `sourceUri` that still misprints the value; the correction PR and Git history supply the supporting evidence.

The `verify-json` workflow validates all five schemas but checks change bounds for **only the two newest records**. Historical edits also need source checks, unique dates, newest-first ordering, and the surrounding daily chain; apply the delta bounds across the affected period and explain exceptions. Backfills leave existing records untouched; corrections change only evidenced fields. Recent examples include [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796), and [2024](https://github.com/lod-db/orc-losses/pull/794) backfills and a [full-history correction review](https://github.com/lod-db/orc-losses/pull/791). See the [contribution guide](CONTRIBUTORS.md) for submission requirements.

## Website calculations

Differences between cumulative records span the entire interval between report dates. Charts interpolate missing dates between available non-null totals and mark those points and affected daily differences as estimates (`≈`); these values are never stored in the dataset. Verified backfills replace them automatically. The daily chart clamps negative differences to zero, so consult the JSON and cumulative series for downward revisions. The past-war comparison uses separate estimates of military deaths, which are not directly equivalent to Ukraine's personnel figure including killed and wounded.
