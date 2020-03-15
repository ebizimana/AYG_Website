var express = require("express"),
    router = express.Router();

// The home router
router.get("/",function(req,res){
  res.render("home")
})

// TODO: GET  Shows the login page
// TODO: GET  The sign up page

module.exports = router
