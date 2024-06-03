function getCuntriesRule(cardId = '53b0c8f1-6be9-41de-8b60-8c353705446b') {
  const endpoint = `cards/${cardId}/rules/countries`
  const countries = basicAuthorize(endpoint)
  countries.results.map(con => {
    if (!con.enabled) {
      console.log(con.code)
    }
  })
  return countries.results
}

function updateCountries(cardId, countries) {
  //  [{ code: 'DZA', enabled: false }]
  const endpoint = `cards/${cardId}/rules/countries`;
  const timestamp = generateTimestamp();
  const endpointQuery = cardId + timestamp;

  const payload = {
    request_timestamp: timestamp,
    countries
  };

  const headers = getHeaders(endpointQuery)
  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload),
  };

  const countriesUpdated = advancedAuthorize(endpoint, endpointQuery, options)
  return countriesUpdated
}
