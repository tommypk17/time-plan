function retData(userid, type, loc, sec) {
	url = '../../api/messages/'+loc;
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: userid,
			type: type
		},
		url: url,
		success: function (data) {
			displayTable(data, sec);
		},
		error: function (jqxhr, status, error) {
			var errorMessage = jqxhr.message;
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}
function retDataAddKey(userid, keyLoc, keyName, type, loc, tableName, sec) {
	url = '../../api/messages/'+loc;
	
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: userid,
			type: type
		},
		url: url,
		success: function (data) {
			displayTableAddKey(data, keyLoc, keyName, tableName, sec);
		},
		error: function (jqxhr, status, error) {
			var errorMessage = jqxhr.message;
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}
$(document).ready(function () {
	retDataAddKey(sessionStorage['user_id'], 'project_name', 'project_id', 'project', 'read_projects.php', 'final_projects', '#project-messages');
	retDataAddKey(sessionStorage['user_id'], 'team_name', 'team_id', 'project', 'read_team.php', 'final_teams', '#team-messages');
	$('table').ready(function(){
		$(document).on('click', 'table tr td', function(item){
			section = $(item.target).attr('class')
			value = $(item.target).attr('value')
			if(section == 'final_projects'){
				$('#selected-messages').html = loadMessages(section, value, 'project/read_project_messages.php');
			}else if(section == 'final_teams'){
				$('#selected-messages').html = loadMessages(section, value, 'team/read_team_messages.php');

			}
		})
	})
});



function loadMessages(section, value, loc){
	url = '../../api/messages/'+loc;
	userid = sessionStorage['user_id']
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: userid,
			id: value
		},
		url: url,
		success: function (data) {
			$('#selected-messages').html('<h2>')

			$('#selected-messages h2').html('Selected '+ section.split('_')[1].split('s')[0] + ' messages')
			displayTable(data, '#selected-messages');
			$('#selected-messages').append(loadAddMessages())
			$('#message-submit').click('click', function(){
				message = $('#message').val()
				addMessage(message, value, section);
			});
		},
		error: function (jqxhr, status, error) {
			var errorMessage = jqxhr.message;
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function loadAddMessages(){
	html = $('<section>')
	label = $('<label>')
	label.attr('for', 'message')
	label.html('Message:')
	input = $('<textarea>')
	submit = $($('<a>'))
	submit.attr({
		'id':'message-submit',
		'class':'button'
	})
	submit.html('Submit Message')
	html.append(label)
	html.append(input.attr('id','message'))
	html.append(submit)
	return html;
}

function addMessage(message, id, table){
	loc = ""
	section = ""
	api=""
	table = table.split('s')[0] + "_messages"
	if(table == 'final_team_messages'){
		loc = 'team/create_team_messages.php'
		section = 'final_teams'
		api='team/read_team_messages.php'
	}else if(table == 'final_project_messages'){
		loc = 'project/create_project_messages.php'
		section = 'final_projects'
		api='project/read_project_messages.php'
	}
		
	userid = sessionStorage.getItem('user_id');
	url = url = '../../api/messages/'+loc;
	date = getDate()
	
	$.ajax({
		type: 'POST',
		dataType: 'html',
		data: {
			userid : userid,
			id : value,
			table : table,
			message : message,
			time : date
		},
		url: url,
		success: function () {
			loadMessages(section, value, api);
		},
		error: function (jqxhr, status, error) {
			var errorMessage = jqxhr.message;
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
	
}
