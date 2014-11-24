<?php 
	function writeMsg($myName){
		echo "my name is $myName";
	}
	
	if(isset($_POST['myName'])){
		$name = $_POST['myName'];
		writeMsg($_POST['myName']);
	}
?>