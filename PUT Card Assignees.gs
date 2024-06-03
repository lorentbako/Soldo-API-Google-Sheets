function modifyAssignee(cardId, assigneeId, type) {
  const endpoint = `cards/${cardId}`
  const endpointQuery = `${cardId}${assigneeId}`

  const payload = type === 'remove' ? {
    removeCardAssignees: [assigneeId]
  } : {
    addCardAssignees: [assigneeId],
  }

  const headers = getHeaders(endpointQuery)
  const options = {
    method: "put",
    headers: headers,
    payload: JSON.stringify(payload),
  };

  const response = advancedAuthorize(endpoint, endpointQuery, options)
  return response
}
