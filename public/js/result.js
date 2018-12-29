// variables
var gradeSum = 0,            // Toatl sum of graded assignment
    totalPoints = 0,         //  Maximum points of all available assignment
    assignNumber = 0,
    pointsLeftNumber = 0,
    deleteAction;

// To make the grade dropdown work
$('#grade-selector').dropdown();

// Dishighlight once clicked on white space
$('body').click( function (e) {
  if ( e.target == this ){
      $('tr').css({'background-color':''})
      $("#editAssignment").prop('disabled', true)
      $('#deleteAssignment').prop('disabled',true)
  }
});

// To show the modal for the class edit form
$('#editClass').on('click',function(e){
  e.preventDefault();
  $('#editOneClass').modal('show').find('.modal-content').load($(this).attr('href'))
})

// To show the modal for the add Assignment form
$('#addAssignment').on('click', function(e) {
  e.preventDefault();
  $('#modalAdd').modal('show').find('.modal-content').load($(this).attr('href'));
});

// To show the modal for Edit Assignment form
$('#editAssignment').on('click', function(e) {
  e.preventDefault();
  $('#modalEdit').modal('show').find('.modal-content').load($(this).attr('href'));
});

// To show the modal for delete Assignment form
$('#deleteAssignment').on('click', function(e){
  e.preventDefault();
  $('#modalDelete').modal('show').find('.modal-content').load($(this).attr('href'))
})


// Fills up the Estimate column in assignmnet table
function runClass(num, grade, total, idName) {
  //TODO: Check and see if there is any assignments if
  //      there is none output a message

  var count = 0, // number of graded assignment
    distr = 0,
    outPutGrade = 0,
    gradeArr = grade.split(','),
    totalArr = total.split(','),
    idArr = idName.split(','),
    gradeLetter = $('#grade-selector').find(":selected").text();

  setAssignNumber(num);
  pointsLeftNumber = pointsLeft(gradeLetter, grade, total);
  if (pointsLeftNumber < 0) {
    $(document).ready(function() {
      $("#message").hide()
        .addClass('alert alert-danger')
        .html('I am sorry. You lost too many points to achieve a(n) ' + gradeLetter)
        .fadeTo(2000, 500)
        .slideUp(700, function() {
          $('#message').slideUp(700)
        })
    });

  } else {
    for (var i = 0; i < assignNumber; i++) {
      result = $('#' + idArr[i]);
      if (gradeArr[i] != -1) {
        count++;
        gradeSum += Number(gradeArr[i]);
        totalPoints += Number(totalArr[i]);
        result.html("*Graded*")
        print();
      } else {
        totalPoints += Number(totalArr[i]);
        nongraded = assignNumber - count;
        distr = pointsLeftNumber / nongraded
        outPutGrade = Number(totalArr[i]) - distr

        if (outPutGrade < 0) {
          outPutGrade = 0
          result.html(outPutGrade.toFixed(2))
          print();
        } else {
          result.html(outPutGrade.toFixed(2))
          print();
        }
      }
    }
  }
}

// Calculates points left before you loose your current grade
function pointsLeft(letter, inGrade, inTotal) {
  var left = 0,
    sumLeft = 0,
    gradeArr = inGrade.split(','),
    totalArr = inTotal.split(',');

  for (let i = 0; i < assignNumber; i++) {
    if (gradeArr[i] != -1) {
      left = totalArr[i] - gradeArr[i];
      sumLeft += left;
    }
  }

  switch (letter) {
    case 'A': sumLeft = 100 - sumLeft; break;
    case 'B': sumLeft = 200 - sumLeft; break;
    case 'C': sumLeft = 300 - sumLeft; break;
    case 'D': sumLeft = 400 - sumLeft; break;
    case 'F': sumLeft = 500 - sumLeft; break;
    default:
      break;
  }
  return sumLeft;
}

// prints all the assignment stats
function print() {
  gradeResult = $('#maxGrade')
  totalResult = $('#maxTotal')
  pointsLeftResult = $('#pointsLeft')
  gradeResult.html(gradeSum)
  totalResult.html(totalPoints)
  pointsLeftResult.html(pointsLeftNumber)
}

// Editing and deleting assignments
function editRow(assignId, classId) {
  //grab the oneClass._id
  editUrl = "/classes/" + classId + "/assignment/" + assignId + "/edit"
  deleteUrl = "/classes/" + classId + "/assignment/" + assignId
  deleteAction = "/classes/" + classId + "/assignment/" + assignId+ "?_method=DELETE"
  setDeleteAction(deleteAction)

  //enable the edit and delete buttons
  $("#editAssignment").prop('disabled', false).attr('href', editUrl)
  $('#deleteAssignment').prop('disabled',false).attr('href',deleteUrl)

  //highlight the row
  $("#dtBasicExample").on("click", 'td', function() {
    $("tr").each(function() {
      $(this).css({'background-color': ''})
    });
    $(this).closest("tr").css({'background-color': '#87CEEB'})
  });
}

// To set the assignment Numbers
function setAssignNumber(num) {
  assignNumber = num;
}

// To set the Delete Action link
function setDeleteAction(num) {
  deleteAction = num;
}

//Delete an assignment
function deleteForm(){
  $('#delete-form').attr('action', deleteAction)
}


//Testing Popovers
// popovers Initialization
$(function () {
    $('[data-toggle="popover"]').popover()
})
