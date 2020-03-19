// TODO: Before you can add a class you must be signed in 
var  express        = require("express")
     router         = express.Router({mergeParams: true});
     Class          = require("../models/class")
     middleware     = require('../middleware')
     User           = require("../models/user")

// Denie access if not loggin 
router.get("/", (req, res) => {
  req.flash("error", "You Need To Be Login")
  res.redirect("/")
})

// Show all classes page
router.get("/:id", function (req, res) {
  User.findById(req.params.id).populate("classes").exec((err, userFound) => {
    if (err) {
      throw err
    }
    res.render("class/index", {
      userFound: userFound
    })
  })
})

// Show the form for to create a new class
router.get("/:id/new", function (req, res) {
  res.render("class/new")
})

//Save the class in the database
router.post("/:id", function (req, res) {
  User.findById(req.params.id, (err, userFound) => {
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
        res.redirect("/classes/" + req.params.id)
      }
    })

  })
})

// Show an individual class
router.get("/:id/:assign_id", function (req, res) {
  User.findById(req.params.id, (err, userFound) => {
    if (err) {throw err}
    Class.findById(req.params.assign_id).populate("assignments").exec(function (err,
      classFound) {
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



//edit router
router.get("/:id/edit", function (req, res) {
  Class.findById(req.params.id, function (err, editClass) {
    if (err) {
      console.log(err);
    } else {
      res.render("class/edit", {
        editClass: editClass
      })
    }
  })
})

// update router
router.put("/:id", function (req, res) {
  Class.findByIdAndUpdate(req.params.id, req.body.updateClass, function (err, update) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "You updated your class")
      console.log("updateClass: " + req.body.updateClass.name);
      res.redirect("/classes/" + req.params.id)
    }
  })
})

// Delete Form
router.get("/:user_id/:class_id/delete", function (req, res) {
  res.render("class/delete")
})

//Delete a class from the DB
router.delete("/:user_id/:class_id", function (req, res) {
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
        res.redirect("/classes/" + req.params.user_id)
      }
    })
  })

})


module.exports = router