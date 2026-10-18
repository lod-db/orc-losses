async function fetchFeed() {
  const feedUrl = process.env.LOSSES_FEED_URL;
  if (!feedUrl) {
    throw new Error('The LOSSES_FEED_URL secret is required.');
  }

  try {
    if (new URL(feedUrl).protocol !== 'https:') {
      throw new Error();
    }

    const response = await fetch(feedUrl, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(180_000),
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch {
    // Network exceptions and response bodies can contain the private endpoint.
    throw new Error('Scrape and feed request failed. Check the secret, service availability, and response format.');
  }
}

module.exports = { fetchFeed };
