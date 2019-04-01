$(document).ready(function () {
	$('#select-option').on('click', function () {
		selected = $('select[name=selection]').val()
		loadSelection(selected);
	})
})

function loadSelection(selected) {
	if (selected == 'create') {
		$('#sec2').load('create.html')
	} else if (selected == 'update') {
		$('#sec2').load('update.html')
	}

}

function createProject(args) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		data: {
			userid: sessionStorage['user_id'],
			projectname: args['name'],
			start: args['start'],
			due: args['due'],
			budget: args['budget'],
			desc: args['description']
		},
		url: '../../api/projects/create_project.php',
		success: function (data) {
			alert('Project Created!')

		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});

}

function createTask(userid, projectid, taskname, description, start, due, budget) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		data: {
			userid: userid,
			projectid: projectid,
			start: start,
			due: due,
			budget: budget,
			desc: description,
			taskname: taskname
		},
		url: '../../api/tasks/create_task.php',
		success: function (data) {
			alert('Task Created!')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});

}

function createTeam(name) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		data: {
			name: name
		},
		url: '../../api/teams/create_team.php',
		success: function (data) {
			alert('Team Created!')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});

}

function createEmployeeTeam(user, team) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		url: '../../api/teams/create_employee.php',
		data: {
			userid: user,
			teamid: team
		},
		success: function (data) {
			alert('Employee has been added to Team')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function createEmployee(firstname, lastname, username, password, department) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		url: '../../api/account/create_employee.php',
		data: {
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
			department: department
		},
		success: function (data) {
			alert('Employee has been created')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function createTeamProject(teamid, projectid) {
	$.ajax({
		type: 'POST',
		dataType: 'html',
		url: '../../api/teams/create_team_project.php',
		data: {
			teamid: teamid,
			projectid: projectid
		},
		success: function (data) {
			alert('Team has been added to project')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}
