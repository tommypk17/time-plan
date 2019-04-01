<?php
	require('../configuration/db_connect.php');
	header("Content-Type: application/json", true);

	$db = new db_connect('local');
	
	$statement = $db->get_connection()->prepare("SELECT * FROM final_projects WHERE project_id = ?");
	$id = $_GET['projectid'];
	$statement->bind_param("s", $id);
	$statement->execute();
	$res = $statement->get_result();
	$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
	$db->close_db();
	echo $statement->error;
	echo json_encode($assoc);
?>