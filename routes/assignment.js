
express               = require("express")
router                = express.Router({mergeParams: true})
AssignmentController  = require('../controllers/assignment')

// New Assignmet Form
router.get("/new", AssignmentController.newAssignmentForm)

// Edit Assignment Form
router.get("/:assig_id/edit", AssignmentController.editAssignmentForm)

// Delete Assignment Form
router.get("/:assig_id", AssignmentController.deleteAssignmentForm)

// Create an Assignment 
router.post("/", AssignmentController.createAssignment)

// Update One Assignment
router.put("/:assig_id", AssignmentController.updateOneAssignment)

// Update Many Assignments
router.post("/reorder", AssignmentController.updateManyAssignment)

// Delete Assignment in DB
router.delete("/:assig_id", AssignmentController.deleteAssignment)

module.exports = router