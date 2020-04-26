// Form Error Handler
function checkTotal() {
  var totalInput = parseInt($('#editTotal').val());
  var gradeInput = parseInt($('#editGrade').val());
  var gradeName = $('input[name="assignment[grade]"]');
  var styles = document.getElementById('error');

  if($('#editGrade').val() == 'NG') gradeInput = -1

  if (!gradeInput) {
    $('#gradeErr').html("Please Input a Number or 'NG' ").attr('style','color: #CD5C5C !important')
    $('#editGrade').css({color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"})
    $('#submit').prop('disabled', true)
  } 

  if(gradeInput){
    $('#editGrade').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    $('#gradeErr').html("Please Input 'NG' if it's Not Graded").attr('style','color: #2E86C1 !important')
    $('#submit').prop('disabled', false)
  } 
  
  if (gradeInput > totalInput) {
    $('#editTotal').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    styles.style.visibility = 'visible'
    $('#submit').prop('disabled', true)
  }

  if(gradeInput < totalInput) {
    $('#editTotal').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    styles.style.visibility = 'hidden'
    $('#submit').prop('disabled', false)
    if($('#editGrade').val() == 'NG') gradeName.val(-1)
    $('#submit').submit()
  }
}