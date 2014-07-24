
apibase = "http://www.livingwithdragons.com/maps/newday";


$(document).ready(function(){
	
	//get data from local storage or online
	var ndSavedLocations = JSON.parse( localStorage.getItem('ndSavedLocations'));
	if (ndSavedLocations == null) {	//if null, go get the data
		$.getJSON(apibase+'/_api_venues.php?', {year: '2012', site:'Norwich'}, function(ndSavedLocations) {
			//ndevents = JSON.parse(returneddata);
			localStorage.setItem('ndSavedLocations', JSON.stringify(ndSavedLocations)); //save it for fast loading later
			loadData(ndSavedLocations);
			listVenues('mainvenue');
		});
    }
	else {
		//console.log('data exists');
		loadData (ndSavedLocations);
		listVenues('mainvenue');
	}
	
	//buttons
	$('.subbuttons>div').click(function() {
		//console.log('show events of type '+$(this).attr('id').substring(4));
		var filterType = $(this).attr('id').substring(10);
		listVenues( filterType );
		$('.subbuttons>div').removeClass('current');
		$('#btn-vtype-'+filterType).addClass('current');
	});
	$('.topmenu #home').click(function() {
		window.location.href = "index.html";
	});

});

	//load data, once it's in local storage
	function loadData(thevenues) {
		$.each(thevenues.ndvenue, function(i,item) {
			//<tr><th>Time</th><th>Event</th><th>Location</th><th>Notes</th></tr>';
			$('table#location-list > tbody:last').append('<tr id="'+item.id+'" class="vRow hidden" vtype="'+item.type+'">'
												+'<td>'+ item.name +' '+ item.altname +'</td>'
												+'<td><a href="map.html?pointlat='+ item.lat +'&pointlon='+ item.lon +'" class="link-map">MAP</a></td>'
												+'</tr>');
			//console.log(item);
		});
	}
	
	//show events based on filter
	function listVenues(filterType) {
		$('table#location-list tr.vRow').hide();
		$('table#location-list tr[vtype="'+filterType+'"]').show().removeClass('hidden');
		if( $('table#location-list tr:visible').length == 1) {
			$('tr.noresults').show();
		} else {
			$('tr.noresults').hide();
		}
	}
	

