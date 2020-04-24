// Form Error Handler
function checkTotal(){
   var totalInput =  parseInt($('#editTotal').val());
   var gradeInput = parseInt($('#editGrade').val());
   var styles = document.getElementById('error');
   
  if( gradeInput > totalInput)
   {
     console.log("grade is higer than the total ");
     // change the label underline to red
    $('#editTotal').css({
      color:"#CD5C5C",
      "border-bottom": "1px solid  #CD5C5C",
      "box-shadow": "0 1px 0 0  #CD5C5C"
    })
     // write the reason why
     styles.style.visibility= 'visible'
     //disable the submit button
      $('#submit').prop('disabled',true)
   }
  else {
     console.log("enable the submit button ");
     $('#editTotal').css({
       color:"#495057",
       "border-bottom": "1px solid  #00c851",
       "box-shadow": "0 1px 0 0  #00c851"
     })
     styles.style.visibility= 'hidden'
     $('#submit').prop('disabled',false)
     $('#submit').submit()
    }
}


