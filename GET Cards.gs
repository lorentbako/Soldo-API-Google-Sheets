function getSoldoCards() {
  const cardsStatus = cardsSheet.getRange('L2').getValue() === 'Normal' ? 'Normal' : 'Card%20Destroyed';
  let totalCards = []

  function getCompanyCards() {
    const access_token = getToken()
    let page = 0
    let totalPages = 1

    while (page !== totalPages + 1) {
      var url = 'https://api.soldo.com/business/v2/cards?p=' + page + `&status=${cardsStatus}&s=50&d=DESC&props=creation_time`;
      var headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      };
      var options = {
        'method': 'get',
        'headers': headers,
        'muteHttpExceptions': true
      };
      var response = UrlFetchApp.fetch(url, options);
      var data = response.getContentText();
      var allCardsRaw = JSON.parse(data);
      console.log(allCardsRaw.results[0])

      allCardsRaw.results.map(CC => totalCards.push([CTAG + CC.masked_pan.slice(-4), CC.name, CC.masked_pan, CC.status, CC.label, CC.creation_time.split("T")[0], CC.id, CC.owner_type, CC.currency_code]))

      totalPages = allCardsRaw.pages
      page++
    }
  }
  getCompanyCards()

  cardsSheet.getRange(2, 1, cardsSheet.getLastRow(), 7).clear()
  cardsSheet.getRange(2, 1, totalCards.length, totalCards[0].length).setValues(totalCards)
}
