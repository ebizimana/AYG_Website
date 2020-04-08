// Popovers Initialization
$(function () {
    $('[data-toggle = "popover"').popover()
})

// Show The Add Config Modal
$('#addcategory').on('click', function (e) {
    e.preventDefault()
    $('#modalAddCategory').modal('show').find('.modal-content').load($(this).attr('href'))
})

// Show the Edit Modal Form
$('#editCategory').on('click', function(e) {
    e.preventDefault()
    $('#modalEditCategory').modal('show').find('.modal-content').load($(this).attr('href'))
})

// Show the Delete Modal Form
$('#deleteCategory').on('click', function(e) {
    e.preventDefault()
    $('#modalDeleteCategory').modal('show').find('.modal-content').load($(this).attr('href'))
})

// Edit Category Table
function editCategoryTable(userId, classId, categoryId) {
    editUrl   = "/users/" + userId + "/classes/" + classId + "/categories/" + categoryId + "/edit"
    deleteUrl = "/users/" + userId + "/classes/" + classId + "/categories/" + categoryId + "/delete"

    //highlight the row
    $("#categoryTable").on("click", 'td', function () {
        $("tr").each(function () {
            $(this).css({'background-color': ''})
        });
        $(this).closest("tr").css({'background-color': '#87CEEB'})
        //enable the edit and delete buttons
        $("#editCategory").prop('disabled', false).attr('href', editUrl)
        $('#deleteCategory').prop('disabled', false).attr('href', deleteUrl)
    });
}