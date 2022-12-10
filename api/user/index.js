const router = require("express").Router(),
  user = require("./user.controller")

router.post("/", user.register)
router.get("/", user.getUserList)
router.post("/login", user.login)

module.exports = router
