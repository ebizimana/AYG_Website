var express = require("express"),
Class     = require("../models/class"),
Category  = require("../models/category"),
Assignment = require("../models/assignment"),
router = express.Router({mergeParams: true})

// TODO: GET      Show all the categories
router.get("/", function(req,res){
    res.render("category/index")
})
// TODO: GET      To show the form to add a category
// TODO: POST     Create a new category
// TODO: GET      Show a form to edit a category
// TODO: PUT      Edit a category
// TODO: GET      Show a form to confirm the delete action 
// TODO: DELETE   Delete a category

// TODO: Export the file
module.exports = router



