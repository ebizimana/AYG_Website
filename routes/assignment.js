var express = require("express"),
    router = express.Router({mergeParams:true}),
    Class = require("../models/class"),
    Assignment = require("../models/assignment")

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
  Class.findById(req.params.id,function(err,classFound){
    if(err){
      console.log(err);
      res.redirect("/classes")
    } else{
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
  Assignment.findById(req.params.id, function(err, assignFound) {
    if (err) {
      res.redirect("/assignments")
    } else {
      res.render("assignment/edit", {assignment: assignFound})
    }
  })
})

//Show
router.get("/assignments/:id", function(req, res) {
  Assignemnt.findById(req.params.id, function(err, assignFound) {
    if (err) {
      res.redirect("/assignmnents")
    } else {
      res.render("show", {
        assignmnent: assignFound
      })
    }
  })
})

// Update
router.put("/assignments/:id", function(req, res) {
  Assignemnt.findByIdAndUpdate(req.params.id, req.body.assignment, function(err, updateAssign) {
    if (err) {
      res.redirect("/assignments")
    } else {
      res.redirect("/assignments/" + req.params.id)
    }
  })
})

// Delete
router.delete("/assignments/:id", function(req, res) {
  Assignemnt.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/assignments")
    } else {
      res.redirect("/assignments")
    }
  })
})

module.exports = router
