<?php
	header("Content-Type: application/json", true);
	require('../api/configuration/db_connect.php');
	$db = new db_connect('local');
	if(!empty($_POST)){
		$statment = $db->get_connection()->prepare("SELECT username, user_id FROM final_users WHERE username = ? AND password = ?");
		$statment->bind_param("ss", $_POST['username'], $_POST['password']);
		$statment->execute();
		$res = $statment->get_result();
		$assoc = mysqli_fetch_all($res , MYSQLI_ASSOC);
		$db->close_db();

		echo json_encode($assoc);
		
	}

?>