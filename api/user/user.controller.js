const models = require("../../models"),
  bcrypt = require("bcryptjs")
exports.register = async (req, res) => {
  const { id, pw, name } = req.body,
    hash = await bcrypt.hash(pw, 10)
  await await models.User.create({
    id: id,
    pw: hash,
    name: name,
  })
  res.json({ result: true })
  try {
  } catch (err) {
    console.log(err)
  }
}

exports.getUserList = async (req, res) => {
  try {
    const userList = await models.User.findAll()
    res.json({ result: true, data: userList })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res) => {
  const { id, pw } = req.body
  try {
    const user = await models.User.findOne({ where: { id: id } })
    !user && res.json({ result: false })
    const logined = await bcrypt.compare(pw, user.pw)
    logined ? res.json({ result: true }) : res.json({ result: false })
  } catch (err) {
    console.log(err)
  }
}
