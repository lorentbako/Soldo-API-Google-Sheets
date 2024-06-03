function getCardTransactions() {
  const CTSHEET = cardTransactionsSheet
  const card = CTSHEET.getRange("C1").getValue()
  const startDate = formatDatedate(CTSHEET.getRange("E1").getValue())
  const endDate = formatDatedate(CTSHEET.getRange("G1").getValue())

  //Vlookup the Card ID in the CardsSheet by the given Card
  const list = cardsSheet.getRange("A1:G").getValues()
  const cardId = list[list.findIndex(cc => cc[0] === card)][6]

  //type, publicId, customReferenceId, groupId, fromDate, toDate, dateType, category, status, tagId, metadataId, expenseType, expenseStatus, text
  const endpointQuery = `card${cardId}${startDate}${endDate}PaymentRefund`

  //const sheetHeaders = ["Currency", "Authorised Date", "Settled Date", "CC", "Amount", "Wallet", "CC Name", "Merchant"]

  let transactions = []
  let page = 0
  let totalPages = 1

  while (page !== totalPages + 1) {
    const endpoint = "transactions?type=card&publicId=" + cardId + "&category=Payment&category=Refund&fromDate=" + startDate + "&toDate=" + endDate + '&p=' + page + '&s=50';
    const response = advancedAuthorize(endpoint, endpointQuery)
    transactions = transactions.concat(response.results)
    console.log(response)
    totalPages = response.pages
    page++
  }
  if (transactions.length < 1) {
    const message = "Error encountered while getting the Transactions for the given Card!";
    Browser.msgBox(message);
    return
  }

  CTSHEET.getRange(4, 1, CTSHEET.getLastRow(), CTSHEET.getLastColumn()).clear()
  let finalData = []

  for (let i = 0; i < transactions.length; i++) {
    //A single Transaction.
    let t = transactions[i]
    let card = CTAG + t.masked_pan.slice(-4)
    let value = t.amount
    if (t.transaction_sign === "Positive") { value = -value }
    finalData.push([t.amount_currency, t.date, t.settlement_date, card, value, t.wallet_name, t.owner_name + " " + t.owner_surname, t.merchant.name, t.merchant.raw_name, t.status])
  }

  CTSHEET.getRange(4, 1, finalData.length, finalData[0].length).setValues(finalData)
  CTSHEET.getRange("H1").setValue("Last updated: " + formatDatedate(new Date()))
}
