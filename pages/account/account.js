$(document).ready(function(){
	$('#logout').on('click', function(){
		sessionStorage.user_id = "";
		location.reload();
	});
	retData('#account-details-section')
});

function retData(sec){
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {userid : sessionStorage['user_id']},
		url: '../../api/account/read.php',
		success: function (data) {
			displayAccountDetails(data, sec)
		},
		error: function (xhr, status, error) {
					var errorMessage = xhr.status + ': ' + xhr.statusText
					console.log('Error - ' + errorMessage + " "+error);
		}
	});
}

function displayAccountDetails(data, sec){
	section = $(sec);
	ul = $('<ul>')
	taskid = ''
	taskname = ''
	for(x in data[0]){
		li = $('<li>')
			li.append('<b>'+pascalCase(x.replace('_', ' '))+ '</b>: '+pascalCase(data[0][x].replace('_', ' ')))
			ul.append(li)
		}
	
	section.html('<h2>Account Details</h2>')
	section.append(ul);

}