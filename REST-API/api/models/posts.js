const mongoose = require("mongoose")

const jobsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  descr: { type: String, require: true },
  qualifications: { type: String, require: true },
  payment: { type: Number },
  lokacija: { type: String },
  expDate: { type: Date },
  additionalInfo: { type: String },
  whatIsOffered: { type: String }
})

module.exports = mongoose.model("Jobs", jobsSchema)
