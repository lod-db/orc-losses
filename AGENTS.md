# Agent contribution guidance

Read [CONTRIBUTORS.md](CONTRIBUTORS.md) before contributing and follow [METHODOLOGY.md](METHODOLOGY.md) for dataset changes. Use English for contribution communication and Conventional Commits for PR titles and commit messages, as described in the contribution guide.

## Issue and pull request labels

Apply the appropriate existing labels to every issue and pull request you create or update, including draft PRs and automated data update PRs. Keep labels aligned with the item's scope as work changes.

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
