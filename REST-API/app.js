const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require("./api/routes/user")

const db = require("./api/config/database")

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error " + err))

app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

//routes wich should handle requests
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/user", userRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found!")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
      code: error.status
    }
  })
})

module.exports = app
