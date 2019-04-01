<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("INSERT INTO final_teams(team_id, team_name)VALUES(?,?)");
	$tid = $db->get_uuid()->get_result();
	$statement->bind_param("ss", $tid, $_POST['name']);

	$statement->execute();
	$db->close_db();

?>
