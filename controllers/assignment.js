// Initialise Models
User        = require("../models/user")
Class       = require("../models/class")
Category    = require("../models/category")
Assignment  = require("../models/assignment")

// New Assignmet Form
exports.newAssignmentForm = (req, res) => {
    Class.findById(req.params.class_id).populate("categories").exec((err, classFound) => {
        if (err) throw err
        res.render("assignment/new", {classFound: classFound})
    })
}

// Edit Assignment form
exports.editAssignmentForm = (req, res) => {
    Class.findById(req.params.class_id).populate("categories").exec((err, classFound) => {
        if (err) throw err
        Assignment.findOne({_id:req.params.assig_id}, (err, assignFound) => {
            if (err) throw err
            res.render("assignment/edit", {
                assignFound: assignFound,
                classFound: classFound
            })
        })
    })
}

// Delete Assignment Form
exports.deleteAssignmentForm = (req, res) => {
    Assignment.findOne({_id: req.params.assig_id}, (err, assignFound) => {
        if (err) console.log(err)
        res.render("assignment/delete", {assignFound: assignFound})
    })
}

// Create an Assignment 
exports.createAssignment = (req, res) => {
    User.findById(req.params.user_id, (err, userFound) => {
        if (err) throw err
        Class.findById(req.params.class_id).populate("assignments").exec((err, classFound) => {
            if (err) throw err
            Assignment.create(req.body.assignment, (err, assig) => {
                if (err) console.log(err)
                classFound.assignments.push(assig);
                if(classFound.categories.length != 0){
                    Category.findOneAndUpdate({_id: req.body.assignment.category}, {
                        $push: {'assignments.name': req.body.assignment.name}},(err, categoryFound) => {
                        assig.category.id = req.body.assignment.category
                        assig.category.weight = categoryFound.weight
                        assig.save()
                        if (!categoryFound.assignments.totalPoints) {
                            categoryFound.assignments.totalPoints = Number(req.body.assignment.total)
                        } else {
                            categoryFound.assignments.totalPoints += Number(req.body.assignment.total)
                            categoryFound.assignments.totalNumber = categoryFound.assignments.name.length + 1
                        }
                        categoryFound.save()
                    })
                }
                classFound.save();
                res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
            })
        })
    })
}

// Update One Assignment
exports.updateOneAssignment = (req, res) => {
    Class.findById(req.params.class_id).populate("categories assignments").exec((err, classFound) => {
        if (err) console.log(err)
        // Update category assignment approprietly
        if (req.body.assignUpdate.flag == req.body.assignUpdate.categoryID) {
            // Check to see if the assignment name changed
            classFound.assignments.forEach((assign) => {
                if (assign._id == req.params.assig_id) {
                    if (assign.name != req.body.assignUpdate.name) {
                        Category.findOne({_id: req.body.assignUpdate.categoryID}, (err, categoryFound) => {
                            if (err) console.log(err)
                            categoryFound.assignments.name.forEach((item, index) => {
                                if (item == assign.name) {
                                    categoryFound.assignments.name[index] = req.body.assignUpdate.name
                                    categoryFound.markModified('assignments')
                                    categoryFound.save()
                                }
                            })
                        })
                    }
                }
            })
        } else {
            Assignment.findOne({_id: req.params.assig_id}, (err, assignmentFound) => {
                if (err) console.log(err)
                // Remove the item from the one category
                Category.findOne({_id: req.body.assignUpdate.flag}, (err, categoryFound) => {
                    if (err) console.log(err)
                    categoryFound.assignments.name.forEach((item, index) => {
                        if (item.name == assignmentFound.name) categoryFound.assignments.name.splice(index, 1)
                    })
                    categoryFound.save()
                })
                // Add the item to the new category
                Category.findOne({_id: req.body.assignUpdate.categoryID}, (err, categoryFound) => {
                    if (err) console.log(err)
                    categoryFound.assignments.name.push(req.body.assignUpdate.name)
                    categoryFound.save()
                })
            })
        }

        // update the assignment 
        Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function (err, updateAssign) {
            if (err) console.log("Update Error: " + err);
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
}

// Update Many Assignments
exports.updateManyAssignment = (req, res) => {
    obj = JSON.parse(req.body.newOrderInput)

    Class.findById(req.params.class_id, (err, classFound) => {
        if (err) res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        Assignment.deleteMany({
            _id: {
                $in: classFound.assignments
            }
        }, function (err, allRemoved) {
            if (err) throw err;
            Assignment.insertMany(obj, function (err, response) {
                if (err) res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
                for (key of response) {
                    classFound.assignments.push(key);
                }
                classFound.save();
                res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
            })
        })
    })
}

// Delete Assignment
exports.deleteAssignment = function (req, res) {
    Class.findById(req.params.class_id, (err, classFound) => {
        if (err) throw err
        Assignment.findByIdAndDelete(req.params.assig_id, function (err) {
            if (err) res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
            deleteAssignment = classFound.assignments.indexOf(req.params.assig_id)
            classFound.assignments.splice(deleteAssignment, 1)
            Category.findOne({
                _id: req.body.assignCategoryId
            }, (err, categoryFound) => {
                if (err) console.log(err)
                categoryFound.assignments.name.forEach((item, index) => {
                    if (item == req.body.assignName) {
                        categoryFound.assignments.name.splice(index, 1)
                        categoryFound.save()
                    }
                })
            })
            classFound.save()
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
}