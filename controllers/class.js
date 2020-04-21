Class            = require("../models/class")
Assignment       = require("../models/assignment")
User             = require("../models/user")

// Show all classes page
exports.showAllClasses = (req, res) => {
    User.findById(req.params.user_id).populate("classes").exec((err, userFound) => {
      if (err) throw err
      res.render("class/index", {userFound: userFound})
    })
  }

// Create a new class form
exports.createClassForm = (req, res) => {
  res.render("class/new")
}

// Show Edit Class Form
exports.editClassForm = (req, res) => {
  Class.findById(req.params.class_id, function (err, editClass) {
    if (err) throw err
      res.render("class/edit", {editClass: editClass})
  })
}

// Delete Class Form 
exports.deleteClassForm = (req, res) => {
  res.render("class/delete")
}

//Save the class in the DB
exports.saveClass = (req, res) => {
  User.findById(req.params.user_id, (err, userFound) => {
    if (err) throw err
    Class.create(req.body.class, function (err, classCreated) {
      if (err) throw err
        userFound.classes.push(classCreated)
        userFound.save()
        req.flash("success", "Class successfully created")
        res.redirect("/users/" + req.params.user_id + "/classes/")
    })
  })
}

// Show an individual class
exports.showOneClass = (req, res) => {
  Class.findById(req.params.class_id).populate("assignments categories").exec(function (err, classFound) {
    if (err) throw err
    // TODO: Export the class Found to the showpage js
    res.render("class/show", {classFound: classFound})
  })
}

// Updated Class in the DB
exports.updateClass = (req, res) => {
  Class.findByIdAndUpdate(req.params.class_id, req.body.updateClass, (err, update) => {
    if (err) throw err
      req.flash("success", "You updated your class")
      res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
  })
}

//Delete a class from the DB
exports.deleteClass = (req, res) => {
  Class.findByIdAndDelete(req.params.class_id, (err,classFound) => {
    if(err) throw err
    Assignment.deleteMany({_id:{$in:classFound.assignments}}, (err,assignDeleted) => {
      if(err) throw err
      res.redirect("/users/" + req.params.user_id + "/classes/")
    })
  })
}