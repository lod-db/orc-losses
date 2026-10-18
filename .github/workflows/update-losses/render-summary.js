const { categories } = require('./merge-records');

function renderSummary(previous, added) {
  const newest = added.at(-1);
  const format = value => value == null ? 'Not reported' : value.toLocaleString('en-US');
  const lines = [
    `Adds ${added.length} official daily report${added.length === 1 ? '' : 's'} for ${added[0].date}${added.length > 1 ? ` through ${newest.date}` : ''}.`,
    '',
    'Existing report records are unchanged. Differences below compare the latest report with the previous dataset total.',
    '',
    `| Category | ${previous.date} | ${newest.date} | Change |`,
    '| --- | ---: | ---: | ---: |',
  ];

  for (const { key, label } of categories) {
    const before = previous[key];
    const after = newest[key];
    const difference = before == null || after == null ? 'Not available' : `+${format(after - before)}`;
    lines.push(`| ${label} | ${format(before)} | ${format(after)} | ${difference} |`);
  }

  lines.push('', '### Official reports', '');
  for (const record of added) {
    let source;
    try {
      source = new URL(record.sourceUri);
    } catch {
      throw new Error(`Missing or invalid official source URL for ${record.date}.`);
    }
    if (source.protocol !== 'https:' || source.username || source.password
      || !['mod.gov.ua', 'www.mod.gov.ua', 'mil.gov.ua', 'www.mil.gov.ua', 't.me', 'www.facebook.com', 'facebook.com', 'web.archive.org'].includes(source.hostname)) {
      throw new Error(`Unexpected official source URL for ${record.date}.`);
    }
    lines.push(`- [${record.date}](<${source.href}>)`);
  }

  lines.push('', 'Schema and value validation run before publishing. Required PR checks and review rules still apply.', '');
  return lines.join('\n');
}

module.exports = { renderSummary };
