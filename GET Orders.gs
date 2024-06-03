function getOrders() {
  const orders = basicAuthorize("orders")

  let ordersValue = []
  for (let i = 0; i < orders.results.length; i++) {
    let order = orders.results[i]
    ordersValue.push([order.id, order.status, order.creation_time, order.last_update_time, order.is_valid, order.total_paid_amount, order.total_paid_currency])
  }
  ordersSheet.getRange(2, 1, ordersValue.length, ordersValue[0].length).setValues(ordersValue)
}
