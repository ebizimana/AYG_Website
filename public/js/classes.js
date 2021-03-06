var deleteAction;

// Enable popovers
$(function(){
  $('[data-toggle="popover"]').popover()
})

// To show the modal for the Add class form
$('#addClass').on('click',function(e){
  e.preventDefault();
  $('#modalAddClass').modal('show').find('.modal-content').load($(this).attr('href'))
})

// To show the modal for configure the categories
$('.configCategories').on('click', function(e){
  e.preventDefault()
  $('#configCategoriesModal').modal('show').find('.modal-content').load($(this).attr('href'))
})

// To Delete a class
// To show the modal for delete Assignment form
$('.deleteClass').on('click', function(e){
  e.preventDefault();
  $('#modalDelete').modal('show').find('.modal-content').load($(this).attr('href'))
})
// To set the Delete Action link
function setDeleteAction(user_id, class_id) {
  deleteAction = "/users/"+ user_id + "/classes/"+ class_id + "?_method=DELETE";
}
//Delete an assignment
function deleteForm(){
  $('#delete-form').attr('action', deleteAction)
}
