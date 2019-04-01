<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT task_name, description, start_date, due_date FROM final_tasks WHERE fk_user_id = ? AND complete = 0 AND due_date >= NOW() AND due_date <= DATE_ADD(NOW(), INTERVAL 1 WEEK) ORDER BY due_date");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>