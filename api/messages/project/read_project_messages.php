<?php
	require('../../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("SELECT final_projects.project_name, final_users.username, final_project_messages.message, final_project_messages.time FROM final_project_messages, final_users, final_projects WHERE final_users.user_id = final_project_messages.sender_id AND final_projects.project_id = ? ORDER BY final_project_messages.time");
	$id = $_GET['id'];
	$statement->bind_param("s", $id);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();
	echo json_encode($assoc);
?>