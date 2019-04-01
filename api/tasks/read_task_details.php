<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT final_tasks.task_id, final_tasks.task_name, final_tasks.description, final_tasks.start_date, final_tasks.due_date, final_teams.team_name, final_projects.project_name, final_projects.description, final_tasks.spent_of_budget as budget_spent FROM final_tasks, final_teams, final_projects, final_teams_projects WHERE final_tasks.fk_user_id = ? AND final_tasks.task_id = ? AND final_projects.project_id = final_tasks.fk_project_id");
	$statement->bind_param("ss", $_GET['userid'], $_GET['id']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>