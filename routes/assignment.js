var express = require("express"),
  router = express.Router({mergeParams: true}),
  Class = require("../models/class"),
  Assignment = require("../models/assignment")
  
// New Assignmet Form
router.get("/new", function (req, res) {
  Class.findById(req.params.id, function (err, classFound) {
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
  Class.findById(req.params.id, function (err, classFound) {
    if (err) {
      console.log(err);
      res.redirect("/classes")

    } else {
      Assignment.create(req.body.assignment, function (err, assig) {
        if (err) {
          console.log(err);
        } else {
          classFound.assignments.push(assig);
          classFound.save();
          res.redirect("/classes/" + classFound._id)
        }
      })
    }
  })
})


//Edit
router.get("/:assig_id/edit", function (req, res) {
  Assignment.findById(req.params.assig_id, function (err, assignFound) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("assignment/edit", {
        class_id: req.params.id,
        assignFound: assignFound
      })
    }
  })
})

// Update
router.put("/:assig_id", function (req, res) {
  // TODO: Make an if statement for checking if grade > total
  // An if statement for editing one assignment
  Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function (err, updateAssign) {
    if (err) {
      console.log("Update Error: " + err);
      res.redirect("/classes/" + req.params.id)
    } else {
      res.redirect("/classes/" + req.params.id)
    }
  })
})

// Update many
router.post("/reorder", function (req, res) {
  obj = JSON.parse(req.body.newOrderInput)

  Class.findById(req.params.id, function (err, classFound) {
    if (err) {
      console.log("I could not find the class")
      res.redirect("/classes/" + classFound._id)
    } else {
      Assignment.deleteMany({},function(err,allRemoved){
        if(err) throw err;
        Assignment.insertMany(obj, function (err, response) {
          if (err) {
            console.log("I could not insert documents")
            res.redirect("/classes/" + classFound._id)
          } else {
            for(const key of response){
              classFound.assignments.push(key);
            }
            classFound.save();
            res.redirect("/classes/" + classFound._id)
          }
        })
      })
    }
  })
})

// Delete
router.delete("/:assig_id", function (req, res) {
  Assignment.findByIdAndDelete(req.params.assig_id, function (err) {
    if (err) {
      res.redirect("/classes/" + req.params.id)
    } else {
      // TODO: delete that assignment from the classFound list
      res.redirect("/classes/" + req.params.id)
    }
  })
})

// Show the delete modal
router.get("/:assig_id", function (req, res) {
  res.render("assignment/delete")
})

module.exports = router