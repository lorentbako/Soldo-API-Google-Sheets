function getUser(userId) {
  const endpoint = `employees/${userId}`
  const userDetails = basicAuthorize(endpoint)
  return userDetails
}

function getUsers(write = true) {
  const endpoint = 'employees'
  const users = basicAuthorize(endpoint)

  let allUsers = users.results

  let filteredUsers = [['ID', 'Name', 'Email', 'Phone', 'Groups', 'Creation Time', 'Last Updated']]

  //only active users
  allUsers = allUsers.filter(user => user.status === 'ACTIVE' && user.visible === true)
  allUsers.map(u => filteredUsers.push([u.id, u.name + ' ' + u.surname, u.email, u.mobile, u.groups, u.creation_time, u.last_update]))
  if (!write) {
    return filteredUsers
  }
  usersSheet.clear()
  usersSheet.getRange(1, 1, filteredUsers.length, filteredUsers[0].length).setValues(filteredUsers)
}
