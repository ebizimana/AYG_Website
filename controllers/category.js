Class = require("../models/class");
Category = require("../models/category");

// Show all the categories
exports.showAllCategories = (req, res) => {
  Class.findById(req.params.class_id)
    .populate("categories")
    .exec((err, classFound) => {
      if (err) throw err;
      res.render("category/index", {
        classFound: classFound,
        class_id: req.params.class_id,
      });
    });
};

// Add Category Form
exports.addCategoryForm = (req, res) => {
  res.render("category/new", {
    class_id: req.params.class_id,
  });
};

// Edit Category Form
exports.editCategoryForm = (req, res) => {
  Category.findOne(
    {
      _id: req.params.category_id,
    },
    (err, categoryFound) => {
      if (err) console.log(err);
      res.render("category/edit", {
        categoryFound: categoryFound,
        class_id: req.params.class_id,
      });
    }
  );
};

// Delete Category Form
exports.deleteCategoryForm = (req, res) => {
  Class.findOne(
    {
      _id: req.params.class_id,
    },
    (err, classFound) => {
      if (err) console.log(err);
      Category.findOne(
        {
          _id: req.params.category_id,
        },
        (err, categoryFound) => {
          if (err) console.log(err);
          res.render("category/delete", {
            categoryFound: categoryFound,
            class_id: classFound._id,
          });
        }
      );
    }
  );
};

// Add a Category
exports.createCategory = (req, res) => {
  const { user_id, class_id } = req.params;

  // Create a new Category
  const newCategory = {
    name: req.body.category.name,
    weight: req.body.category.weight,
  };

  // Find the user by ID
  User.findById(user_id, (err, user) => {
    if (err) {
      // Handle error appropriately
      console.error(err);
      return res.status(500).send("Error finding user");
    }

    // Create a category for the user
    Category.create(newCategory, (err, category) => {
      if (err) {
        // Handle error appropriately
        console.error(err);
        return res.status(500).send("Error creating category");
      }

      // Add the category to the user's enrolledClasses
      user.enrolledClasses.id(class_id).categories.push(category);
      user.save();

      // Redirect or send response indicating success
      res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
    });
  });
};

// Edit Category
exports.editCategory = (req, res) => {
  Class.findOne(
    {
      _id: req.params.class_id,
    },
    (err, classFound) => {
      if (err) console.log(err);
      Category.findOneAndUpdate(
        {
          _id: req.params.category_id,
        },
        req.body.categoryUpdate,
        (err, categoryFound) => {
          if (err) console.log(err);
          req.flash("success", "Category Sucessfully Edited");
          res.redirect(
            "/users/" + req.params.user_id + "/classes/" + req.params.class_id
          );
        }
      );
    }
  );
};

// Delete Category
exports.deleteCategory = (req, res) => {
  Class.findOne(
    {
      _id: req.params.class_id,
    },
    (err, classFound) => {
      if (err) console.log(err);
      classFound.categories.forEach((item, index) => {
        if (item._id == req.params.category_id) {
          classFound.categories.splice(index, 1);
          classFound.save();
        }
      });
      Category.findOneAndDelete(
        {
          _id: req.params.category_id,
        },
        (err, categoryFound) => {
          req.flash("success", "Category Sucessfully Deleted");
          res.redirect(
            "/users/" + req.params.user_id + "/classes/" + req.params.class_id
          );
        }
      );
    }
  );
};

// Code to Reference on
/*
exports.createCategory = (req, res) => {
    User.findById(req.params.user_id, (err, userFound) => {
        if (err) throw err
        Class.findById(req.params.class_id, (err, classFound) => {
            if (err) throw err
            Category.create(req.body.category, (err, categoryCreated) => {
                if (err) throw err
                classFound.categories.push(categoryCreated)
                classFound.save();
                req.flash("success", 'Category ' + '"' + req.body.category.name + '"' + ' Sucessfully created')
                res.redirect("/users/" + req.params.user_id + "/classes/" + req.params.class_id)
            })
        })
    })
}
*/
