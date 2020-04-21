// TODO: Add a method to calculate the current grade
// TODO: Add method to distrubute the points based on category
// TODO: Add a method to calculate overall percentage


// variables
var gradeSum = 0, // Toatl sum of graded assignment
  totalPoints = 0, //  Maximum points of all available assignment
  assignNumber = 0,
  pointsLeftNumber = 0,
  newOrder = [{}],
  classId = "",
  deleteAction;

// To make the grade dropdown work
$('#grade-selector').dropdown();

// Dishighlight once clicked on white space
$('#content, #sidebar').click(function (e) {
  if (e.target == this) {
    $('tr').css({
      'background-color': ''
    })
    $("#editAssignment").prop('disabled', true)
    $('#deleteAssignment').prop('disabled', true)
    $("#editCategory").prop('disabled', true)
    $('#deleteCategory').prop('disabled', true)
    $("#saveOrder").attr('hidden', true)
  }
});

// Side Nav
$('#sidebarCollapse').click(function (e) {
  e.preventDefault();
  $('#sidebar').toggleClass('active').find('.content').load($(this).attr('href'));
});


// To show the modal for the class edit form
$('#editClass').on('click', function (e) {
  e.preventDefault();
  $('#editOneClass').modal('show').find('.modal-content').load($(this).attr('href'))
})

// To show the modal for the add Assignment form
$('#addAssignment').on('click', function (e) {
  e.preventDefault();
  $('#modalAdd').modal('show').find('.modal-content').load($(this).attr('href'));
});

// To show the modal for Edit Assignment form
$('#editAssignment').on('click', function (e) {
  e.preventDefault();
  $('#modalEdit').modal('show').find('.modal-content').load($(this).attr('href'));
});

// To show the modal for delete Assignment form
$('#deleteAssignment').on('click', function (e) {
  e.preventDefault();
  $('#modalDelete').modal('show').find('.modal-content').load($(this).attr('href'))
})

// To maximize and minimize the divs
$("#button").click(function () {
  if ($(this).html() == "-") {
    $(this).html("+");
  } else {
    $(this).html("-");
  }
  $("#box").slideToggle();
});
$('#button2').click(function () {
  if ($(this).html() == "-") {
    $(this).html("+");
  } else {
    $(this).html("-")
  }
  $("#box2").slideToggle();
})

// popovers Initialization
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Delete an assignment
function deleteForm() {
  $('#delete-form').attr('action', deleteAction)
}

// Editing and deleting assignments
function editRow(userId, classId, assignId, num) {
  // initialize variables
  editUrl = "/users/" + userId + "/classes/" + classId + "/assignments/" + assignId + "/edit"
  deleteUrl = "/users/" + userId + "/classes/" + classId + "/assignments/" + assignId
  deleteAction = "/users/" + userId + "/classes/" + classId + "/assignments/" + assignId + "?_method=DELETE"
  setAssignNumber(num);
  setClassId(classId)

  // To get the new data
  $("tbody").sortable({
    update: function (event, ui) {
      $("#saveOrder").attr('hidden', false)
      newOrder = [{}]
      for (var i = 0; i < num; i++) {
        name = $(this).context.children[i].children[0].innerText
        grade = Number($(this).context.children[i].children[1].innerText)
        total = Number($(this).context.children[i].children[2].innerText)
        newOrder.push({
          name: name,
          grade: grade,
          total: total
        })
      }
    }
  })

  setDeleteAction(deleteAction)

  //enable the edit and delete buttons
  $("#editAssignment").prop('disabled', false).attr('href', editUrl)
  $('#deleteAssignment').prop('disabled', false).attr('href', deleteUrl)

  //highlight the row
  $("#dtBasicExample").on("click", 'td', function () {
    $("tr").each(function () {
      $(this).css({
        'background-color': ''
      })
    });
    $(this).closest("tr").css({
      'background-color': '#87CEEB'
    })
  });
}

// Save new order
$("#saveOrder").on('click', function () {
  dateName = $('input[name="newOrderInput"]')
  newOrder = newOrder.splice(1)
  dateName.val(JSON.stringify(newOrder, null, "  "))
})

// Calculate Estimate Points for Assignment Per Category
function ePAC(subtotalGrade, assignId, categories) {
  result = 0
  categories.forEach((item, index) => {
    if (item._id == assignId) {
      result = (subtotalGrade * item.assignments.totalPoints) / (100 * item.assignments.totalNumber)
    }
  })
  return result
}

// Fills up the Estimate column in assignmnet table
function runClass(data) {
  classFound = JSON.parse(data)

  // Class Breakdown
  assignmentNumber = classFound.assignments.length
  categoryNumber = classFound.categories.length
  grade = [], total = [], id = [], weight = [], categoryId = []
  classFound.assignments.forEach((item) => {
    id.push(item._id)
    grade.push(item.grade)
    total.push(item.total)
    weight.push(item.category.weight)
    categoryId.push(item.category.id)
  })


  // Global variables
  setTotalPoints(0);
  setGradeSum(0);
  setPointsLeftNumber(0);
  setAssignNumber(assignmentNumber);

  // Local variables 
  gradeLetter = $('#grade-selector').find(":selected").text();
  pointsLeftNumber = pointsLeft(gradeLetter, grade, total);
  count = 0
  distr = 0
  
  /**************   POINTS PREDICTION METHOD **********************************/
  if (pointsLeftNumber < 0) {
    $(document).ready(function () {
      $("#message").hide()
        .addClass('alert alert-danger')
        .html('I am sorry. You lost too many points to achieve a(n) ' + gradeLetter)
        .fadeTo(2000, 500)
        .slideUp(700, function () {
          $('#message').slideUp(700)
        })
    });

  } 
  else {
    for (var i = 0; i < assignNumber; i++) {
      result = $('#' + id[i]);
      if (grade[i] != -1) {
        count++;
        gradeSum += Number(grade[i]);
        totalPoints += Number(total[i]);
        $('#estimateColumn').removeAttr('hidden')
        result.removeAttr('hidden')
        // TODO: Change this to look more awesome
        result.html("<span style='font-size: 14px;' class='badge badge-pill badge-info font-weight-bolder'>Graded</span>")
        print();
      } else {
        totalPoints += Number(total[i]);
        nongraded = assignNumber - count;
        distr = pointsLeftNumber / nongraded
        outPutGrade = Number(total[i]) - distr

        if (outPutGrade < 0) {
          outPutGrade = 0
          $('#estimateColumn').removeAttr('hidden')
          result.removeAttr('hidden')
          result.html(outPutGrade.toFixed(0))
          print();
        } else {
          $('#estimateColumn').removeAttr('hidden')
          result.removeAttr('hidden')
          result.html(outPutGrade.toFixed(0))
          print();
        }
      }
    }
  }

    /**************   WEIGHT PREDICTION METHOD **********************************/

    for (i = 0; i < assignNumber; i++) {
      if (gradeLetter == 'A') {
        console.log('categoryTotal: ' + categoryNumber) // output 4
        weightDistribution = 10 / categoryNumber
        console.log('weightDistribution: ' + weightDistribution) // output 2.5
        leastPercentage = weight[i] - weightDistribution
        console.log('weight[i]: ' + weight[i])  // output 30
        console.log('leastPercentage: ' + leastPercentage) // output 27.5
        subtotalGrade = (leastPercentage * 100) / weight[i]
        console.log('subTotalGrade: ' + subtotalGrade.toFixed(0)) // output 91.7
        estimatePerCategory = ePAC(subtotalGrade.toFixed(0),categoryId[i],classFound.categories)
        console.log("estimatePerCategory: " + estimatePerCategory)
      }
    }
}

// Calculates points left before you loose your current grade
function pointsLeft(letter, grade, total) {
  var left = 0,
    sumLeft = 0;

  for (let i = 0; i < assignNumber; i++) {
    if (grade[i] != -1) {
      left = total[i] - grade[i];
      sumLeft += left;
    }
  }

  switch (letter) {
    case 'A':
      sumLeft = 100 - sumLeft;
      break;
    case 'B':
      sumLeft = 200 - sumLeft;
      break;
    case 'C':
      sumLeft = 300 - sumLeft;
      break;
    case 'D':
      sumLeft = 400 - sumLeft;
      break;
    case 'F':
      sumLeft = 500 - sumLeft;
      break;
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
  gradeProgressBar = $('#gradeProgressBar')
  pointsLeftProgressBar = $('#pointsLeftProgressBar')
  totalPercentage = (gradeSum / totalPoints) * 100

  $('#assignmentStats').css("display", "block")
  gradeProgressBar.width(totalPercentage + '%')
  pointsLeftProgressBar.width(pointsLeftNumber + "%")
  gradeResult.html(gradeSum)
  totalResult.html(totalPoints)
  pointsLeftResult.html(pointsLeftNumber)

}

// To set the assignment Numbers
function setAssignNumber(num) {
  assignNumber = num;
}

// To set gradeSum
function setGradeSum(num) {
  gradeSum = num
}

// To set Total Points
function setTotalPoints(num) {
  totalPoints = num
}

// To set number of assignments
function setPointsLeftNumber(num) {
  pointsLeftNumber = num
}

// To set the Delete Action link
function setDeleteAction(action) {
  deleteAction = action;
}

function setClassId(string) {
  classId = string
}