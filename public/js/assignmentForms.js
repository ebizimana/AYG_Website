// Form Error Handler
function checkTotal() {
  var totalInput = parseInt($('#editTotal').val());
  var gradeInput = parseInt($('#editGrade').val());
  var styles = document.getElementById('error');

  if (!gradeInput) {
    $('#gradeErr').html("Please Input a Number").attr('style','color: #CD5C5C !important')
    $('#editGrade').css({color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"})
    $('#submit').prop('disabled', true)
  } else if(gradeInput){
    $('#editGrade').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    $('#gradeErr').html("Please Input a '-' if not graded").attr('style','color: #4285FA !important')
    $('#submit').prop('disabled', false)
  } else if (gradeInput > totalInput) {
    $('#editTotal').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    styles.style.visibility = 'visible'
    $('#submit').prop('disabled', true)
  } else {
    $('#editTotal').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    styles.style.visibility = 'hidden'
    $('#submit').prop('disabled', false)
    $('#submit').submit()
  }
}