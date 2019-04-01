$(document).ready(function () {
	$('#submit').on('click', function(){
		checkLogin();
	});
	$(document).keypress(function(e) {
			if(e.which == 13) {
				checkLogin();
			}
	});
});

function checkLogin(){
	var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: '../../php/login.php',
			data: {
				username : username,
				password: password
			},
			success: function (data) {
				login(data)
			},
			error: function (xhr, status, error) {
				var errorMessage = xhr.status + ': ' + xhr.statusText
				console.log('Error - ' + errorMessage + " "+error);
			}

		});
}


function login(data){
	if(data.length != 0){
		sessionStorage['user_id'] = data[0].user_id;
		$(location).attr('href', '../home/');
	}else{
		alert('Check Username and Password')
	}
}
