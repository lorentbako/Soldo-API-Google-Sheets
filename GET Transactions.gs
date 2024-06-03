function getTransactions() {
  const startDate = formatDatedate(transactionsSheet.getRange("E1").getValue())
  const endDate = formatDatedate(transactionsSheet.getRange("G1").getValue())

  //type, publicId, customReferenceId, groupId, fromDate, toDate, dateType, category, status, tagId, metadataId, expenseType, expenseStatus, text
  const endpointQuery = `${startDate}${endDate}PaymentRefund`

  //var sheetHeaders = ["Currency", "Authorised Date", "Settled Date", "CC", "Amount", "Wallet", "CC Name", "Merchant"]
  let finalData = []
  let page = 0
  let totalPages = 1

  while (page !== totalPages + 1) {
    const endpoint = "transactions?category=Payment&category=Refund&fromDate=" + startDate + "&toDate=" + endDate + '&p=' + page + '&s=50';
    const transactions = advancedAuthorize(endpoint, endpointQuery)
    console.log(transactions)
    finalData = finalData.concat(transactions.results)

    totalPages = transactions.pages
    page++
  }
  if (finalData.length < 1) {
    const message = "Error encountered while getting the transactions!";
    Browser.msgBox(message);
    return
  }

  let dataToWrite = []
  transactionsSheet.getRange(4, 1, transactionsSheet.getLastRow(), transactionsSheet.getLastColumn()).clear()

  for (let i = 0; i < finalData.length; i++) {
    //single transaction
    let t = finalData[i]

    let card = CTAG + t.masked_pan?.slice(-4)
    let value = t.amount
    if (t.transaction_sign === "Positive") { value = -value }
    dataToWrite.push([t.amount_currency, t.date, t.settlement_date, card, value, t.wallet_name, t.owner_name + " " + t.owner_surname, t.merchant?.name, t.status])
  }
  transactionsSheet.getRange(4, 1, dataToWrite.length, dataToWrite[0].length).setValues(dataToWrite)
  transactionsSheet.getRange("H1").setValue("Last updated: " + formatDatedate(new Date()))
}
