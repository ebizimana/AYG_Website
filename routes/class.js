var express      = require("express")
router           = express.Router({mergeParams: true});
Class            = require("../models/class")
Assignment       = require("../models/assignment")
User             = require("../models/user")
middleware       = require("../middleware")
ClassController  = require('../controllers/class')

// Show all classes page
router.get("/", ClassController.showAllClasses)

// Create a new class form
router.get("/new", ClassController.createClassForm)

// Show Edit Class Form
router.get("/:class_id/edit", ClassController.editClassForm)

// Show Delete Class Form 
router.get("/:class_id/delete", ClassController.deleteClassForm)

//Save the class in the DB
router.post("/", middleware.isLoggenIn, ClassController.saveClass)

// Show an individual class
router.get("/:class_id", middleware.isLoggenIn, ClassController.showOneClass)

// Updated Class in the DB
router.put("/:class_id", middleware.isLoggenIn, ClassController.updateClass)

//Delete a class and it's assignments from the DB
router.delete("/:class_id", middleware.isLoggenIn, ClassController.deleteClass)

module.exports = router