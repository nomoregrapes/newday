{

<?php

	require_once('dbconfig.php');
	
	$sql = "SELECT * FROM ndvenue WHERE 1;";
	$mysqli = new mysqli($dbsite, $dbuser, $dbpass, $dbname);
	$result = $mysqli->query($sql);
	
	$venue = array();
	if($result) {
		while ($row = $result->fetch_assoc()) {
			$venues[] = '{"id": "'.$row['v_id'].'", '
							.'"name": "'.$row['v_name'].'", '
							.'"altname": "'.$row['v_altname'].'", '
							.'"type": "'.$row['v_type'].'", '
							.'"lat": "'.$row['v_lat'].'", '
							.'"lon": "'.$row['v_lon'].'" '
							//.'"polygon": "'.$row['v_polygon'].'" '
							.' }';
		}
		echo '"ndvenue": ['.implode($venues, ',').']';
	}


?>


}
