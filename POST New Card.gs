function createCardServer(ownerId, cardName, label, walletId) {
  //Fingerprint Order: request_timestamp, owner_type, owner_public_id, wallet_id
  const endpoint = "cards";
  let ownerType = 'employee'
  if (!ownerId) {
    ownerType = 'company'
  }
  const timestamp = generateTimestamp()
  const endpointQuery = timestamp + ownerType + ownerId + walletId

  const payload = {
    request_timestamp: timestamp,
    owner_type: ownerType,
    owner_public_id: ownerId,
    wallet_id: walletId,
    type: "VIRTUAL",
    name: cardName,
    card_label: label,
  };

  const headers = getHeaders(endpointQuery)
  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload),
  };

  const order = advancedAuthorize(endpoint, endpointQuery, options)
  return order.id
}
