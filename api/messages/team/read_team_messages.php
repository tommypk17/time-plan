<?php
	require('../../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("SELECT final_teams.team_name, final_users.username, final_team_messages.message, final_team_messages.time FROM final_team_messages, final_users, final_teams WHERE final_users.user_id = ? AND final_teams.team_id = ? ORDER BY final_team_messages.time");
	$id = $_GET['id'];
	$uid = $_GET['userid'];
	$statement->bind_param("ss", $uid, $id);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>