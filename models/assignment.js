var mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  total: Number,
  categories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }]
})

module.exports = mongoose.model("Assignment",assignmentSchema)
