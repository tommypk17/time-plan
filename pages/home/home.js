$(document).ready(function () {
	fillChart('tasks')
	fillChart('projects')
	retData('#sec2', 'tasks');
	retData('#sec3', 'projects');

});



function retData(sec, type) {
	url = ""
	if (type == 'projects') {
		url = 'projects/read_summary.php'
	} else if (type == 'tasks') {
		url = 'tasks/read_summary.php'

	}
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: sessionStorage['user_id']
		},
		url: '../../api/' + url,
		success: function (data) {
			displayTable(data, sec);
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function fillChart(type) {
	if (type == 'tasks') {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {
				userid: sessionStorage['user_id']
			},
			url: '../../api/tasks/read_complete.php',
			success: function (data) {
				ctx1 = $('#tskcmplt');
				new Chart(ctx1, {
					type: 'doughnut',
					data: {
						labels: ['complete', 'incomplete'],
						datasets: [{
							label: 'Tasks Complete',
							data: [data[0]['complete'], data[0]['incomplete']],
							backgroundColor: ["#DB00E0", "#0075FF"]
					}]
					}
				});
			},
			error: function (xhr, status, error) {
				var errorMessage = xhr.status + ': ' + xhr.statusText
				console.log('Error - ' + errorMessage + " " + error);
			}
		});
	} else if (type == 'projects') {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			data: {
				userid: sessionStorage['user_id']
			},
			url: '../../api/projects/read_budget.php',
			success: function (data) {
				ctx2 = $('#prjbdgt');
				chart = new Chart(ctx2, {
					type: 'bar',
					data: {
						datasets: [{
							label: 'Project Budget by used %',
							backgroundColor: ['#00D9CC', '#C4C4C4', 'black', 'purple']
				}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									steps: 10,
									stepValue: 5,
									max: 100,
									beginAtZero: true
								}
					}]
						}
					}
				})
				for (x = 0; x < data.length; x++) {
					chart.data.labels.push(data[x]['project_name'])
					total = data[x]['spent'] / data[x]['budget'] * 100
					chart.data.datasets.forEach((dataset) => {
						dataset.data.push(total);
					});
				}

				chart.update()
			},
			error: function (xhr, status, error) {
				var errorMessage = xhr.status + ': ' + xhr.statusText
				console.log('Error - ' + errorMessage + " " + error);
			}
		});
	}
}
