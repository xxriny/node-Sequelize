const models = require("../../models")

exports.newBoard = async (req, res) => {
  const { user_id, title, text } = req.body
  try {
    await models.Board.create({
      user_id: user_id,
      title: title,
      text: text,
    })
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}

exports.getBoardList = async (req, res) => {
  try {
    const data = await models.Board.findAll()
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}
exports.getBoard = async (req, res) => {
  const { id } = req.params
  try {
    const data = await models.Board.findOne({ where: { idx: id } })
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}
