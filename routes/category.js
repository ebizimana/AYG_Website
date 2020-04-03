var express = require("express"),
Class     = require("../models/class"),
Category  = require("../models/category"),
Assignment = require("../models/assignment"),
router = express.Router({mergeParams: true})

// Show all the categories
router.get("/", function(req,res){
    Class.findById(req.params.class_id).populate("categories").exec((err,classFound) => {
        if(err) throw err
        res.render("category/index", {classFound:classFound})
    })
})

// To show the form to add a category
router.get("/new", (req,res) => {
    res.render("category/new",{class_id:req.params.class_id})
})

// Create a new category
router.post('/', (req,res) =>{
    User.findById(req.params.user_id, (err,userFound) =>{
        if (err) {
            req.flash("error", err.message)
            res.redirect('/')
            throw err
        } else{
            Class.findById(req.params.class_id, (err, classFound) => {
                if(err){
                    req.flash("error", err.message)
                    res.redirect("/")
                    throw err
                } else{
                    Category.create(req.body.category, (err, categoryCreated) => {
                        if(err){
                            req.flash("error", err.message)
                            res.redirect("/")
                            throw err
                        } else{
                            classFound.categories.push(categoryCreated)
                            classFound.save();
                            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
                        }
                    })
                }
            })
        }
    })
})

// TODO: GET      Show a form to edit a category
// TODO: PUT      Edit a category
// TODO: GET      Show a form to confirm the delete action 
// TODO: DELETE   Delete a category

// Export the file
module.exports = router



