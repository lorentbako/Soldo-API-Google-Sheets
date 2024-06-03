function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Create a menu in Google Sheets
  var menu = ui.createMenu('Custom Menu');
  menu.addItem('Auth', 'loginSidebar');
  menu.addToUi();
}

var sheet = SpreadsheetApp.getActive()
var cardTransactionsSheet = sheet.getSheetByName("CardTransactions")
var transactionsSheet = sheet.getSheetByName("Transactions")
var cardsSheet = sheet.getSheetByName("Cards")
var usersSheet = sheet.getSheetByName('Users')
var walletsSheet = sheet.getSheetByName('Wallets')
var listSheet = sheet.getSheetByName('Lists')
var ordersSheet = sheet.getSheetByName('Orders')
//company tag for cards
var CTAG = 'NC'
