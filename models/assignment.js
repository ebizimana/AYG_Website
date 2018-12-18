var mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  total: Number
})

module.exports = mongoose.model("Assignment",assignmentSchema)
