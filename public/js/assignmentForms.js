// Form Error Handler
function checkTotal() {
  var totalInput = parseInt($('#editTotal').val());
  var gradeInput = parseInt($('#editGrade').val());
  var gradeName = $('input[name="assignment[grade]"]');
  var gradeEditName = $('input[name="assignUpdate[grade]"]');
  var styles = document.getElementById('error');

  // Change grade input back to number
  if ($('#editGrade').val() == 'NG') gradeInput = -1

  // If it's not a number
  if (!gradeInput && gradeInput != 0) {
    $('#gradeErr').html("Please Input a Number or 'NG' ").attr('style', 'color: #CD5C5C !important')
    $('#editGrade').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    $('#submit').prop('disabled', true)
  }

  // If it's a number 
  if (gradeInput) {
    $('#editGrade').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    $('#gradeErr').html("Please Input 'NG' if it's Not Graded").attr('style', 'color: #2E86C1 !important')
    $('#submit').prop('disabled', false)
  }

  // If Grade is lower than 0
  if (gradeInput < 0 && gradeInput != -1) {
    $('#gradeErr').html("Grade can't be negative").attr('style', 'color: #CD5C5C !important')
    $('#editGrade').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    $('#submit').prop('disabled', true)
  }

  // If total is greater than 0
  if (totalInput >= 0) {
    $('#editTotal').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    styles.style.visibility = 'hidden'
  }

  // If total is lower than 0 
  if (totalInput < 0) {
    $('#error').html("Total can't be negative").attr('style', 'color: #CD5C5C !important')
    $('#editTotal').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    $('#submit').prop('disabled', true)
  }

  // Grade is greater than total 
  if (gradeInput > totalInput) {
    $('#editTotal').css({
      color: "#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
    styles.style.visibility = 'visible'
    $('#submit').prop('disabled', true)
  }

  // Grade is lower than total 
  if (gradeInput < totalInput && (gradeInput >= 0 || gradeInput == -1)) {
    $('#editTotal').css({
      color: "#495057",
      "border-bottom": "1px solid  #00c851",
      "box-shadow": "0 1px 0 0  #00c851"
    })
    styles.style.visibility = 'hidden'
    $('#submit').prop('disabled', false)
  }

  // When submit is pressed
  $('#submit').on('click', function () {
    if ($('#editGrade').val() == 'NG') {
      gradeName.val(-1)
      gradeEditName.val(-1)
    }
    $('#submit').submit()
  })

}

// Enter is pressed 
$(document).keypress(function (e) {
  if (e.which == 13) {
    if ($('#editGrade').val() == 'NG') {
      $('input[name="assignment[grade]"]').val(-1)
      $('input[name="assignUpdate[grade]"]').val(-1)
    }
  }
});