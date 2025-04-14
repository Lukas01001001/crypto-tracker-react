// netlify/functions/cryptoChart.js

export async function handler(event) {
  const { id, vs_currency, days } = event.queryStringParameters;

  // Validate required params
  if (!id || !vs_currency || !days) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required query parameters." }),
    };
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`;

    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "CoinGecko API request failed." }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error.", details: err.message }),
    };
  }
}
