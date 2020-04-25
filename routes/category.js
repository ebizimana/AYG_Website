express             = require("express")
router              = express.Router({mergeParams: true})
CategoryController  = require('../controllers/category')

// Show all the categories
router.get("/", CategoryController.showAllCategories)

// Add Category Form 
router.get("/new", CategoryController.addCategoryForm)

// Edit Category Form 
router.get('/:category_id/edit', CategoryController.editCategoryForm)

// Delete Caegory Form
router.get('/:category_id/delete', CategoryController.deleteCategoryForm)

// Create Category
router.post('/', CategoryController.createCategory)

// Edit a category
router.put('/:category_id', CategoryController.editCategory)

// Delete a category
router.delete("/:category_id", CategoryController.deleteCategory)

// Export the file
module.exports = router



