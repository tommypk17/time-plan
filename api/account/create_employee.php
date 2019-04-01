<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	$uid = $db->get_uuid()->get_result();
	$statement = $db->get_connection()->prepare("INSERT INTO final_users(user_id, first_name, last_name, fk_department_id, username, password)VALUES(?,?,?,?,?,?)");

	$statement->bind_param("ssssss", $uid, $_POST['firstname'], $_POST['lastname'], $_POST['department'], $_POST['username'], $_POST['password']);

	$statement->execute();

	$db->close_db();

?>