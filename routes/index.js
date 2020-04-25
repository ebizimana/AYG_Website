// TODO: Delete User

express          = require("express")
router           = express.Router()
IndexController  = require('../controllers/index')


// The home router
router.get("/", IndexController.home)

// Profile Modal
router.get("/login", IndexController.profileForm)

// Authenticate User
router.post('/login', passport.authenticate('local', {
    failureRedirect: "/",
    failureFlash: "User Not found"}), (req, res) => {
    req.flash("success", "Welcome Back " + req.user.username)
    res.redirect("/")
})

// Edit User Profile Form
router.get("/editProfile", IndexController.editUser)

// Create User 
router.post("/register", IndexController.createUser)

// logout
router.get("/logout",  IndexController.logout)

// Update the user profile
router.put("/:user_id/updateProfile", IndexController.updateUser)

module.exports = router