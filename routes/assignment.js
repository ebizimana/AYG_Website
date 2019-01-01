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
  Class.findById(req.params.id, function(err,classFound){
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
  if(req.body.assignUpdate.grade > req.body.assignUpdate.total){
    req.flash("error","The total has to be greater than the grade")
    res.redirect("/classes/" + req.params.id)
  }else{
    Assignment.findByIdAndUpdate(req.params.assig_id, req.body.assignUpdate, function(err, updateAssign) {
      if (err) {
        res.redirect("/classes/" + req.params.id)
      } else {
        res.redirect("/classes/" + req.params.id)
      }
    })
  }
})

// Delete
router.delete("/:assig_id", function(req, res) {
  Assignment.findByIdAndDelete(req.params.assig_id, function(err) {
    if (err) {
      res.redirect("/classes/" + req.params.id)
    } else {
      res.redirect("/classes/" + req.params.id)
    }
  })
})
router.get("/:assig_id", function(req,res){
  res.render("assignment/delete")
})

module.exports = router
