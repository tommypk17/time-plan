function retData(sec) {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: sessionStorage['user_id']
		},
		url: '../../api/projects/read.php',
		success: function (data) {
			displayTableAddKey(data, 'project_name', 'project_id', 'final_projects', sec);
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}


function fillGannt(id) {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			projectid: id
		},
		url: '../../api/projects/read_gannt.php',
		success: function (data) {
			google.charts.setOnLoadCallback(function () {
				drawChart(data)
			});


		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}


$(document).ready(function () {
	retData('#project-table');
	google.charts.load('current', {
		'packages': ['gantt']
	});
	$(document).on('click', 'table tr td', function (item) {
		fillGannt($(item.target).attr('value'))
	});
});


function drawChart(x) {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Task ID');
	data.addColumn('string', 'Task Name');
	data.addColumn('string', 'Assigned To');
	data.addColumn('date', 'Start Date');
	data.addColumn('date', 'End Date');
	data.addColumn('number', 'Duration');
	data.addColumn('number', 'Percent Complete');
	data.addColumn('string', 'Dependencies');

	for (i = 0; i < x.length; i++) {
		complete = null;
		if(x[i]['complete'] == 0){
			complete = 0;
		}else if(x[i]['complete'] == 1){
			complete = 100;
			
		}
		data.addRows([
			[x[i]['task_id'], x[i]['task_name'], null, new Date(x[i]['start_date']), new Date(x[i]['end_date']), null, complete, null]
		]);
	}


	var options = {
		gantt: {
			criticalPathEnabled: false,
			percentEnabled: true,
			backgroundColor: {fill:'#e64a19'},
			percentStyle: {fill: 'black'},
			
		}
	};

	var chart = new google.visualization.Gantt(document.getElementById('project-gannt'));

	chart.draw(data, options);
	$('#chart-title').text(x[0]['project_name'])
}
