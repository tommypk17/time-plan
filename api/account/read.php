<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("SELECT final_users.first_name, final_users.last_name, final_departments.name as department_name, final_users.username FROM final_users, final_departments WHERE final_users.user_id = ? AND final_users.fk_department_id = final_departments.department_id");
	$statement->bind_param("s", $_GET['userid']);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>
