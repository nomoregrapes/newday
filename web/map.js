
		var map;
		var lyrStuff;
		var lyrLocation; var mrkLocation; var mrkLocationCircle;
		var markDest;
		var lineSatnav;

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
			lyrStuff.eachLayer(function(layer) {
				styleUpLayer(layer);
			});

			//as we don't have data, do this...
			mixItUp();
		}

		/** caution, this function changes the data and then updates the style **/
		function mixItUp() {
			lyrStuff.eachLayer(function(layer) {
				if(layer.toGeoJSON().properties.cat == null) {
					cats = ['green', 'blue', 'red', 'purple', 'yellow', 'cafe', 'venue', 'unknown'];
					newcat = cats[Math.floor(Math.random()*cats.length)];
					layer.toGeoJSON().properties.cat = newcat;
					styleUpLayer(layer);
				}
			});
		}

		function styleUpLayer(layer) {
			if (layer.toGeoJSON().properties.cat === 'green') {
				layer.setStyle({
					fillColor: "#4daf4a",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'blue') {
				layer.setStyle({
					fillColor: "#377eb8",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'red') {
				layer.setStyle({
					fillColor: "#e41a1c",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'purple') {
				layer.setStyle({
					fillColor: "#984ea3",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'yellow') {
				layer.setStyle({
					fillColor: "#ffff33",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'cafe') {
				layer.setStyle({
					fillColor: "#f781bf",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else if (layer.toGeoJSON().properties.cat === 'venue') {
				layer.setStyle({
					fillColor: "#a65628",
					fillOpacity: 0.8,
					stroke: false
				})
			}
			else {
				layer.setStyle({
					fillColor: "#999999",
					fillOpacity: 0.8,
					stroke: false
				})
			}
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

			//when we know where yu are
			function onLocationFound(e) {
				var radius = e.accuracy / 2;
				if(mrkLocation == undefined) {
					mrkLocation = L.marker(e.latlng).addTo(map);
					mrkLocationCircle = L.circle(e.latlng, radius).addTo(map);
				}
				else {
					mrkLocation.setLatLng(e.latlng);
					mrkLocationCircle.setLatLng(e.latlng);
					mrkLocationCircle.setRadius(radius);
				}
				updateNavLine(e.latlng);
			}
			map.on('locationfound', onLocationFound);

			//every 5secs, find where you are
			setInterval(function(){ 
				map.locate({setView: false, maxZoom: 16});
			}, 5000);
			map.locate({setView: false, maxZoom: 16});

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

			//get parameters from get url string
			function getParameterByName(name) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(location.search);
				return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			//update a line between you and the destination
			function updateNavLine(pointStart) {
				if(locLine == true) {
					pointEnd = L.latLng(locLat, locLon);
					if(pointStart != null && pointEnd != null) {
						var linePoints = [pointStart, pointEnd];
						var polyline_options = {
							color: '#000'
						};
						if(lineSatnav == undefined) {
							lineSatnav = L.polyline(linePoints, polyline_options);
							lineSatnav.addTo(map);
						} else {
							lineSatnav.setLatLngs(linePoints);
						}
					}
				}
			}

			//deal with a search
			if( window.location.search != null ) {
				var locTitle = getParameterByName('title');
				var locLat = getParameterByName('lat');
				var locLon = getParameterByName('lon');
				if(getParameterByName('drawline') == 'yes') {
					var locLine = true;
				}
				if(locTitle != '') {
					$('h1').text(locTitle);	
				}
				if(locLat != '' && locLon != '') {
					markDest = L.marker([locLat, locLon]).addTo(map);
					if(locLine != '')
					{
						//updateNavLine();
					}
				}
			}
			
		});