var express = require("express"),
  router = express.Router(),
  passport = require("passport")
User = require("../models/user")

// The home router
router.get("/", function (req, res) {
  res.render("home")
})

// To get the profile modal
router.get("/login", function (req, res) {
  res.render("login")
})

// Edit User Profile Form
router.get("/editProfile", function (req, res) {
  res.render("editProfile", {
    user: req.user
  })
})

// Add a user to the db
router.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username,
    profilePicture: req.body.profilePicture
  })
  // Check to see if username is taken
  User.findOne({username: req.body.username}, (err, userFound) => {
    if (userFound) {
      req.flash("error", "User already exist")
      res.redirect("/")
    } else {
      User.register(newUser, req.body.password, function (err, user) {
        if (err) {
          req.flash("error", err.message)
          res.redirect("/")
        } else {
          passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to AYG " + req.user.username)
            res.redirect("/")
          })
        }
      })
    }
  })

})

// Authenticate the user from db/ Login
router.post('/login', passport.authenticate('local', {
  failureRedirect: "/",
  failureFlash: "User Not found"
}), function (req, res) {
  req.flash("success", "Welcome Back " + req.user.username)
  res.redirect("/")
})

// logout
router.get("/logout", function (req, res) {
  req.logout()
  req.flash("success", "You are Logged out")
  res.redirect("/")
})

// Update the user profile
router.put("/:user_id/updateProfile", function (req, res) {
  User.findOne({username: req.body.username}, (err, userFound) => {
    if (userFound) {
      req.flash("error", "User already exist")
      res.redirect("/")
    } else{
      User.findById(req.params.user_id, (err, editedUser) => {
        if (err) {
          throw err
        }
        editedUser.username = req.body.username
        editedUser.profilePicture = req.body.profilePicture
        editedUser.save()
        res.redirect("/")
      })
    }
  })

})

module.exports = router