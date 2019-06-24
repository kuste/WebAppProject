const express = require("express")
const router = express.Router()
const UserControler = require("../controlers/users")
const checkAuth = require("../middleware/check-auth")

router.post("/signup", UserControler.user_signup)

router.post("/login", UserControler.user_login)

router.delete("/:userId", checkAuth, UserControler.user_delete)

router.get("/", UserControler.user_get_all)

module.exports = router
