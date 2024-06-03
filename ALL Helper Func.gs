//|---Generate a 32 char nonce example: v8oX7hhesoOrA6401cfog7xhFs4i7yXt---|
function generateNonce() {
  let nonce = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    nonce += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return nonce;
}
//|---Generate current timestamp example: 1698835403227
function generateTimestamp() {
  var date = new Date();
  var timestamp = date.getTime();
  return timestamp.toString()
}
//|---Formats date to this format example : 2023-11-01T12:44:34---|
function formatDatedate(date) {
  date.setHours(date.getHours() + 2); // Add two hours to the current date
  const formattedDate = date.toISOString().split('.')[0];
  return formattedDate
}
//|---Makes an array with wallet's information in order to populate dropdown in cards managment---|
function walletDropdown() {
  let finalDropdown = []
  const rawValues = walletsSheet.getRange('A:H').getValues()
  rawValues.map(row => (row[5] !== 'dedicated' && row[5] !== 'company' && row[1]) ? finalDropdown.push({ name: row[1] + " - " + row[2], ownerId: row[6], walletId: row[0] }) : '')
  return finalDropdown
}
//|---Makes an array with users's information in order to populate dropdown in cards managment---|
function usersDropdown() {
  let users = []
  const rawValues = usersSheet.getRange('A:G').getValues()
  rawValues.map(row => (row[0] ? users.push({ userId: row[0], name: row[1], email: row[2] }) : ''))
  return users
}
//|---Makes an array with card's information in order to populate dropdown in cards managment---|
function getDropdownValues() {
  let CARDS = []
  const allColumns = cardsSheet.getRange('A:H').getValues()
  allColumns.forEach(cardRow => cardRow[0] ? CARDS.push({ name: [cardRow[0], cardRow[1], cardRow[4]].join(" - "), id: cardRow[6], owner: cardRow[7] }) : '')
  const WALLETS = walletDropdown()
  const USERS = usersDropdown()
  return [CARDS, WALLETS, USERS];
}
//|---Gets the newly created card name and masked pan---|
function cardOrder(orderId) {
  const order = basicAuthorize(`orders/${orderId}`)
  const newCardId = order.items[0].id
  const newCard = getSingleCard(newCardId)
  return [newCard.name, newCard.masked_pan]
}
//|---Gets the newly created user ID---|
function userOrder(orderId) {
  const order = basicAuthorize(`orders/${orderId}`)

  const newUserId = order.items[0].id
  return [order.status, newUserId]
}
//|---Includes given HTML File into the main file---|
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}
