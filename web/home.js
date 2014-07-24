
apibase = "http://www.livingwithdragons.com/maps/newday";
//apibase = "http://localhost/livingwithdragons/maps/newday";

$(document).ready(function(){
	$.get(apibase+'/_api_news.php', function(newsData) {
		$('#news-feed').html(newsData);
	});
	
	//event handlers for buttons/links
	$('#link-timetable').click(function() {
		window.location.href = "timetable.html";
	});
	
	$('#link-map').click(function() {
		window.location.href = "map.html";
	});
	
	$('#link-locations').click(function() {
		window.location.href = "locations.html";
	});
	
	$('#link-settings').click(function() {
		window.location.href = "settings.html";
	});
	
	$('#link-about').click(function() {
		window.location.href = "about.html";
	});
});

