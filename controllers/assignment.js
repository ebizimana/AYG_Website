const category = require("../models/category")

// Initialise Models
User = require("../models/user")
Class = require("../models/class")
Category = require("../models/category")
Assignment = require("../models/assignment")

// New Assignmet Form
exports.newAssignmentForm = (req, res) => {
    Class.findById(req.params.class_id).populate("categories").exec((err, classFound) => {
        if (err) throw err
        res.render("assignment/new", {
            classFound: classFound
        })
    })
}

// Edit Assignment form
exports.editAssignmentForm = (req, res) => {
    Class.findById(req.params.class_id).populate("categories").exec((err, classFound) => {
        if (err) throw err
        Assignment.findOne({
            _id: req.params.assig_id
        }, (err, assignFound) => {
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
    Assignment.findOne({
        _id: req.params.assig_id
    }, (err, assignFound) => {
        if (err) console.log(err)
        res.render("assignment/delete", {
            assignFound: assignFound
        })
    })
}

// Create an Assignment 
exports.createAssignment = (req, res) => {
    User.findById(req.params.user_id, (err, userFound) => {
        if (err) throw err
        Class.findById(req.params.class_id).populate("assignments").exec((err, classFound) => {
            if (err) throw err
            flag = true
            for (item of classFound.assignments) {
                if (item.name == req.body.assignment.name) {
                    req.flash("error", "Assignment Name Alredy Exist")
                    flag = false
                    break
                }
                if (!Number(req.body.assignment.grade) || !Number(req.body.assignment.total) || Number(req.body.assignment.grade) < -1 || Number(req.body.assignment.total) < 0) {
                    req.flash('error', "Please Input a none negative number")
                    flag = false
                    break
                }
                // I have to remove this clause so I can allow point average calculation

                // if (!req.body.assignment.category) {
                //     req.flash("error", "Make sure you select a category")
                //     flag = false
                //     break
                // }
            }
            if (flag) {
                Assignment.create(req.body.assignment, (err, assig) => {
                    if (err) console.log(err)
                    classFound.assignments.push(assig);
                    if (classFound.categories.length != 0) {
                        Category.findOneAndUpdate({
                            _id: req.body.assignment.category
                        }, {
                            $push: {
                                'assignments.name': req.body.assignment.name
                            }
                        }, (err, categoryFound) => {
                            assig.category.id = req.body.assignment.category
                            assig.category.weight = categoryFound.weight
                            assig.save()
                            if (!categoryFound.assignments.totalPoints) {
                                categoryFound.assignments.totalPoints = Number(req.body.assignment.total)
                                categoryFound.assignments.numberAssignmentNotGraded = 1
                                categoryFound.assignments.sumActualScore = 0
                            } else {
                                categoryFound.assignments.totalPoints += Number(req.body.assignment.total)
                                categoryFound.assignments.totalNumber = categoryFound.assignments.name.length + 1
                                if (req.body.assignment.grade == -1) {
                                    categoryFound.assignments.numberAssignmentNotGraded += 1
                                } else {
                                    categoryFound.assignments.sumActualScore += Number(req.body.assignment.grade)
                                }
                            }
                            categoryFound.save()
                        })
                    }
                    classFound.save();
                })
            }
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
}

// Update One Assignment
exports.updateOneAssignment = (req, res) => {
    Class.findById(req.params.class_id).populate("categories assignments").exec((err, classFound) => {
        if (err) console.log(err)
        flag = true
        Assignment.findOne({
            _id: req.params.assig_id
        }, (err, assignmentFound) => {
            // Check for Input Error 
            for (item of classFound.assignments) {
                if (item.name == req.body.assignUpdate.name && item.name != assignmentFound.name) {
                    req.flash("error", "Assignment Already exist")
                    flag = false
                    break
                }
                if (!Number(req.body.assignUpdate.grade) || !Number(req.body.assignUpdate.total) || Number(req.body.assignUpdate.grade) < -1 || Number(req.body.assignUpdate.total) < 0) {
                    req.flash("error", "Please Input a None Negative Number")
                    flag = false
                    break;
                }
            }
            // Updating the category name array accondingly
            if (classFound.categories.length != 0 && flag) {
                if (req.body.assignUpdate.flag == req.body.assignUpdate.categoryID) {
                    classFound.assignments.forEach((assign) => {
                        if (assign._id == req.params.assig_id) {
                            if (assign.name != req.body.assignUpdate.name) {
                                Category.findOne({
                                    _id: req.body.assignUpdate.categoryID
                                }, (err, categoryFound) => {
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
                    Category.findOne({
                        _id: req.body.assignUpdate.flag
                    }, (err, categoryFound) => {
                        if (err) console.log(err)
                        categoryFound.assignments.name.forEach((item, index) => {
                            if (item == assignmentFound.name) {
                                categoryFound.assignments.name.splice(index, 1)
                            }
                        })
                        categoryFound.save()
                    })
                    Category.findOne({
                        _id: req.body.assignUpdate.categoryID
                    }, (err, categoryFound) => {
                        if (err) console.log(err)
                        categoryFound.assignments.name.push(req.body.assignUpdate.name)
                        assignmentFound.category.id = req.body.assignUpdate.categoryID
                        assignmentFound.save()
                        categoryFound.save()
                    })
                }
                Category.findOne({
                    _id: req.body.assignUpdate.categoryID
                }, (err, categoryFound) => {
                    if (err) console.log("Error Occured");
                    if (!categoryFound.assignments.sumActualScore) {
                        categoryFound.assignments.sumActualScore = 0
                    }
                    if (req.body.assignUpdate.grade == -1) {
                        categoryFound.assignments.numberAssignmentNotGraded += 1
                    } else {
                        categoryFound.assignments.sumActualScore += Number(req.body.assignUpdate.grade)
                        categoryFound.assignments.numberAssignmentNotGraded -= 1
                    }
                    categoryFound.save()
                })
            }
            if (flag) {
                Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function (err, updateAssign) {
                    if (err) console.log("Update Error: " + err);
                })
            }
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
                if (err) throw err
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
            if (classFound.categories.length != 0) {
                Category.findOne({
                    _id: req.body.assignCategoryId
                }, (err, categoryFound) => {
                    if (err) console.log(err)
                    categoryFound.assignments.name.forEach((item, index) => {
                        if (item == req.body.assignName) {
                            categoryFound.assignments.name.splice(index, 1)
                            categoryFound.assignments.sumActualScore -= Number(req.body.assignGrade)
                            categoryFound.assignments.totalPoints -= Number(req.body.assignTotal)
                            categoryFound.save()
                        }
                    })
                })
            }
            classFound.save()
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
}