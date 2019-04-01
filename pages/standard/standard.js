$(document).ready(function () {
	//jquery
	str = '/fall2018/tpk18/final/pages/';
	loc = $(location)[0].pathname;
	currentColor = '#29CF00';
	if (str + 'home/' == loc) {
		$('a[name="home"]').css('color', currentColor);
		
	} else if (str + 'tasks/' == loc) {
		$('a[name="tasks"]').css('color', currentColor);
		
	} else if (str + 'teams/' == loc) {
		$('a[name="teams"]').css('color', currentColor);
		
	} else if (str + 'projects/' == loc) {
		$('a[name="projects"]').css('color', currentColor);
		
	} else if (str + 'messages/' == loc) {
		$('a[name="messages"]').css('color', currentColor);
		
	} else if (str + 'account/' == loc) {
		$('a[name="account"]').css('color', currentColor);
	} else if (str + 'manage/' == loc){
		$('a[name="manage"]').css('color', currentColor);
	}

});
