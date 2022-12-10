const router = require("express").Router(),
  user = require("./user"),
  board = require("./board")

router.use("/user", user)
router.use("/board", board)

module.exports = router
