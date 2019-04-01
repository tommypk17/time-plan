<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT COUNT(final_tasks.complete) as incomplete, ((SELECT COUNT(final_tasks.task_id) FROM final_tasks WHERE final_tasks.fk_user_id = ?)-COUNT(final_tasks.complete)) as complete FROM final_tasks WHERE fk_user_id = ? AND complete = 0");
	$statement->bind_param("ss", $_GET['userid'], $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>