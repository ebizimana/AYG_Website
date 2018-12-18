var mongoose = require("mongoose"),
    Classes  = require("./models/class");

var data = [
  {
    className: "khdfjkhajkflhak",
    courseName: "kafjklajfdkl;askjdf",
    professor: "kajskd;fjaskl;jfa"
  },
  {
    className: "Lorem ipsum dolor sit amet",
    courseName: "consectetur adipisicing elit",
    professor: "sed do eiusmod tempor incididunt "
  },
  {
    className: "ut labore et",
    courseName: "dolore magna",
    professor: "dolore magna"
  }
]
function seedDB(){
  //Remove all Classes
  Class.deleteMany({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed all classes!");
    data.forEach(function(seed){
      Class.create(seed,function(err,classCreated){
        if(err){
          console.log(err);
        } else{
          console.log("Added a Class");
        }
      })
    })
  })
}

module.exports = seedDB;
