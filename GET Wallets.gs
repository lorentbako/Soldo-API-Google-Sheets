function getWallets() {
  const endpoint = 'wallets'
  const walletsResponse = basicAuthorize(endpoint)

  let allWallets = walletsResponse.results.filter(wallet => wallet.visible === true)

  let wallets = [['ID', 'Name', 'Currency', 'Amount', 'Blocked Amount', 'User', 'User ID']]
  allWallets.map(w => wallets.push([w.id, w.name, w.currency_code, w.available_amount, w.blocked_amount, w.primary_user_type, w?.primary_user_public_id]))

  walletsSheet.clear()
  walletsSheet.getRange(1, 1, wallets.length, wallets[0].length).setValues(wallets)
}
