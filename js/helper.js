function displayTable(data, targetSection) {
	var json = data;
	sec = $(targetSection);
	tbl = $('<table></table');
	tr = $('<tr>');
	
	for(x in json[0]){
		th = $('<th>').append(pascalCase(x));
		tr.append(th)
	}
	tbl.append(tr.attr('class', 'table-header'));
	
	$.each(json, function (i, item) {
		var $tr = $('<tr>');
			for(x in item){
				$tr.append($('<td>').text(item[x]).attr('value', item[x]));
		}
		tbl.append($tr);
	});
	sec.append(tbl)
}

function displayTableAddKey(data, keyLoc, keyName, tableName, targetSection) {
	var json = data;
	sec = $(targetSection);
	tbl = $('<table></table');
	tr = $('<tr>');
	
	for(x in json[0]){
		if(x != keyName){
			th = $('<th>').append(pascalCase(x.replace('_', ' ')));
			tr.append(th)
		}
		
	}
	tbl.append(tr.attr('class', 'table-header'));
	
	$.each(json, function (i, item) {
		var $tr = $('<tr>');
			for(x in item){
				if(item[x] == item[keyLoc]){
					$tr.append($('<td>').text(item[x]).attr('value', item[keyName]).attr('class', tableName));
				}else if(item[x] != item[keyName]){
					$tr.append($('<td>').text(item[x]).attr('value', item[keyName]));
					
				}
		}
		tbl.append($tr);
	});
	sec.html(tbl);

}

function setVisited(visited) {
	localStorage['last_visited'] = visited;
}

function getVisited() {
	return localStorage['last_visited'];
}

function pascalCase(str) {
	str = str.toLowerCase().replace('_', ' ').split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};

function getDate(){
	var date;
	date = new Date();
	date = date.getFullYear() + '-' +
		('00' + (date.getMonth()+1)).slice(-2) + '-' +
		('00' + date.getDate()).slice(-2) + ' ' + 
		('00' + date.getHours()).slice(-2) + ':' + 
		('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
	return date
}

window.alert = function(message){
	$('#alert').css('display', 'block')
	$('#alert-message').text(message);
//	console.log(message)
}

Window.prototype.alert = function(message){
	$('#alert').css('display', 'block')
	$('#alert-message').text(message);
//	console.log(message)
	
}
