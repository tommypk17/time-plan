<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	$pid = $_POST['projectid'];
	$statement = $db->get_connection()->prepare("UPDATE final_projects set project_name=?, description=?, start_date=?, due_date=?, budget=? WHERE project_id = ?");

	$statement->bind_param("ssssss", $_POST['projectname'], $_POST['description'], $_POST['startdate'], $_POST['duedate'], $_POST['budget'], $pid);

	$statement->execute();

	$db->close_db();

?>