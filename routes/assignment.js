// TODO: Delete the assignment from the class array

var express = require("express"),
  router = express.Router({
    mergeParams: true
  }),
  Category = require("../models/category"),
  Class = require("../models/class"),
  Assignment = require("../models/assignment"),
  User = require("../models/user")


// New Assignmet Form
router.get("/new", function (req, res) {
  Class.findById(req.params.class_id).populate("categories").exec(function (err, classFound) {
    if (err) {

    } else {
      res.render("assignment/new", {
        classFound: classFound
      })
    }
  })
})

// Create an Assignment 
router.post("/", function (req, res) {
  User.findById(req.params.user_id, (err, userFound) => {
    if (err) {
      throw err
    }
    Class.findById(req.params.class_id).populate("assignments").exec(function (err, classFound) {
      if (err) {
        console.log(err);
        req.flash("error", "They was a problem creating a new assignment")
        res.redirect("/users/" + req.params.user_id + "/classes/")
      } else {
        Assignment.create(req.body.assignment, function (err, assig) {
          if (err) console.log(err)
          classFound.assignments.push(assig);
          Category.findOneAndUpdate({
              _id: req.body.assignment.category
            }, {
              $push: {
                'assignments.name': req.body.assignment.name
              }
            },
            (err, categoryFound) => {
              assig.category.id     = req.body.assignment.category
              assig.category.weight = categoryFound.weight
              assig.save()
              if(!categoryFound.assignments.totalPerCategory){
                categoryFound.assignments.totalPerCategory = Number(req.body.assignment.total)
              }else{
                categoryFound.assignments.totalPerCategory += Number(req.body.assignment.total)
              }
              console.log(categoryFound.assignments.totalPerCategory)
              categoryFound.save()
            })
          classFound.save();
          res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
      }
    })
  })
})

// Edit form
router.get("/:assig_id/edit", function (req, res) {
  Class.findById(req.params.class_id).populate("categories").exec((err, classFound) => {
    if (err) throw err
    Assignment.findById(req.params.assig_id, function (err, assignFound) {
      if (err) {
        res.redirect("back")
      } else {
        res.render("assignment/edit", {
          assignFound: assignFound,
          classFound: classFound
        })
      }
    })
  })

})

// Update
router.put("/:assig_id", function (req, res) {
  Class.findById(req.params.class_id).populate("categories").populate("assignments").exec((err, classFound) => {
    if (err) console.log(err)

    // Update category assignment approprietly
    if (req.body.assignUpdate.flag == req.body.assignUpdate.category) {

      // Check to see if the assignment name changed
      classFound.assignments.forEach((assign) => {
        if (assign._id == req.params.assig_id) {
          if (assign.name != req.body.assignUpdate.name) {
            Category.findOne({
              _id: req.body.assignUpdate.category
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
          } else {
            console.log(assign.name)
            console.log(req.body.assignUpdate.name)
            console.log("The name was not changed")
          }
        }
      })
    } else {
      Assignment.findOne({
        _id: req.params.assig_id
      }, (err, assignmentFound) => {
        if (err) console.log(err)

        // Remove the item from the one category
        Category.findOne({
          _id: req.body.assignUpdate.flag
        }, (err, categoryFound) => {
          if (err) console.log(err)
          categoryFound.assignments.name.forEach((item, index) => {
            if (item.name == assignmentFound.name) {
              categoryFound.assignments.name.splice(index, 1)
            }
          })
          categoryFound.save()
        })
        // Add the item to the new category
        Category.findOne({
          _id: req.body.assignUpdate.category
        }, (err, categoryFound) => {
          if (err) console.log(err)
          categoryFound.assignments.name.push(req.body.assignUpdate.name)
          categoryFound.save()
        })
      })
    }

    // update the assignment 
    Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function (err, updateAssign) {
      if (err) {
        console.log("Update Error: " + err);
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      } else {
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      }
    })
  })
})

// Update many
router.post("/reorder", function (req, res) {
  obj = JSON.parse(req.body.newOrderInput)

  Class.findById(req.params.class_id, function (err, classFound) {
    if (err) {
      console.log("I could not find the class")
      res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
    } else {
      Assignment.deleteMany({
        _id: {
          $in: classFound.assignments
        }
      }, function (err, allRemoved) {
        if (err) throw err;
        Assignment.insertMany(obj, function (err, response) {
          if (err) {
            console.log("I could not insert documents")
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
          } else {
            for (key of response) {
              classFound.assignments.push(key);
            }
            classFound.save();
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
          }
        })
      })
    }
  })
})

// Show the delete modal
router.get("/:assig_id", function (req, res) {
  Assignment.findOne({_id: req.params.assig_id}, (err, assignFound) => {
    if (err) console.log(err)
    res.render("assignment/delete", {assignFound: assignFound})
  })
})

// Delete Assignment in DB
router.delete("/:assig_id", function (req, res) {
  Class.findById(req.params.class_id, (err, classFound) => {
    if (err) {
      throw err
    }
    Assignment.findByIdAndDelete(req.params.assig_id, function (err) {
      if (err) {
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      } else {
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
      }
    })
  })
})

module.exports = router