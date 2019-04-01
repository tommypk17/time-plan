function buildTeamChart(data){
	var cy = cytoscape({
		container: $('#cy'),
		style: [ // the stylesheet for the graph
			{
				selector: 'node',
				style: {
					'background-color': '#666',
					'label': 'data(name)',
					'width': '20px',
					'height': '20px',
				}
		},

			{
				selector: 'edge',
				style: {
					'width': 5,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'target-arrow-shape': 'triangle'
				}
		}
	  ]
	});

	//ajax get team and fill in here
	
	var x = 0;
	h2 = $('#team-title');
	h2.text(data[0]['team_name'] + " Team");

	for(i in data){
		cy.add([
			{ group: "nodes", data: { id: "n"+x, name: data[x]['first_name']+" "+data[x]['last_name'] }}
		]);
		if( x != 0){
			if(data[x+1]==null){
				cy.add([
					{ group: "edges", data: { id: "e"+(x+1), source: "n"+x, target: "n0" } },
					{ group: "edges", data: { id: "e"+x, source: "n"+(x-1), target: "n"+x } }
					
				]);
			}else{
				cy.add([
					{ group: "edges", data: { id: "e"+x, source: "n"+x, target: "n"+(x-1) } }
				]);
			}
		}
		x++;
	}
	var layout = cy.layout({ name: 'circle' });
	layout.run();

	cy.autolock(true);
	cy.zoomingEnabled(false);
	cy.panningEnabled(false);
	cy.fit();
	cy.center();

}

function retData(type){
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {userid : sessionStorage['user_id'], type : type},
		url: '../../api/teams/read.php',
		success: function (data) {
			displayTableAddKey(data, 'team_name', 'team_id', 'final_teams','#team-table');
		},
		error: function (xhr, status, error) {
					var errorMessage = xhr.status + ': ' + xhr.statusText
					console.log('Error - ' + errorMessage + " "+error);
		}
	});
}

function populateChart(id, type){
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid : sessionStorage['user_id'],
			id : id,
			type : type
		},
		url: '../../api/teams/read.php',
		success: function (data) {
			buildTeamChart(data);
		},
		error: function (xhr, status, error) {
					var errorMessage = xhr.status + ': ' + xhr.statusText
					console.log('Error - ' + errorMessage + " "+error);
		}
	});
}

$(document).ready(function(){
//	buildTeamChart();
	teamChart = $('#team-chart');
	retData('table');
	
	$('table').ready(function () {
		$(document).on('click', 'table tr td', function (item) {
			section = $(item.target).attr('class')
			value = $(item.target).attr('value')

			$('#cy').css({
				height: '20em',
				width: '20em',
				padding: '1em'
			});
			populateChart(value, 'chart')
		})
	})
	
});