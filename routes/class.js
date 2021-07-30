var express      = require("express")
middleware       = require("../middleware")
ClassController  = require('../controllers/class')
router           = express.Router({mergeParams: true});

// Show all classes page
router.get("/", middleware.isLoggenIn, ClassController.showAllClasses)

// Create a new class form
router.get("/new", middleware.isLoggenIn, ClassController.createClassForm)

// Show Edit Class Form
router.get("/:class_id/edit", middleware.isLoggenIn, ClassController.editClassForm)

// Show Delete Class Form 
router.get("/:class_id/delete", middleware.isLoggenIn, ClassController.deleteClassForm)

//Save the class in the DB
router.post("/", middleware.isLoggenIn, ClassController.saveClass)

// Show an individual class
router.get("/:class_id", middleware.isLoggenIn, ClassController.showOneClass)

// Updated Class in the DB
router.put("/:class_id", middleware.isLoggenIn, ClassController.updateClass)

// Update Class few info 
router.put("/:class_id/updateInfo", middleware.isLoggenIn, ClassController.updateClassInfo)

//Delete a class and it's assignments from the DB
router.delete("/:class_id", middleware.isLoggenIn, ClassController.deleteClass)

module.exports = router