<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	$uid = $_POST['userid'];
	$statement = $db->get_connection()->prepare("UPDATE final_users set first_name=?, last_name=?, username=?, password=? WHERE user_id = ?");

	$statement->bind_param("sssss", $_POST['firstname'], $_POST['lastname'], $_POST['username'], $_POST['password'], $uid);

	$statement->execute();

	$db->close_db();

?>