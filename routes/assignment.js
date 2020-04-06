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

// Create One
router.post("/", function (req, res) {
  User.findById(req.params.user_id, (err, userFound) => {
    if (err) {
      throw err
    }
    Class.findById(req.params.class_id).populate("categories").exec(function (err, classFound) {
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
                assignments: req.body.assignment.name
              }
            },
            (err, categoryFound) => {})
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
    // Update the category array
    newArray = []
    changeAssign = ''

    // Get the unchanged assginment name
    for (item of classFound.assignments) {
      if (item._id == req.params.assig_id) {
        changeAssign = item.name
      }
    }

    // Fill up the new array 
    for (item of classFound.categories) {
      if (req.body.assignUpdate.category == item._id) {
        for (assign of item.assignments) {
          if (assign == changeAssign){
            assign = req.body.assignUpdate.name
          }
          newArray.push(assign)
        }
      }
    }

    // Change the old array
    Category.findOneAndUpdate({
        _id: req.body.assignUpdate.category
      }, {
        $set: {assignments:newArray}
      },
      (err, categoryFound) => {})
    classFound.save();

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
  res.render("assignment/delete")
})

// Delete Assignment in DB
router.delete("/:assig_id", function (req, res) {
  Class.findById(req.params.class_id, (err, ClassFound) => {
    if (err) {
      throw err
    }
    Assignment.findByIdAndDelete(req.params.assig_id, function (err) {
      if (err) {
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      } else {
        deleteItem = ClassFound.assignments.indexOf(req.params.assig_id)
        ClassFound.assignments.splice(deleteItem, 1)
        ClassFound.save()
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      }
    })
  })
})

module.exports = router