<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT SUM(spent_of_budget) as spent, project_id, project_name, budget FROM final_tasks, final_projects WHERE final_projects.project_id in (SELECT project_id FROM final_projects, final_teams_users, final_teams_projects WHERE final_teams_users.fk_user_id = ? group by project_id) AND final_tasks.fk_project_id = final_projects.project_id GROUP BY project_id LIMIT 4");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>