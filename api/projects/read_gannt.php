<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT final_tasks.task_id, final_tasks.task_name, final_tasks.start_date, final_tasks.due_date as end_date, final_projects.project_name, final_tasks.complete FROM final_projects, final_tasks, final_users WHERE final_projects.project_id = ? AND final_tasks.fk_project_id = final_projects.project_id AND final_tasks.fk_user_id = final_users.user_id ORDER BY final_tasks.start_date ASC");
	$statement->bind_param("s", $_GET['projectid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);

?>