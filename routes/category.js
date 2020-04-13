var express = require("express"),
Class     = require("../models/class"),
Category  = require("../models/category"),
router = express.Router({mergeParams: true})

// Show all the categories
router.get("/", function(req,res){
    Class.findById(req.params.class_id).populate("categories").exec((err,classFound) => {
        if(err) throw err
        res.render("category/index", {classFound:classFound, class_id: req.params.class_id})
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

// Show a form to edit a category
router.get('/:category_id/edit', (req,res) =>{
    Category.findOne({_id:req.params.category_id},(err,categoryFound) =>{
        if(err) console.log(err)
        res.render("category/edit",{categoryFound:categoryFound,class_id:req.params.class_id})
    })
})

// Edit a category
router.put('/:category_id',(req,res) =>{
    Class.findOne({_id: req.params.class_id},(err, classFound) => {
        if(err) console.log(err)
        Category.findOneAndUpdate({_id:req.params.category_id}, req.body.categoryUpdate, (err,categoryFound) =>{
            if(err) console.log(err)
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
})

// Show a form to confirm the delete action
router.get('/:category_id/delete',(req,res) => {
    Class.findOne({_id:req.params.class_id}, (err,classFound) =>{
        if(err) console.log(err)
        Category.findOne({_id:req.params.category_id},(err,categoryFound) => {
            if(err) console.log(err)
            res.render('category/delete',{categoryFound:categoryFound,class_id:classFound._id})
        })
    })
})

// Delete a category
router.delete("/:category_id", (req,res) => {
    Class.findOne({_id:req.params.class_id}, (err,classFound) =>{
        if(err) console.log(err)
        classFound.categories.forEach((item,index) => {
            if(item._id == req.params.category_id){
                classFound.categories.splice(index,1)
                classFound.save()
            }
        })
        Category.findOneAndDelete({_id:req.params.category_id}, (err,categoryFound) => {
            res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
        })
    })
})

// Export the file
module.exports = router



