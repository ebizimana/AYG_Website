# AYG_Website
The website for The AYG app

# To Do
- [ ] Fix the menu
- [x] Add the Grade dropdown
- [x] Add the Run button
- [x] Make sure the Run button give people the results
- [x] Work on Deleting classes
- [x] Work on Editing classes
- [ ] Work on the assignment table
- [ ] Make sure the grade and total inputs are numbers
- [ ] Work on making sure the total is always higher than the grade
- [ ] Work on Modal forms
- [ ] Double check on the user before deleting a class
- [ ] Work on the plus icons
- [ ] Work on deleting assignments
- [ ] Work on the signup router and template
- [ ] Work on the login router and template
- [ ] Work on authentication
- [ ] Work on authorization
- [ ] Work on the home page
  - [ ] Make sure the home page display all the current class
        current grade and all the necessary details

// Edit form for Classes

<% numberOfAssign = 0 %>
<% gradeArr       = [] %>
<% totalArr       = [] %>
<% idArr          = [] %>
<% classFound.assignments.forEach(function(oneClass){ %>
<% numberOfAssign += 1 %>
<% gradeArr.push(oneClass.grade) %>
<% totalArr.push(oneClass.total) %>
<% idArr.push(oneClass._id) %>
<% }) %>

<div id="message"></div>
<div class="ui raised very padded text container segment">
  <h2 class="ui header">Grade Picker</h2>
  <hr>
  <div class="ui form">
    <div class="field">
      <label>Pick A Grade: </label>
      <select class="ui selection dropdown" name="grade" id="grade-selector">
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="f">F</option>
      </select>
    </div>
    <button type="submit" class="ui inverted blue button" onclick="runClass('<%=numberOfAssign%>','<%=[ gradeArr ]%>','<%=[ totalArr ]%>','<%=[ idArr ]%>')">
      Submit
    </button>
  </div>
</div>

<div class="ui main show-page container">
  <h1 id="header"> Class Name:
    <a href="/classes/<%= classFound._id%>/edit">
      <%= classFound.className %>
    </a>

    <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Create a New Assignment</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">

            <div class="md-form mb-4">
              <i class="fas fa-lock prefix grey-text"></i>
              <input type="text"
                     id="defaultForm-pass"
                     name="assignment[grade]"
                     class="form-control validate">
              <label data-error="wrong" data-success="right" for="defaultForm-pass">Assignment Name</label>
            </div>

            <div class="md-form mb-4">
              <i class="fas fa-lock prefix grey-text"></i>
              <input type="Number"
                     id="defaultForm-pass"
                     name="assignment[grade]"
                     class="form-control validate">
              <label data-error="wrong" data-success="right" for="defaultForm-pass">Your Grade</label>
            </div>

            <div class="md-form mb-4">
              <i class="fas fa-lock prefix grey-text"></i>
              <input type="Number"
                     id="defaultForm-pass"
                     name="assignment[grade]"
                     class="form-control validate">
              <label data-error="wrong" data-success="right" for="defaultForm-pass">Your Total</label>
            </div>

          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button class="btn btn-default">Login</button>
          </div>
        </div>
      </div>
    </div>

    <div  id="putRight" class="text-center">
      <a href="/classes/<%= classFound._id %>/assignment/new"
         class="btn btn-default btn-rounded mb-4"
         data-toggle="modal"
         data-tooltip="Add an Assignment to the class"
         data-target="#modalLoginForm">
         <i style="font-size: 2rem;" class="fas fa-plus"></i>
      </a>
    </div>

  <table class="ui celled table">
    <thead>
      <th style="width:30px;"></th>
      <th>Name</th>
      <th>Grade</th>
      <th>Total</th>
      <th> Estimate </th>
    </thead>
    <% classFound.assignments.forEach(function(oneClass){ %>
    <tr>
      <td><a href="/classes/<%= classFound._id%>/assignment/<%= oneClass._id%>/edit"><i class="edit icon"></i></a></td>
      <td>
        <%= oneClass.name %>
      </td>
      <td>
        <%= oneClass.grade %>
      </td>
      <td>
        <%= oneClass.total %>
      </td>
      <td id="<%= oneClass._id %>"></td>
    </tr>
    <% }) %>
  </table>
</div>

<div class="ui raised very padded text container segment">
  <h2 class="ui header">Stats</h2>
  <hr>
  <h1 class="ui header">You have:
    <span id="maxGrade"></span> /
    <span id="maxTotal"></span>
  </h1>
  <h3>Points left before you lose your grade :
    <span id="pointsLeft"></span>
  </h3>
</div>



// New form for Assignments
<form action="/classes/<%= classFound._id %>/assignment" method="post">
  <div class="ui raised very padded text container">
    <h1 class="ui huge header" id="header">Create a New Assignment for <%= classFound.className %></h1>
    <div class="ui segment">
      <div class="ui  big form">
        <div class="field">
          <label>Assignment Name</label>
          <input placeholder="Assignment Name" type="text" name="assignment[name]">
        </div>
        <div class="field">
          <label>Grade</label>
          <input placeholder="Grade" name="assignment[grade]" type="Number">
        </div>
        <div class="field">
          <label>Total</label>
          <input placeholder="Total" name="assignment[total]" type="Number">
        </div>
        <button type="submit" class="ui inverted blue button">Submit
        </button>
      </div>
    </div>
  </div>
</form>
