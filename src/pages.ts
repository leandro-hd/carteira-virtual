function pageRegister(req, res) {
  return res.render('register.html');
}

function pageLogin(req, res) {
  return res.render('login.html');
}

function pageTransaction(req, res) {
  return res.render('transaction.html');
}

function pageUpdate(req, res) {
  return res.render('update.html');
}

function pageMoney(req, res) {
  return res.render('money.html');
}

function pageHistory(req, res) {
  return res.render('history.html');
}

function pageFriend(req, res) {
  return res.render('friend.html');
}

export { pageRegister, pageLogin, pageTransaction, pageUpdate, pageMoney, pageHistory, pageFriend }