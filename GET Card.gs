function getValueFromSheet(cardId) {
  let privateKeyPem = company.privateKey
  const card = getSingleCard(cardId)

  const expireDateRaw = card.expiration_date.split('-')
  const expireDate = expireDateRaw[1] + "/" + expireDateRaw[0]
  const maskedPan = card.sensitive_data.encrypted_full_pan
  const cvv = card.sensitive_data.encrypted_cvv

  const cardDetails = { expireDate, maskedPan, cvv, privateKeyPem }
  return cardDetails;
}

function getSingleCard(cardId) {
  const endpoint = "cards/" + cardId + "?showSensitiveData=true"
  const card = basicAuthorize(endpoint)
  return card
}
