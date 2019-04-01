<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("INSERT INTO final_teams_users(fk_team_id, fk_user_id)VALUES(?,?)");

	$statement->bind_param("ss", $_POST['teamid'], $_POST['userid']);

	$statement->execute();

	$db->close_db();

?>
