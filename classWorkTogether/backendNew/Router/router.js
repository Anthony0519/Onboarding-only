const express = require("express")
const { createUser, Login } = require("../controller/controller")
const router = express.Router()

router.post("/createuser",createUser)
router.post("/login",Login)

module.exports = router