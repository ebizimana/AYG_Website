var express  = require("express"),
    router  = express.Router(),
    Class   = require("../models/class");

router.get("/result",function(req,res){
  Class.find({},function(err,allClasses){
    if(err){
      console.log(err);
    } else{
      res.render("result/index",{allClasses:allClasses})
    }
  })
})

module.exports = router 
