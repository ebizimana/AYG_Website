// variables
var maxGrade = 0,
  maxTotal = 0,
  distr = 0,
  assignNumber = 0,
  gradeLetter = $('#grade-selector').find(":selected").text();


// To make the grade dropdown work
$('#grade-selector').dropdown();

// Check for a grade
function runClass(assignNumber, grade, total, idName) {
  var count = 0, // number of graded assignment
    gradeSum = 0, // Toatl sum of graded assignment
    totalPoints = 0, //  Maximum points of all available assignment
    distr = 0,
    outPutGrade = 0,
    gradeArr = grade.split(','),
    totalArr = total.split(','),
    idArr = idName.split(',');

  for (var i = 0; i < assignNumber; i++) {
    result = $('#' + idName[i]);
    if (grade[i] != -1) {
      count++;
      gradeSum += grade[i];
      totalPoints += total[i];
      setMaxgrade(gradeSum);
      setMaxTotal(totalPoints)
      result.html("*Graded*")
    } else {
      totalPoints += total[i]
      setMaxTotal(totalPoints)
      nongraded = assignNumber - count;
      setAssignNumber(assignNumber);
      distr = PointsLeft(gradeLetter, grade[i], total[i]) / nongraded
      setdistr(distr)
      outPutGrade = total - distr
      result.html(outPutGrade)
    }
  }


}

function PointsLeft(letter, inGrade, inTotal) {
  var left = 0,
    total = inTotal,
    grade = inGrade,
    sumLeft = 0,
    name = " ";

  for (let i = 0; i < assignNumber; i++) {
    if (inGrade != -1) {
      left = total - grade;
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

// Probably should be deleted
function setMaxgrade(num) {
  maxGrade = num
}

function setMaxTotal(num) {
  maxTotal = num
}

function setdistr(num) {
  distr = num;
}

function setAssignNumber(num) {
  assignNumber = num;
}

// function test(element) {
//   var newArr = element.split(',')
//   console.log(newArr)
// }
