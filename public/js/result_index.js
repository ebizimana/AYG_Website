// Classes Dropdown
$('.ui.dropdown')
  .dropdown();

// Grades Dropdown
$('#grade')
  .dropdown({
    values:[
      {
        name:'A',
        value:'a',
        selected: true
      },
      {
        name: 'B',
        value:'b'
      },
      {
        name:'C',
        value:'c'
      },
      {
        name: 'D',
        value:'d'
      },
      {
        name:'F',
        value:'f'
      }
    ]
  });
