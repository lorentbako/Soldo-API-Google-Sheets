function deleteUser(userId) {
  const endpoint = `employees/${userId}`
  const endpointQuery = `${userId}`
  const headers = getHeaders(endpointQuery)

  const options = {
    method: "DELETE",
    headers: headers
  };

  const deletedStatus = advancedAuthorize(endpoint, endpointQuery, options)
  return deletedStatus
}
