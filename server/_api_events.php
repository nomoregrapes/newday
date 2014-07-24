{

<?php

	require_once('dbconfig.php');
	
	$sql = "SELECT * FROM ndevent WHERE 1;";
	$mysqli = new mysqli($dbsite, $dbuser, $dbpass, $dbname);
	$result = $mysqli->query($sql);
	
	$events = array();
	if($result) {
		while ($row = $result->fetch_assoc()) {
			$events[] = '{"id": "'.$row['e_id'].'", '
							.'"day": "'.$row['e_date'].'", '
							.'"start": "'.$row['e_start'].'", '
							.'"end": "'.$row['e_end'].'", '
							.'"title": "'.$row['e_title'].'", '
							.'"notes": "'.$row['e_notes'].'", '
							.'"locid": "'.$row['e_location'].'", '
							.'"location": "'.$row['e_loc_name'].'" }';
		}
		echo '"ndevent": ['.implode($events, ',').']';
	}


?>


}
