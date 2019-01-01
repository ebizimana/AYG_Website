# AYG_Website
The website for The AYG app

# To Do
- [x] Add the Grade dropdown
- [x] Add the Run button
- [x] Make sure the Run button give people the results
- [x] Work on Deleting classes
- [x] Work on Editing classes
- [x] Work on the assignment table
  - [x] Work on Modal forms for the assignments management
  - [x] Work on deleting assignments
  - [x] Double check on the user before deleting a class
- [x] Displaying class info by hovering on the class title
- [x] Work on the Stats div for the assignments
- [x] Make sure the grade and total inputs are numbers
- [x] Work on making sure the total is always higher than the grade
- [ ] Work on moving individual cells
- [ ] Work on the plus icon on the classes page
- [ ] Fix the menu
- [ ] Work on the signup router and template
- [ ] Work on the login router and template
- [ ] Work on authentication
- [ ] Work on authorization
- [ ] Work on the home page
  - [ ] Make sure the home page display all the current class
  - [ ] Current grade and all the necessary details


//Edit form
<form  novalidate class="needs-validation" id="editAssignmentForm" action="/classes/<%= class_id %>/assignment/<%= assignFound._id %>?_method=PUT" method="post">
  <div class="modal-header text-center">
    <h4 class="modal-title w-100 font-weight-bold text-primary ml-5">Edit Assignment</h4>
    <button type="button" class="close text-primary" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body mx-3">
    <div class="md-form mb-5">
      <input name="assignUpdate[name]"  type="text" id='inputName'value="<%= assignFound.name %>" class="form-control validate">
      <label  class='active' for="inputName">Assignment Name</label>
    </div>

    <div class="md-form mb-5">
      <input  name="assignUpdate[grade]" required type="number" id='editGrade' value="<%= assignFound.grade %>" class="form-control validate">
      <label   class='active' for="editGrade">Grade</label>
    </div>

    <div class="md-form mb-5">
      <input   name="assignUpdate[total]" onblur="checkTotal()" id='editTotal' type="number" value="<%= assignFound.total %>" class="form-control validate">
      <label   data-error="wrong" class='active'  for="editTotal">Total</label>
    </div>
  </div>

  <div class="modal-footer d-flex justify-content-center buttonAddFormWrapper">
    <button onclick="form_submit('<%= assignFound.grade %>','<%= assignFound.total %>')"
            type="submit" id="submit" disabled
            class="btn btn-outline-primary btn-block buttonAdd"
            >Edit Assignment
      <i class="fas fa-paper-plane-o ml-1"></i>
    </button>
  </div>
</form>

<script src="/js/assignmentForms.js"></script>
