<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("INSERT INTO final_projects (project_id, project_name, description, start_date, due_date, budget)VALUES(?,?,?,?,?,?);");
	$pid = $db->get_uuid()->get_result();
	$statement->bind_param("sssssd", $pid , $_POST['projectname'], $_POST['desc'], $_POST['start'], $_POST['due'], $_POST['budget']);
	$statement->execute();
	$db->close_db();
?>