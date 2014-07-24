
apibase = "http://www.livingwithdragons.com/maps/newday";

pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

$(document).ready(function(){
	
	//get data from local storage or online
	var ndevents = JSON.parse( localStorage.getItem('ndSavedEvents'));
	if (ndevents == null) {	//if null, go get the data
		$.getJSON(apibase+'/_api_events.php?', {day: 'Tuesday', time:9}, function(ndevents) {
			//ndevents = JSON.parse(returneddata);
			localStorage.setItem('ndSavedEvents', JSON.stringify(ndevents)); //save it for fast loading later
			loadData(ndevents);
			showEvents('now');
		});
    }
	else {
		//console.log('data exists');
		loadData (ndevents);
		showEvents('now');
	}
	
	//buttons
	$('.subbuttons>div').click(function() {
		//console.log('show events of type '+$(this).attr('id').substring(4));
		var filterType = $(this).attr('id').substring(4);
		showEvents( filterType );
		$('.subbuttons>div').removeClass('current');
		$('#btn-'+filterType).addClass('current');
	});
	$('.topmenu #home').click(function() {
		window.location.href = "index.html";
	});

});

	//load data, once it's in local storage
	function loadData(theevents) {
		$.each(theevents.ndevent, function(i,item) {
			//<tr><th>Time</th><th>Event</th><th>Location</th><th>Notes</th></tr>';
			$('table#timetable > tbody:last').append('<tr id="'+item.id+'" class="eRow hidden" date="'+item.day+'" start="'+item.start+'" end="'+item.end+'">'
												+'<td>'+ item.start +' to '+ item.end +'</td>'
												+'<td>'+ item.title +'</td>'
												+'<td>'+ item.location +'</td>'
												+'<td>'+ item.notes +'</td>'
												+'</tr>');
			//console.log(item);
		});
	}
	
	//show events based on filter
	function showEvents(filterType) {
		$('table#timetable tr.eRow').hide();
		
		var dateToday = formatDate(new Date(), 'sortableDash');
		dateTomorrow = new Date(); dateTomorrow.setDate(dateTomorrow.getDate()+1);
		var dateTomorrow = formatDate(dateTomorrow, 'sortableDash');
		var tcurrentHour = new Date();
		var tStartNow = tcurrentHour.getHours() + 0.45;
		var tEndNow = tcurrentHour.getHours() - 0.15;
 		
		if (filterType == 'etype-pmseminar') {
			$('table#timetable [start="15.30"]').show().removeClass('hidden');
		}
		else if (filterType == 'etype-freetime') {
			$('table#timetable [start="14.00"]').show().removeClass('hidden');
		}
		else if (filterType == 'etype-amseminar') {
			$('table#timetable [start="11.30"]').show().removeClass('hidden');
		}
		else if (filterType == 'tomrw') {
			$('table#timetable tr[date="'+dateTomorrow+'"]').show().removeClass('hidden');
			console.log('show '+'table#timetable [date="'+dateTomorrow+'"]');
		}
		else if (filterType == 'today') {
			$('table#timetable [date="'+dateToday+'"]').show().removeClass('hidden');
		}
		else {
			filterType = 'now';
			$.each('table#timetable [date="2012-08-13"]', function(i,item) {
				if( $(this).attr('start') < tStartNow) {
					$(this).show().removeClass('hidden');
				}
			});
		}
		//visible rows, for each
		$.each('table#timetable td:visible', function(i, item) {
			if( ($(this).attr('date') == dateToday) && ($(this).attr('end') < tEndNow) ) {
				$(this).hide();
			}
		});
	}
	
	//formating	2012-08-13
	function formatDate(dateObject, formatType) {
		var formattedDate = '';
		if (formatType == 'presentable') {
			formattedDate = 'oops';
		}
		else {
			formattedDate = 
				String(dateObject.getFullYear()) + '-' +
				pad(String(dateObject.getMonth()+1), 2) + '-' +
				pad(String(dateObject.getDate()), 2);
		}
		return String(formattedDate);
	}
