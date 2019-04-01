if ($(location).attr('href') != 'final/pages/login/') {
	if (sessionStorage['user_id'] == "" || sessionStorage['user_id'] == null || sessionStorage['user_id'].length != 36) {
		alert('You have been logged out. Please log back in and try again.');
		$(location).attr('href', '../login/');
	}else{
		$.ajax({
		type: 'GET',
		dataType: 'json',
		data: {
			userid: sessionStorage['user_id'],
		},
		url: '../../api/account/read_manager.php',
		success: function (data) {
			checkManager(data)
		},
		error: function (jqxhr, status, error) {
			var errorMessage = jqxhr.message;
			console.log('Error - ' + errorMessage + " " + error);
		}
	});
	}
}

function checkManager(data){
	if(data[0]['manager_id'] != null){
		$('.header nav').append('<a href="../manage/" name="manage">Manage</a>');
	}
}
