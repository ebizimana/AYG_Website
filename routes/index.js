var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport")
    User      = require("../models/user")

// The home router
router.get("/",function(req,res){
  res.render("home")
})

// To get the profile modal
router.get("/login", function(req,res){
  res.render("login")
})

// Add a user to the db
router.post("/register", function(req,res){
  var newUser = new User({username: req.body.username })
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      req.flash("erro", err.message)
      return res.render("home")
    } else{
      passport.authenticate("local")(req, res,function(){
        req.flash("success", "Welcome to AYG " + req.user.username)
        res.redirect("/")
      })
    }
  })
})

// Authenticate the user from db
router.post('/login',passport.authenticate('local'),function(req,res){
  req.flash("success","Welcome Back " + req.user.username)
  res.redirect("/")
})

// logout
router.get("/logout", function(req,res){
  req.logout()
  req.flash("success","Logged you out")
  res.redirect("/")
})

module.exports = router
