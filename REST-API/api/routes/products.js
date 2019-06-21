const express = require("express")
const router = express.Router()
const multer = require("multer")
const checkAuth = require("../middleware/check-auth")
const ProductsControler = require("../controlers/products")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, false)
  } else {
    //accept
    cb(null, true)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get("/", ProductsControler.products_get_all)

router.post("/", checkAuth, upload.single("productImage"), ProductsControler.products_create_product)

router.get("/:productId", ProductsControler.products_get_one)

router.patch("/:productId", checkAuth, ProductsControler.products_update_products)

router.delete("/:productId", checkAuth, ProductsControler.products_delete_product)

module.exports = router
