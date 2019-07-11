const mongoose = require("mongoose")

const jobsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  descr: { type: String, required: true },
  qualifications: { type: String, required: true },
  payment: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  additionalInfo: { type: String },
  whatIsOffered: { type: String },
  contactEmail: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Post", jobsSchema)
