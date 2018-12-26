
// variables
var gradeSum = 0,          // Toatl sum of graded assignment
    totalPoints = 0,      //  Maximum points of all available assignment
    distr = 0,
    assignNumber = 0,
    pointsLeftNumber = 0 ;


// To make the grade dropdown work
$('#grade-selector').dropdown();

// Check for a grade
function runClass(num, grade, total, idName) {
  var count               = 0, // number of graded assignment
      distr               = 0,
      outPutGrade         = 0,
      gradeArr            = grade.split(','),
      totalArr            = total.split(','),
      idArr               = idName.split(','),
      gradeLetter         = $('#grade-selector').find(":selected").text();

  setAssignNumber(num);
  pointsLeftNumber = pointsLeft(gradeLetter, grade, total);
  if (pointsLeftNumber < 0 ){
    console.log("I am sorry. You lost too many points to achieve a(n)");
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

        if(outPutGrade < 0){
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

function pointsLeft(letter, inGrade, inTotal) {
  var left        = 0,
      sumLeft     = 0,
      gradeArr    = inGrade.split(','),
      totalArr    = inTotal.split(',');

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

function print(){
  gradeResult = $('#maxGrade')
  totalResult = $('#maxTotal')
  pointsLeftResult = $('#pointsLeft')
  gradeResult.html(gradeSum)
  totalResult.html(totalPoints)
  pointsLeftResult.html(pointsLeftNumber)
}

function setAssignNumber(num){
  assignNumber = num;
}
