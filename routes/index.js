// TODO: Delete User

express          = require("express")
router           = express.Router()
IndexController  = require('../controllers/index')


// The home router
router.get("/", IndexController.home)

// Profile Modal
router.get("/login", IndexController.profileForm)

// Authenticate User
router.post('/login', IndexController.authenticateUser)

// Edit User Profile Form
router.get("/editProfile", IndexController.editUser)

// Create User 
router.post("/register", IndexController.createUser)

// logout
router.get("/logout",  IndexController.logout)

// Update the user profile
router.put("/:user_id/updateProfile", IndexController.updateUser)

module.exports = router