const categories = [
  { key: 'personnel', label: 'Personnel', limit: 5000 },
  { key: 'tanks', label: 'Tanks', limit: 250 },
  { key: 'afvs', label: 'Armored fighting vehicles', limit: 250 },
  { key: 'artillery', label: 'Artillery systems', limit: 1000 },
  { key: 'airDefense', label: 'Air defense systems', limit: 250 },
  { key: 'rocketSystems', label: 'Multiple launch rocket systems', limit: 250 },
  { key: 'unarmoredVehicles', label: 'Vehicles and fuel tanks', limit: 750 },
  { key: 'fixedWingAircraft', label: 'Aircraft', limit: 250 },
  { key: 'rotaryWingAircraft', label: 'Helicopters', limit: 250 },
  { key: 'uavs', label: 'Unmanned aerial vehicles', limit: 2500 },
  { key: 'ugvs', label: 'Unmanned ground vehicles', limit: 250 },
  { key: 'ships', label: 'Ships and boats', limit: 50 },
  { key: 'submarines', label: 'Submarines', limit: 50 },
  { key: 'specialEquipment', label: 'Special equipment', limit: 250 },
  { key: 'missiles', label: 'Cruise missiles', limit: 1000 },
];

function validateRecords(records, label) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(`${label} must be a nonempty array.`);
  }

  const dates = new Set();
  for (const record of records) {
    const date = record?.date;
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)
      || !Number.isFinite(Date.parse(date))
      || new Date(date).toISOString().slice(0, 10) !== date) {
      throw new Error(`${label} contains an invalid report date.`);
    }
    if (dates.has(date)) {
      throw new Error(`${label} contains duplicate report dates.`);
    }
    dates.add(date);
  }
}

function mergeRecords(existing, feed) {
  validateRecords(existing, 'Dataset');
  validateRecords(feed, 'Feed');

  for (let index = 1; index < existing.length; index++) {
    if (existing[index].date >= existing[index - 1].date) {
      throw new Error('The dataset must be ordered newest first.');
    }
  }

  const previous = existing[0];
  const added = feed.filter(record => record.date > previous.date)
    .sort((left, right) => left.date.localeCompare(right.date));

  let prior = previous;
  for (const record of added) {
    if (Date.parse(record.date) - Date.parse(prior.date) !== 86_400_000) {
      throw new Error('New reports must form a consecutive daily sequence after the dataset.');
    }
    if (record.date > new Date().toISOString().slice(0, 10)) {
      throw new Error('The feed contains a future report.');
    }

    for (const { key, limit } of categories) {
      const current = record[key];
      if (current == null) continue;
      if (!Number.isSafeInteger(current) || current < 0) {
        throw new Error(`Invalid ${key} total for ${record.date}.`);
      }
      if (prior[key] == null) continue;
      const difference = current - prior[key];
      if (difference < 0 || difference > limit) {
        throw new Error(`${key} change for ${record.date} is outside the daily bounds 0–${limit}.`);
      }
    }

    prior = record;
  }

  return { previous, added, records: [...added].reverse().concat(existing) };
}

module.exports = { categories, mergeRecords };
