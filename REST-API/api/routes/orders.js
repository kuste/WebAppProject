const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")
const OrdersControler = require("../controlers/orders")

router.get("/", OrdersControler.orders_get_all)

router.post("/", checkAuth, OrdersControler.orders_create_order)

router.get("/:orderId", OrdersControler.orders_get_one)

router.delete("/:orderId", checkAuth, OrdersControler.orders_delete_order)

module.exports = router
