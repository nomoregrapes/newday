
		var map;
		var lyrStuff;

		function getStuffLocations() {
			var data = 'bbox=' + map.getBounds().toBBoxString();
			$.ajax({
					url: 'data/camping-zones.geojson',
					dataType: 'json',
					data: data,
					success: showLocations
			});
		}
		function showLocations(ajaxresponse) {
			lyrStuff.clearLayers();
			lyrStuff.addData(ajaxresponse);
		}
		function attachClickEvent(feature, layer)
		{
			//layer.on('click', visitCam, feature.properties.refCode);
		}
		function visitCam()
		{
			//console.log("hello"+ this);
			window.location = "selfie.php?cam=" + this;
		}
		$( document ).ready(function() {
			//load map

			map = L.map('map').setView([52.64905, 1.17722], 16); //default location, Newday

			//geolocate
			//map.locate({setView: true, maxZoom: 19});

			//more base layers
			/*
			var MapboxLayer = L.tileLayer('http://{s}.tile.mapbox.com/v3/nomoregrapes.hg06ac3f/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://mapquest.com">MapQuest</a>',
				maxZoom: 19
			}).addTo(map);
			var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			});
			map.addLayer(Esri_WorldImagery);
			*/

			var Thunderforest_Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
			});
			map.addLayer(Thunderforest_Outdoors);

			//add a layer switcher
			var baseMaps = {
				//"Simple Map": MapboxLayer,
			    "Thunderforest Outdoor Map": Thunderforest_Outdoors,
			    //"ESRI World Imagery": Esri_WorldImagery
			};
			//L.control.layers(baseMaps).addTo(map);



var baseJson = {
	"type":"FeatureCollection",
	"features":[
	/*
	{
	    "type": "Feature",
	    "properties": {
	        "name": "Central Station",
	        "amenity": "Railway Station",
	        "popupContent": "This is the train station."
	    },
	    "geometry": {
	        "type": "Point",
	        "coordinates": [-1.81623, 54.99850]
	    }
	}
	*/

	]
};

			lyrStuff = L.geoJson(baseJson, {
				//onEachFeature: attachClickEvent
			});
			map.addLayer(lyrStuff);


			getStuffLocations();
		});