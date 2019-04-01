<?php
    class db_connect{
        protected $_db_name;
        protected $_host_name;
        protected $_username;
        protected $_password;
        protected $_connection;
		protected $_result;
        
		public function __construct($location){
			if($location == 'local'){
				$this->local_server();
			}elseif($location == 'pitt'){
				$this->pitt_server();
			}else{
				echo "Failure constructing connection to DB";
			}
			$this->_connection = mysqli_connect($this->_host_name, $this->_username, $this->_password, $this->_db_name);
			if(!$this->_connection){
				die(mysqli_connect_error());
			}
		}
		
		public function pitt_server(){
			$this->_db_name = 'tpk18';
			$this->_username = 'tpk18';
			$this->_password = '4029788';
			$this->_host_name = "localhost";
		}
		public function local_server(){
			$this->_db_name = 'tpk18';
			$this->_username = 'full_user';
			$this->_password = 'Katie7523';
			$this->_host_name = "localhost";

		}
		
        public function query($sql){
//			echo $sql;
            $this->_result = mysqli_query($this->_connection, $sql);
            return $this;
        }
		
        public function get_uuid(){
			$sql = "SELECT UUID();";
			$this->_result = mysqli_query($this->_connection, $sql);
			foreach($this->_result as $row){
				foreach($row as $key=>$val){
					$this->_result = $val;
            		return $this;
				}
			}
        }
		public function get_time(){
			$sql = "SELECT current_timestamp();";
			$this->_result = mysqli_query($this->_connection, $sql);
			foreach($this->_result as $row){
				foreach($row as $key=>$val){
					$this->_result = $val;
            		return $this;
				}
			}
		}

		
		public function as_table(){			
			if(!empty($this->_result)){
				echo "<table>";
				$i = 0;
				foreach($this->_result as $row){
				if($i == 0){
					echo "<tr>";
					foreach($row as $key => $col){
						if(!stristr($key, '_id')){
							echo "<th>" . $key . "</th>";
						}
					}
					echo "</tr>";
					$i++;
				}else{
					break;
				}
				}
				foreach($this->_result as $row){
					echo "<tr>";
							foreach($row as $key => $col){
								if(stristr($key, '_id')){
//									echo $key . " " . $col;
								}else{
									echo "<td>" . $col . "</td>"; 
									
								}
							}
					echo "</tr>";
				}
			}else{
				echo "No Results!";
			}
				echo "</table>";
		}
		
		public function insert($table, array $fields, array $values){
			if($fields != null && $values != null && count($fields) == count($values)){
				$sql = "INSERT INTO " . $this->_db_name .".". $table . " (";
				for($i = 0; $i < count($fields); $i++){
					$sql .= $fields[$i];
					if(count($fields) > 1 && $i < count($fields) - 1){
						$sql .= " , ";
					}
				}
				$sql .= " ) VALUES (";
				for($i = 0; $i < count($values); $i++){
					$sql .= "'".$values[$i]."'";
					if(count($values) > 1 && $i < count($values) - 1){
						$sql .= " , ";
					}
				}
				$sql .= " );";
				if($sql != null){
//					echo $sql;
					$this->_result = mysqli_query($this->_connection, $sql);
				}else die('Was unable to insert data');

			}
			return $this;

		}
		public function close_db(){
			mysqli_close($this->_connection);
		}
		public function get_connection(){
			return $this->_connection;
			
		}
		public function get_result(){
			return $this->_result;
		}
    }
?>