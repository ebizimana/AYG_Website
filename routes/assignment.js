var express = require("express"),
    router = express.Router({mergeParams:true}),
    Class = require("../models/class"),
    Assignment = require("../models/assignment"),
    assignUpdate = {}
    flag = false

// New
router.get("/new", function(req, res) {
  Class.findById(req.params.id,function(err,classFound){
    if(err){

    }else {
      res.render("assignment/new",{classFound:classFound})
    }
  })
})

// Create
router.post("/",function(req,res){
  Class.findById(req.params.id, function(err,classFound){
    if(err){
      console.log(err);
      res.redirect("/classes")

      // An if statement for the sorting
    } else if (req.body.assignment == null){
      //delete all the assignments in the class
      // Execute one time only
      if(flag === false){
        // remove all the assignments in the class
        // run one time per reorder
        while(classFound.assignments.length > 0) {
          classFound.assignments.pop();
          console.log(classFound.assignments);
        }
        classFound.save()
        flag = true
      }

      // classFound.assignments.length=0
      // classFound.save()
      console.log(classFound.assignments);
      // console.log("I just removed all the assignments in this class");

      // create new assignments in the sortade order
      // Assignment.create(req.body , function(err,assignCreated){
      //   if(err){
      //     console.log(err);
      //   }else{
      //     classFound.assignments.push(assignCreated)
      //     classFound.save();
      //     res.redirect("/classes/" + classFound._id)
      //   }
      // })

        // An if statement for adding an individual assignment
    }else {
      Assignment.create(req.body.assignment, function(err,assig){
        if (err){
          console.log(err);
        }else{
          classFound.assignments.push(assig);
          classFound.save();
          res.redirect("/classes/"+ classFound._id)
        }
      })
    }
  })
})

//Edit
router.get("/:assig_id/edit", function(req, res) {
  Assignment.findById(req.params.assig_id, function(err, assignFound) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("assignment/edit", {class_id:req.params.id, assignFound: assignFound})
    }
  })
})

// Update
router.put("/:assig_id", function(req, res) {
  // TODO: Make an if statement for checking if grade > total
  // An if statement for editing one assignment
  Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function(err, updateAssign) {
    if (err) {
      console.log("Update Error: " + err);
      res.redirect("/classes/" + req.params.id)
    } else {
      res.redirect("/classes/" + req.params.id)
    }
  })
})

// Delete
router.delete("/:assig_id", function(req, res) {
  Assignment.findByIdAndDelete(req.params.assig_id, function(err) {
    if (err) {
      res.redirect("/classes/" + req.params.id)
    } else {
      // TODO: delete that assignment from the classFound list
      res.redirect("/classes/" + req.params.id)
    }
  })
})
// TODO: delete this router
router.get("/:assig_id", function(req,res){
  res.render("assignment/delete")
})

module.exports = router
