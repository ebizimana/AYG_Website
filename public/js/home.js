// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777'

// Get all classes data 
function allClassesData(allClassData){
    alert("I am here")

    classesData = JSON.parse(allClassData);
    classesNames = []
    console.log("classesData: ", classesData)

    classesData.forEach((oneClass) =>{
        // TODO: Get class points left, overall grade.
        classesNames.push(oneClass.className) 
    })

    var moreChart = new Chart(classesDataChart, {
        type: 'bar',
        data: {
            labels: classesNames,
            datasets: [{
                // TODO: All this needs to change
                label: 'Points left',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

