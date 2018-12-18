var mongoose = require("mongoose")

var classShema = new mongoose.Schema({
  className: String,
  courseName: String,
  professor: String,
  assignments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment"
  }]
})
module.exports = mongoose.model("Class",classShema)
