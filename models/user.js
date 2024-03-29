var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String,
  enrolledClasses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Class"
  }]
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User",userSchema);
