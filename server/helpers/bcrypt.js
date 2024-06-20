const bcrypt = require('bcryptjs')

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt)
}

const compare = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass)
}

module.exports = { hash, compare }