var express = require("express"),
Class     = require("../models/class"),
Category  = require("../models/category"),
Assignment = require("../models/assignment"),
router = express.Router({mergeParams: true})

// Show all the categories
router.get("/", function(req,res){
    Class.findById(req.params.class_id, (err,classFound) => {
        if(err) throw err
        res.render("category/index", {classFound:classFound})
    })
})

// TODO: GET      To show the form to add a category
router.get("/new", (req,res) => {
    res.render("category/new")
})

// TODO: POST     Create a new category
// TODO: GET      Show a form to edit a category
// TODO: PUT      Edit a category
// TODO: GET      Show a form to confirm the delete action 
// TODO: DELETE   Delete a category

// TODO: Export the file
module.exports = router



