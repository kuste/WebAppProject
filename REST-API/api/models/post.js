const mongoose = require("mongoose")

const jobsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  descr: { type: String, require: true },
  qualifications: { type: String, require: true },
  payment: { type: String },
  lokacija: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  additionalInfo: { type: String },
  whatIsOffered: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Post", jobsSchema)
