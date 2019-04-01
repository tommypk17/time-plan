<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT final_tasks.task_name, final_tasks.task_id, final_projects.project_name FROM final_tasks, final_projects WHERE fk_user_id = ? AND final_tasks.fk_project_id = final_projects.project_id AND final_tasks.complete = 0 ORDER BY final_tasks.due_date ASC");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>