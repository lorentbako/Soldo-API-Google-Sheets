function deleteCard(cardId) {
  const endpoint = `cards/${cardId}`
  const endpointQuery = `${cardId}`
  const headers = getHeaders(endpointQuery)

  const options = {
    method: "DELETE",
    headers: headers
  };

  const deletedStatus = advancedAuthorize(endpoint, endpointQuery, options)
  return deletedStatus
}
