
apibase = "http://www.livingwithdragons.com/maps/newday";
//apibase = "http://localhost/livingwithdragons/maps/newday";

$(document).ready(function(){
	/*
	$.get(apibase+'/_api_news.php', function(newsData) {
		$('#news-feed').html(newsData);
	});
	*/
	
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
	
	$('.search_results').on('click', 'li', function() {
		window.location.href = "map.html"
		+ "?title=" + $(this).attr('data-title')
		+ "&lat=" + $(this).attr('data-lat')
		+ "&lon=" + $(this).attr('data-lon')
		+ "&drawline=yes"
		;
	});
});


/* for the autcomplete */
var searchData;
$(function() {
	$('#search').prop('disabled', true);
	$.ajax({
		url: "data/church-camps.geojson",
		dataType: "json"
	}).done( function(data) {
		searchData = data.features;
		$('#search').prop('disabled', false);
		setupAutoComplete();
	});

	function setupAutoComplete() {
		$('#search').autocomplete({
			source: searchData,
			minLength: 2,
			delay: 500, /* delay searching, incase they're still typing */
		})
		.on("autocompletesearch", function(event, ui) {
			//when it starts to search
			$('.ac-search .loadicon').css('visibility', 'visible');
		})
		// override the function to create the "autocomplete suggestions list"
		.autocomplete( "instance" )._renderMenu = function( ul, items ) {
			$('.search_results').empty();
			$.each( items, function( index, item ) {
				var html = "<li class='link-sresult' data-lat='" 
					+ item.geometry.coordinates[1] +"' data-lon='" 
					+ item.geometry.coordinates[0] +"' data-title='" 
					+ item.properties.name + "'>"
					+ item.properties.name + "</li>";
				$('.search_results').append( html );
				//console.log(item.properties.name);
			});
		};
	}

	$('#ac-search-form').submit(function() {
		return false;
	});



});
