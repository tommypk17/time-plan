<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("SELECT final_projects.project_id, final_projects.project_name FROM final_teams_users, final_projects, final_teams_projects, final_users WHERE final_projects.project_id = final_teams_projects.fk_project_id AND final_users.user_id = final_teams_users.fk_user_id AND final_teams_users.fk_team_id = final_teams_projects.fk_team_id AND final_teams_users.fk_user_id = ?");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>
