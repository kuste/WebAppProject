const mongoose = require("mongoose")

const jobsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  descr: { type: String, require: true },
  qualifications: { type: String, require: true },
  payment: { type: String, require: true },
  lokacija: { type: String , require: true},
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  additionalInfo: { type: String },
  whatIsOffered: { type: String },
  contactEmail: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Post", jobsSchema)
