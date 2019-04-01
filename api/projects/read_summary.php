<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT project_name, description, start_date, due_date FROM final_projects, final_teams_users, final_teams_projects WHERE final_teams_users.fk_user_id = ? AND due_date >= NOW() AND due_date <= DATE_ADD(NOW(), INTERVAL 3 MONTH) GROUP BY project_id;");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>