var express = require("express"),
  router = express.Router({mergeParams: true}),
  Class = require("../models/class"),
  Assignment = require("../models/assignment"),
  User       = require("../models/user")
  
// New Assignmet Form
router.get("/new", function (req, res) {
  Class.findById(req.params.class_id, function (err, classFound) {
    if (err) {

    } else {
      res.render("assignment/new", {classFound: classFound})
    }
  })
})

// Create One
router.post("/", function (req, res) {
  User.findById(req.params.user_id,(err,userFound)=> {
    if(err){throw err}
    Class.findById(req.params.class_id, function (err, classFound) {
      if (err) {
        console.log(err);
        req.flash("error","They was a problem creating a new assignment")
        res.redirect("/users/" + req.params.user_id + "/classes/")
      } else {
        Assignment.create(req.body.assignment, function (err, assig) {
          if (err) {
            console.log(err);
          } else {
            classFound.assignments.push(assig);
            classFound.save();
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
          }
        })
      }
    })
  })

})


// Edit form
router.get("/:assig_id/edit", function (req, res) {
  Assignment.findById(req.params.assig_id, function (err, assignFound) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("assignment/edit", {
        class_id: req.params.class_id,
        assignFound: assignFound
      })
    }
  })
})

// Update
router.put("/:assig_id", function (req, res) {
  // An if statement for editing one assignment
  Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function (err, updateAssign) {
    if (err) {
      console.log("Update Error: " + err);
      res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
    } else {
      res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
    }
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
      Assignment.deleteMany({},function(err,allRemoved){
        if(err) throw err;
        Assignment.insertMany(obj, function (err, response) {
          if (err) {
            console.log("I could not insert documents")
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
          } else {
            for(const key of response){
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
  Class.findById(req.params.class_id, (err,ClassFound) => {
    if (err){throw err}
    Assignment.findByIdAndDelete(req.params.assig_id, function (err) {
      if (err) {
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      } else {
        deleteItem = ClassFound.assignments.indexOf(req.params.assig_id)
        ClassFound.assignments.splice(deleteItem,1)
        ClassFound.save()
        res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
      }
    })
  })
})

module.exports = router