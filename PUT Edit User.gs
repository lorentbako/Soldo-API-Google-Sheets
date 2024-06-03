function updateUser(userId, payload) {
  const endpoint = `employees/${userId}`
  //custom_reference_id, job_title, mobile_number, mobile_prefix, email, enable_mobile_credential, enable_web_credential, token
  const endpointQuery = `${payload["job_title"]}${payload["email"]}${payload["enable_mobile_credential"]}${payload["enable_web_credential"]}`

  // return [endpoint, endpointQuery, payload]

  const headers = getHeaders(endpointQuery)
  const options = {
    method: "put",
    headers: headers,
    payload: JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const response = advancedAuthorize(endpoint, endpointQuery, options)
    return response
  } catch (error) {
    return error
  }
}
