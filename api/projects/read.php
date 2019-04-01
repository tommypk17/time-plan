<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT DISTINCT final_projects.project_name, final_projects.project_id, final_projects.description, final_projects.start_date, final_projects.due_date, final_projects.budget FROM final_teams_users, final_projects, final_teams_projects WHERE final_projects.project_id = final_teams_projects.fk_project_id AND final_teams_users.fk_user_id = ?");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>