var  express        = require("express")
     router         = express.Router({mergeParams: true});
     Class          = require("../models/class")
     User           = require("../models/user")
     middleware     = require("../middleware")

// Show all classes page
router.get("/", function (req, res) {
  User.findById(req.params.user_id).populate("classes").exec((err, userFound) => {
    if (err) {throw err}
    res.render("class/index", {userFound: userFound})
  })
})

// Show the form for to create a new class
router.get("/new", function (req, res) {
  res.render("class/new")
})

// TODO: Delete Form | Make sure you can't get to it unless you logged in
router.get("/:class_id/delete", function (req, res) {
  res.render("class/delete")
})

//Save the class in the DB
router.post("/",middleware.isLoggenIn, function (req, res) {
  User.findById(req.params.user_id, (err, userFound) => {
    if (err) {
      return err
    }
    Class.create(req.body.class, function (err, classCreated) {
      if (err) {
        console.log(err);
        req.flash("error", err.message)
      } else {
        userFound.classes.push(classCreated)
        userFound.save()
        req.flash("success", "Class successfully created")
        res.redirect("/users/"+ req.params.user_id + "/classes/")
      }
    })

  })
})

// Show an individual class
router.get("/:class_id",middleware.isLoggenIn, function (req, res) {
  User.findById(req.params.user_id, (err, userFound) => {
    if (err) {throw err}
    Class.findById(req.params.class_id).populate("assignments").exec(function (err,classFound) {
      if (err) {
        console.log(err);
        req.flash("error", err.message)
      } else {
        res.render("class/show", {
          classFound: classFound
        })
      }
    })
  })
})

//TODO:  Show Edit Modal | Make sure you can't get to it unless you logged in
router.get("/:class_id/edit", function (req, res) {
  Class.findById(req.params.class_id, function (err, editClass) {
    if (err) {
      console.log(err);
    } else {
      res.render("class/edit", {
        editClass: editClass
      })
    }
  })
})

// Updated Class in the DB
router.put("/:class_id",middleware.isLoggenIn, function (req, res) {
  Class.findByIdAndUpdate(req.params.class_id, req.body.updateClass, function (err, update) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "You updated your class")
      console.log("updateClass: " + req.body.updateClass.name);
      res.redirect("/users/"+ req.params.user_id + "/classes/" + req.params.class_id)
    }
  })
})

//Delete a class from the DB
router.delete("/:class_id",middleware.isLoggenIn, function (req, res) {
  User.findById(req.params.user_id, (err,userFound) => {
    if(err){throw err}
    Class.findByIdAndDelete(req.params.class_id, function (err) {
      if (err) {
        console.log(err);
        req.flash("error", err.message)
      } else {
        deleteItem = userFound.classes.indexOf(req.params.class_id)
        userFound.classes.splice(deleteItem,1)
        userFound.save()
        req.flash("success", "Class was successfully deleted")
        res.redirect("/users/" + req.params.user_id + "/classes/")
      }
    })
  })

})


module.exports = router