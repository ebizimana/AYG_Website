//TODO: add an array of of classes ref
var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User",userSchema);
