<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	if($_GET['type'] == 'chart'){
		$statement = $db->get_connection()->prepare("SELECT final_users.first_name, final_users.last_name, final_departments.name, final_teams.team_name FROM final_teams, final_teams_users, final_users, final_departments WHERE final_teams.team_id = final_teams_users.fk_team_id AND final_teams_users.fk_user_id = final_users.user_id AND final_users.fk_department_id = final_departments.department_id AND final_teams.team_id = ?");
	
		$statement->bind_param("s", $_GET['id']);
		
	}else if($_GET['type'] == 'table'){
		$statement = $db->get_connection()->prepare("SELECT final_teams.team_id, final_teams.team_name FROM final_teams, final_teams_users, final_users WHERE final_teams.team_id = final_teams_users.fk_team_id AND final_teams_users.fk_user_id =  final_users.user_id AND final_teams_users.fk_user_id = ?;");
		$statement->bind_param("s", $_GET['userid']);
	}
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>