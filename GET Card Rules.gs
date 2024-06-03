function getCardRules(cardId) {
  const endpoint = `cards/${cardId}/rules`
  const cardRules = basicAuthorize(endpoint)

  return cardRules.rules
}

function getSpendingRules(cardId) {
  const endpoint = `cards/${cardId}/rules/spendingLimits`
  const spendingRules = basicAuthorize(endpoint)

  return spendingRules
}

function updateCardRule(cardId, statusChange) {
  const unlockLock = statusChange === 'Lock Card' ? false : true
  const endpointQuery = `OpenClose${unlockLock}`

  const headers = getHeaders(endpointQuery)
  const payload = {
    "name": "OpenClose",
    "enabled": unlockLock,
  };
  const options = {
    "method": "PUT",
    "headers": headers,
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  // fingerprint order : name, amount, enabled, token
  const endpoint = `cards/${cardId}/rules/`

  const status = advancedAuthorize(endpoint, endpointQuery, options)
  return status
}

function newSpendingRule(ruleName = 'daily', maxAllowed = 80, cardId = '86eb53a3-90b0-46ce-83d1-478b6a7850ba', enabled) {
  const isEnabled = enabled ? false : true
  const endpointQuery = `80true`
  // console.log(endpointQuery)
  const headers = getHeaders(endpointQuery)
  // console.log(headers)
  // return
  const payload = {
    "max": parseFloat(maxAllowed),
    "enabled": isEnabled,
  };
  const options = {
    "method": "POST",
    "headers": headers,
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  // fingerprint order : max, enabled, token
  const endpoint = `cards/${cardId}/rules/spendingLimits/${ruleName}`
  console.log(options)
  // return

  const status = advancedAuthorize(endpoint, endpointQuery, options)
  console.log(status)
  return status
}
