const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")
const postsController = require("../controllers/posts")

// Handle incoming GET requests to /orders
router.get("/", postsController.posts_get_all)
router.post("/", checkAuth, postsController.posts_create_post)
router.get("/user/:userId", checkAuth, postsController.posts_get_byUserId)
router.get("/:postId", checkAuth, postsController.posts_get_One)
router.patch("/:postId", checkAuth, postsController.posts_update_post);
router.delete("/:postId", checkAuth, postsController.posts_delete_post);

module.exports = router
