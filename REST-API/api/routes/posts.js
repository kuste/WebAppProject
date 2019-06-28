const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")
const postsController = require("../controllers/posts")

// Handle incoming GET requests to /orders
router.get("/", postsController.posts_get_all)
router.post("/", postsController.posts_create_post)
router.get("/:userId", postsController.posts_get_byUserId)

module.exports = router
