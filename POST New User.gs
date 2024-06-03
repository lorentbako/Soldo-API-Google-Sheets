function createNewUser(payload) {
  //Fingerprint Order: request_timestamp, owner_type, owner_public_id, wallet_id
  const endpoint = "employees";

  const timestamp = generateTimestamp()
  const endpointQuery = timestamp + payload.name + payload.surname + payload.mobile_access + payload.web_access
  payload.request_timestamp = timestamp

  const headers = getHeaders(endpointQuery)
  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const order = advancedAuthorize(endpoint, endpointQuery, options)
    return order
  } catch (error) {
    return error
  }
}
