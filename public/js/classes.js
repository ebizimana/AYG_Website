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

// To Delete a class
// To show the modal for delete Assignment form
$('.deleteClass').on('click', function(e){
  e.preventDefault();
  $('#modalDelete').modal('show').find('.modal-content').load($(this).attr('href'))
})
// To set the Delete Action link
function setDeleteAction(action) {
  deleteAction = "/classes/" + action + "?_method=DELETE";
}
//Delete an assignment
function deleteForm(){
  $('#delete-form').attr('action', deleteAction)
}
