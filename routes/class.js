var express = require("express")
    router  = express.Router();
    Class   = require("../models/class")

//classes page
router.get("/",function(req,res){
  Class.find({},function(err,classFound){
    if(err){
      console.log(err);
      req.flash("error",err.message)
    }else {
      res.render("class/index",{classes:classFound})
    }
  })
})

// create a new class
router.get("/new",function(req,res){
  res.render("class/new")
})
// show an individual class
router.get("/:id",function(req,res){
  Class.findbyId(req.params.id,function(err,classFound){
    if(err){
      console.log(err);
      req.flash("error",err.message)
    }else{
      res.render("class/show",{class:classFound})
    }
  })
})

//save the class in the database
router.post("/",function(req,res){
  Class.create(req.body.class, function(err,classUpdate){
    if(err){
      console.log(err);
      req.flash("error",err.message)
    }else {
      req.flash("success","Class successfully created")
      res.redirect("/classes")
    }
  })
})
//delete a class
router.delete("/:id",function(req,res){
  Class.findbyIdAndDelete(req.params.id,function(err){
    if(err){
      console.log(err);
      req.flash("error",err.message)
    }else {
      req.flash("success","Class successfully deleted")
      res.redirect("/classes")
    }
  })
})

module.exports = router
