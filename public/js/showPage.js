// TODO: 1. Add a method to calculate overall percentage
// TODO: 2. Add a method to calculate the current grade
// TODO: 3. Add method to distrubute the points based on category

// variables
var gradeSum = 0, // Toatl sum of graded assignment
  totalPoints = 0, //  Maximum points of all available assignment
  assignNumber = 0,
  pointsLeftNumber = 0,
  newOrder = [{}],
  classId = "",
  deleteAction;

// To make the grade dropdown work
$("#grade-selector").dropdown();

// unhighlight once clicked on white space
$("#content, #sidebar").click(function (e) {
  if (e.target == this) {
    $("tr").css({
      "background-color": "",
    });
    $("#editAssignment").prop("disabled", true);
    $("#deleteAssignment").prop("disabled", true);
    $("#editCategory").prop("disabled", true);
    $("#deleteCategory").prop("disabled", true);
    $("#saveOrder").attr("hidden", true);
  }
});

// Side Nav
$("#sidebarCollapse").click(function (e) {
  e.preventDefault();
  $("#sidebar")
    .toggleClass("active")
    .find(".content")
    .load($(this).attr("href"));
});

// To show the modal for the class edit form
$("#editClass").on("click", function (e) {
  e.preventDefault();
  $("#editOneClass")
    .modal("show")
    .find(".modal-content")
    .load($(this).attr("href"));
});

// To show the modal for the add Assignment form
$("#addAssignment").on("click", function (e) {
  e.preventDefault();
  $("#modalAdd")
    .modal("show")
    .find(".modal-content")
    .load($(this).attr("href"));
});

// To show the modal for Edit Assignment form
$("#editAssignment").on("click", function (e) {
  e.preventDefault();
  $("#modalEdit")
    .modal("show")
    .find(".modal-content")
    .load($(this).attr("href"));
});

// To show the modal for delete Assignment form
$("#deleteAssignment").on("click", function (e) {
  e.preventDefault();
  $("#modalDelete")
    .modal("show")
    .find(".modal-content")
    .load($(this).attr("href"));
});

// To maximize and minimize the divs
$("#button").click(function () {
  if ($(this).html() == "-") {
    $(this).html("+");
  } else {
    $(this).html("-");
  }
  $("#box").slideToggle();
});
$("#button2").click(function () {
  if ($(this).html() == "-") {
    $(this).html("+");
  } else {
    $(this).html("-");
  }
  $("#box2").slideToggle();
});

// popovers Initialization
$(function () {
  $('[data-toggle="popover"]').popover();
});

//Delete an assignment
function deleteForm() {
  $("#delete-form").attr("action", deleteAction);
}

// Editing and deleting assignments
function editRow(userId, classId, assignId, num) {
  // initialize variables
  editUrl =
    "/users/" +
    userId +
    "/classes/" +
    classId +
    "/assignments/" +
    assignId +
    "/edit";
  deleteUrl =
    "/users/" + userId + "/classes/" + classId + "/assignments/" + assignId;
  deleteAction =
    "/users/" +
    userId +
    "/classes/" +
    classId +
    "/assignments/" +
    assignId +
    "?_method=DELETE";
  setAssignNumber(num);
  setClassId(classId);

  // To get the new data
  $("tbody").sortable({
    update: function (event, ui) {
      $("#saveOrder").attr("hidden", false);
      newOrder = [{}];
      for (var i = 0; i < num; i++) {
        name = $(this).context.children[i].children[0].innerText;
        if ($(this).context.children[i].children[1].innerText == "Not Graded")
          grade = -1;
        else grade = Number($(this).context.children[i].children[1].innerText);
        total = Number($(this).context.children[i].children[2].innerText);
        newOrder.push({
          name: name,
          grade: grade,
          total: total,
        });
      }
    },
  });

  setDeleteAction(deleteAction);

  //enable the edit and delete buttons
  $("#editAssignment").prop("disabled", false).attr("href", editUrl);
  $("#deleteAssignment").prop("disabled", false).attr("href", deleteUrl);

  //highlight the row
  $("#dtBasicExample").on("click", "td", function () {
    $("tr").each(function () {
      $(this).css({
        "background-color": "",
      });
    });
    $(this).closest("tr").css({
      "background-color": "#87CEEB",
    });
  });
}

// Save new order
$("#saveOrder").on("click", function () {
  dateName = $('input[name="newOrderInput"]');
  newOrder = newOrder.splice(1);
  dateName.val(JSON.stringify(newOrder, null, "  "));
});

// Fills up the Estimate column in assignmnet table
function runClass(data) {
  // TODO: output message if there is no assignment
  // TODO: determine which method to use (point or weight prediction)

  classFound = JSON.parse(data);

  // Class Breakdown
  assignmentNumber = classFound.assignments.length;
  categoryNumber = classFound.categories.length;

  // Global variables
  setTotalPoints(0);
  setGradeSum(0);
  setPointsLeftNumber(0);
  setAssignNumber(assignmentNumber);

  // Local variables
  gradeLetter = $("#grade-selector").find(":selected").text();
  pointsLeftNumber = pointsLeft(gradeLetter, classFound);
  count = 0;
  distr = 0;

  // Points Prediction Method 2.0
  if (classFound.categories.length == 0) {
    pointsPredictionMethod(classFound, gradeLetter, pointsLeftNumber);
  } else {
    // Weight Prediction Method 2.0
    weightPredictionMethod(classFound, gradeLetter);
    console.log(classFound)
  }

  // Update Class Info
  updateClassInfo = { pointLeft: pointsLeftNumber, overallGrade: 100 };
  console.log("updateClassInfo: ", updateClassInfo);
  updateClassInfo = $('input[name="updateClassInfo"]');
  updateClassInfo.val(
    JSON.stringify({ pointLeft: pointsLeftNumber, overallGrade: 100 })
  );
}

// Points Prediction Method 2.0
function pointsPredictionMethod(classFound, gradeLetter, pointsLeftNumber) {
  if (pointsLeftNumber < 0) {
    window.scrollTo(0, 0);
    $("#message")
      .hide()
      .addClass("alert alert-danger")
      .html(
        "I am sorry. You lost too many points to achieve a(n) " + gradeLetter
      )
      .fadeTo(2000, 500)
      .slideUp(700, function () {
        $("#message").slideUp(700);
      });
  } else {
    classFound.assignments.forEach((assignment) => {
      assignmentId = $("#" + assignment._id);
      // For Graded assignments
      if (assignment.grade != -1) {
        count++;
        gradeSum += Number(assignment.grade);
        totalPoints += Number(assignment.total);
        cellResult(true, assignmentId);
      } else {
        // Not Graded assignments
        totalPoints += Number(assignment.total);
        nongraded = assignNumber - count;
        distr = pointsLeftNumber / nongraded;
        outPutGrade = Number(assignment.total) - distr;
        cellResult(false, assignmentId, outPutGrade);
      }
    });
  }
}

// Weight Prediction Method 2.0
function weightPredictionMethod(classFound, gradeLetter) {
  if (pointsLeftNumber < 0) {
    window.scrollTo(0, 0);
    $("#message")
      .hide()
      .addClass("alert alert-danger")
      .html(
        "I am sorry. You lost too many points to achieve a(n) " + gradeLetter
      )
      .fadeTo(2000, 500)
      .slideUp(700, function () {
        $("#message").slideUp(700);
      });
  } else {
    // Weight Prediction Method 2.0
    classFound.assignments.forEach((assignment) => {
      // TODO: Make sure all assignments belong to a category
      assignmentId = $("#" + assignment._id);

      // If the assignment has a grade
      if (assignment.grade != -1) {
        count++;
        gradeSum += Number(assignment.grade);
        totalPoints += Number(assignment.total);
        cellResult(true, assignmentId);
      } else {
        // If the assignment has no grade
        switch (gradeLetter) {
          case "A":
            leastPercentage = assignment.category.weight * 0.9;
            break;
          case "B":
            leastPercentage = assignment.category.weight * 0.8;
            break;
          case "C":
            leastPercentage = assignment.category.weight * 0.7;
            break;
          case "D":
            leastPercentage = assignment.category.weight * 0.6;
            break;
          case "F":
            leastPercentage = assignment.category.weight * 0.5;
            break;
        }
        totalNumberAssignmentNotScored = 0;
        totalPointsScored = 0;
        totalPointsNotScored = 0;

        classFound.categories.forEach((item) => {
          if (item._id == assignment.category.id) {
            totalPointsNotScored = item.assignments.totalPoints;
            totalNumberAssignmentNotScored =
              item.assignments.numberAssignmentNotGraded;
            totalPointsScored = item.assignments.sumActualScore;
          }
        });

        part1 = leastPercentage * totalPointsNotScored;
        part2 = part1 / assignment.category.weight;
        part3 = part2 - totalPointsScored;
        estimatePerCategory = part3 / totalNumberAssignmentNotScored;
        cellResult(false, assignmentId, estimatePerCategory);
      }
    });
  }
}

// Print cell result
function cellResult(flag, assignmentId, result) {
  if (flag) {
    $("#estimateColumn").removeAttr("hidden");
    assignmentId.removeAttr("hidden");
    assignmentId.html(
      "<span style='font-size: 14px;' class='badge badge-pill badge-info font-weight-bolder'>Graded</span>"
    );
  } else {
    if (result < 0) {
      result = 0;
      $("#estimateColumn").removeAttr("hidden");
      assignmentId.removeAttr("hidden");
      assignmentId.html(result.toFixed(0));
    } else {
      $("#estimateColumn").removeAttr("hidden");
      assignmentId.removeAttr("hidden");
      assignmentId.html(result.toFixed(0));
    }
  }
  print();
}

// Calculates points left before you loose your current grade
function pointsLeft(letter, classFound) {
  var left = 0,
    sumLeft = 0;

  classFound.assignments.forEach((assignment) => {
    if (assignment.grade != -1) {
      left = assignment.total - assignment.grade;
      sumLeft += left;
    }
  });

  switch (letter) {
    case "A":
      sumLeft = 100 - sumLeft;
      break;
    case "B":
      sumLeft = 200 - sumLeft;
      break;
    case "C":
      sumLeft = 300 - sumLeft;
      break;
    case "D":
      sumLeft = 400 - sumLeft;
      break;
    case "F":
      sumLeft = 500 - sumLeft;
      break;
    default:
      break;
  }
  classFound.pointLeft = sumLeft;
  return sumLeft;
}

// prints all the assignment stats
function print() {
  gradeResult = $("#maxGrade");
  totalResult = $("#maxTotal");
  pointsLeftResult = $("#pointsLeft");
  gradeProgressBar = $("#gradeProgressBar");
  pointsLeftProgressBar = $("#pointsLeftProgressBar");
  percentageResult = $("#percentage");
  totalPercentage = (gradeSum / totalPoints) * 100;

  $("#assignmentStats").css("display", "block");
  gradeProgressBar.width(totalPercentage + "%");
  pointsLeftProgressBar.width(pointsLeftNumber + "%");
  gradeResult.html(gradeSum);
  totalResult.html(totalPoints);
  pointsLeftResult.html(pointsLeftNumber);
  percentageResult.html(totalPercentage + "%");
}

// To set the assignment Numbers
function setAssignNumber(num) {
  assignNumber = num;
}

// To set gradeSum
function setGradeSum(num) {
  gradeSum = num;
}

// To set Total Points
function setTotalPoints(num) {
  totalPoints = num;
}

// To set number of assignments
function setPointsLeftNumber(num) {
  pointsLeftNumber = num;
}

// To set the Delete Action link
function setDeleteAction(action) {
  deleteAction = action;
}

function setClassId(string) {
  classId = string;
}

// Update the Class DB
function updateClassDB() {}
