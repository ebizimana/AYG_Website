var mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  total: Number,
  category: {
    id: String,
    weight: Number
  }
})

module.exports = mongoose.model("Assignment",assignmentSchema)
