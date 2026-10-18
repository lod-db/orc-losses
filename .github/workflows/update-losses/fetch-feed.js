async function request(url, options, label) {
  try {
    if (new URL(url).protocol !== 'https:') {
      throw new Error();
    }

    const response = await fetch(url, {
      ...options,
      redirect: 'error',
      signal: AbortSignal.timeout(180_000),
    });

    if (!response.ok) {
      throw new Error();
    }

    return options.method === 'POST' ? await response.text() : await response.json();
  } catch {
    // Network exceptions and response bodies can contain the private endpoint.
    throw new Error(`${label} failed. Check the secret, service availability, and response format.`);
  }
}

async function fetchFeed() {
  const feedUrl = process.env.LOSSES_FEED_URL;
  if (!feedUrl) {
    throw new Error('The LOSSES_FEED_URL secret is required.');
  }

  if (process.env.LOSSES_SCRAPE_URL) {
    await request(process.env.LOSSES_SCRAPE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scraper: 'mod' }),
    }, 'Scraper refresh');
  }

  return request(feedUrl, { method: 'GET' }, 'Feed download');
}

module.exports = { fetchFeed };
