<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');

	$statement = $db->get_connection()->prepare("SELECT department_id, name FROM final_departments;");
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();

	echo json_encode($assoc);
?>