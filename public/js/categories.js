// Popovers Initialization
$(function() {
    $('[data-toggle = "popover"').popover()
})

// Show The Add Config Modal
$('#addcategory').on('click', function (e){
    e.preventDefault()
    $('#modalAddCategory').modal('show').find('.modal-content').load($(this).attr('href'))
})

