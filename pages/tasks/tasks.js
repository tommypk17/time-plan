function retData(sec) {
	url = ""
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: sessionStorage['user_id']
		},
		url: '../../api/tasks/read.php',
		success: function (data) {
			displayTableAddKey(data, 'task_name', 'task_id', 'final_tasks', sec);
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function loadTaskDetails(sec, id, api) {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid : sessionStorage['user_id'],
			id : id
		},
		url: '../../api/'+api,
		success: function (data) {
			displayDetails(data)
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}

function displayDetails(json){
	section = $('#task-details')
	ul = $('<ul>')
	taskid = ''
	taskname = ''
	for(x in json[0]){
		li = $('<li>')
		if(x == 'task_name'){
			taskname = '<h2>'+pascalCase(json[0][x])+'</h2>'
		}else if(x == 'task_id'){
			taskid = pascalCase(json[0][x])	 
		}else{
			li.append('<b>'+ pascalCase(x) + '</b>: '+json[0][x])
			ul.append(li)
			
		}
	}
	done = $('<a>').attr({
		'value' : taskid,
		'class' : 'button',
		'id' : 'mark-done'
 	})
	done.html('Mark as Done')
	
	section.html(ul);
	ul.before(taskname)
	ul.after(done)
	$('#mark-done').on('click', function(){
		updateTask($('#mark-done').attr('value'));
	})
}

function updateTask(id){
	$.ajax({
		type: 'POST',
		dataType: 'html',
		data: {
			id : id
		},
		url: '../../api/tasks/update_complete.php',
		success: function () {
			alert('Marked complete')
			$('#task-details').html('<h2>No tasks selected!</h2>')
			retData('#sec2')
		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
}


$(document).ready(function () {
	retData('#sec2');
	$('table').ready(function () {
		$(document).on('click', 'table tr td', function (item) {
			section = $(item.target).attr('class')
			value = $(item.target).attr('value')
			$('#task-details').html = loadTaskDetails(section, value, 'tasks/read_task_details.php');
		})
	})

});
