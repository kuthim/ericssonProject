<?php 
	function writeMsg($myName){
		echo "my name is $myName";
	}
	echo "<script type='text/javascript'>alert('hello');</script>";
	if(isset($_POST['myName'])){
		$name = $_POST['myName'];
		//echo "<script type='text/javascript'>alert('hello');</script>";
		//echo "<script type='text/javascript'>alert('$name');</script>";
		writeMsg($_POST['myName']);
	}
	//$name = $_POST['myName'];
	//echo "<script type='text/javascript'>alert('$name');</script>";
?>