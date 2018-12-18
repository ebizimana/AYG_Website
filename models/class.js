var mongoose = require("mongoose")

var classShema = new mongoose.Schema({
  className: String,
  courseName: String,
  professor: String
})
module.exports = mongoose.model("Class",classShema)
