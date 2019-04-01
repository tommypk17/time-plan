<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("INSERT INTO final_tasks(task_id, fk_project_id, fk_user_id, task_name, description, complete, start_date, due_date, spent_of_budget)VALUES(?,?,?,?,?,?,?,?,?);");
	$tid = $db->get_uuid()->get_result();
	$complete = 0;
	$statement->bind_param("sssssissd", $tid , $_POST['projectid'], $_POST['userid'], $_POST['taskname'], $_POST['desc'], $complete, $_POST['start'], $_POST['due'], $_POST['budget']);
	$statement->execute();
	echo $statement->error;
	$db->close_db();
?>