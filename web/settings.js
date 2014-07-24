
apibase = "http://www.livingwithdragons.com/maps/newday";
//apibase = "http://localhost/livingwithdragons/maps/newday";

$(document).ready(function(){
	$('.topmenu #home').click(function() {
		window.location.href = "index.html";
	});
	
	
	$('#link-events-clear').click(function() {
		localStorage.removeItem('ndSavedEvents');
		$('#jResult').html('Timetable data cleared. New data may be downloaded shortly.');
	});
	
	$('#link-locations-clear').click(function() {
		localStorage.removeItem('ndSavedLocations');
		$('#jResult').html('Locations data cleared. New data may be downloaded shortly.');
	});
	
	$('#link-silly').click(function() {
		$('#jResult').html('Calibration Complete');
	});
});

