// TODO: Delete User
express          = require("express")
middleware       = require("../middleware")
IndexController  = require('../controllers/index')
router           = express.Router()

// TODO: The home router when not logged in
router.get("/", IndexController.homeNotLoggedIn)

// The home router when logged in
router.get("/homePage", middleware.isLoggenIn, IndexController.home)

// Profile Modal
router.get("/login", IndexController.profileForm)

// Authenticate User
router.post('/login', passport.authenticate('local', {
    failureRedirect: "/",
    failureFlash: "User Not found"}), (req, res) => {
    req.flash("success", "Welcome Back " + req.user.username)
    res.redirect("/homePage")
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