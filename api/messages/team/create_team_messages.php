<?php
	require('../../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("INSERT INTO final_team_messages(team_message_id, message, time, sender_id, fk_team_id)VALUES(?,?,?,?,?);");

	$entryID = $db->get_uuid()->get_result();
	$id = $_POST['id'];
	$uid = $_POST['userid'];
	$table = $_POST['table'];
	$message = $_POST['message'];
	$time = $_POST['time'];
	$statement->bind_param("sssss", $entryID, $message, $time, $uid, $id);
	$statement->execute();
	$db->close_db();

?>