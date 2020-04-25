passport  = require("passport")
User      = require("../models/user")

// The home router
exports.home = (req, res) => {
    res.render("home")
}

// Show Profile Modal
exports.profileForm = (req, res) => {
    res.render("login")
}

// Edit User Form
exports.editUser = (req, res) => {
    res.render("editProfile", {user: req.user})
}

// Create User
exports.createUser = (req, res) => {
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
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    req.flash("error", err.message)
                    res.redirect("/")
                } else {
                    passport.authenticate("local")(req, res, () => {
                        req.flash("success", "Welcome to AYG " + req.user.username)
                        res.redirect("/")
                    })
                }
            })
        }
    })

}

// Logout
exports.logout = (req, res) => {
    req.logout()
    req.flash("success", "You are Logged out")
    res.redirect("/")
}

// Update the User
// TODO: Change Password
exports.updateUser = (req, res) => {
    User.findOne({username: req.body.username}, (err, userFound) => {
        if (userFound) {
            req.flash("error", "User already exist")
            res.redirect("/")
        } else {
            User.findById(req.params.user_id, (err, editedUser) => {
                if (err) throw err
                editedUser.username = req.body.username
                editedUser.profilePicture = req.body.profilePicture
                editedUser.save()
                res.redirect("/")
            })
        }
    })

}