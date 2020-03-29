// Popovers Initialization
$(function() {
    $('[data-toggle = "popover"').popover()
})

// Show The Add Config Modal
$('#addAssignment').on('click', function (e){
    e.preventDefault()
    $('#modalAdd').modal('show').find('.modal-content').load($(this).attr('href'))
})

// // Toggle Sidebar
// $('#sidebarCollapse').on('click', function(){
//     load('sidenav.ejs')
// });