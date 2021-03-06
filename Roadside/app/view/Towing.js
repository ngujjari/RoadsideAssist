Ext.define('Roadside.view.Towing', {
	extend : 'Ext.navigation.View',
	xtype : 'towing-location',

	requires : ['Ext.util.Geolocation', 'Ext.Map', 'Roadside.store.Contacts', 'Ext.navigation.View','Roadside.controller.Application'],
	mapMarkers : [], // store all markers

	config : {
		title : 'Towing',
		baseCls : 'x-towing-location',
		layout : 'card',
		iconCls : 'locate',

		items : [{
			xtype : "map",
			id : "towingmap",
			itemId : "towingItemId",
			flex : 1,
			mapOptions : {
				//useCurrentLocation:true,
				zoomControl : true,
				panControl : true,
				draggable : true,
				rotateControl : false,
				streetViewControl : false,
				mapTypeId : google.maps.MapTypeId.G_HYBRID_MAP,
				mapTypeControl : true,
				zoom : 13
			}
		}],
		
		control : {
			'map[itemId="towingItemId"]' : {
				maprender : 'towingMapRenderer'
			}
		},
		record : null
	},

	towingMapRenderer : function(comp, map) {
		var mapPanel = this.down('map');
		var gMap = mapPanel.getMap();
		if (gMap == null) {
			// Still no map, wait a little longer
			// Ext.Function.defer(this.centerMap,250,this);
			console.log('towingMapRenderer begin1 === ' + gMap);
		} else {
			console.log('towingMapRenderer begin === ' + gMap);
			var me = this;
			var untilLatThere = setInterval(function(){
		 	console.log('towingMapRenderer untilLatThere begin === '+lat);
		 	if(lat != 'undefined' && lat != null && lat != '') {
			 	console.log('towingMapRenderer untilLatThere === ');
			 	 me.searchMap(comp, gMap);
			 	clearInterval(untilLatThere);
				
				}
		 	}, 1000);
			
			

			console.log('towingMapRenderer end == ');
		}
		towingObj = this;
	},

	searchMap : function(comp, gMap)
	{
	
			mapref = gMap;			
			var latLngCoordinates = new google.maps.LatLng(lat, lng);			

			var request = {
				location : latLngCoordinates,
				radius : 10000,			
				keyword : 'Tow'
			};

			marker = new google.maps.Marker({
				map : gMap,
				animation : google.maps.Animation.DROP,
				position : latLngCoordinates,
				title : 'My Location',
				icon : 'resources/icons/roadside/green-dot.png'
			});

			var service = new google.maps.places.PlacesService(gMap);
			gMap.setCenter(latLngCoordinates);
			setTimeout(function () {
			gMap.panTo(latLngCoordinates)

			},1000);
		
			service.nearbySearch(request, function(results, status) {
			console.log('callback begin. status = ' + status);
			if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
			//createMarker(results[i], i);
			console.log('result ' + i + ' = ' + results[i] + ' loc: ' + results[i].geometry.location + '   , reference = ' + results[i].reference);
			var request = {
				reference : results[i].reference
			};

			service = new google.maps.places.PlacesService(mapref);
			service.getDetails(request, function (place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				//createMarkerDetails(place);
				console.log('createMarkerDetails begin.' + mapref + '  name: ' + place.name + infoCntr);

				var placeLoc = place.geometry.location;
				infowindow[infoCntr] = new google.maps.InfoWindow({
					content : place.name + ' , <br> \n ' + place.formatted_address + '  - ' + place.formatted_phone_number
				});
			
				var marker1 = new google.maps.Marker({
					map : mapref,
					position : place.geometry.location
				});
				google.maps.event.addListener(marker1, 'click', function() {
					console.log(infoCntr + '  - createmarker place.name12.' + place.name + '  - ' + place.formatted_phone_number);
					//infowindow[infoCntr].close();
					for (var cntidx = 0; cntidx < infoCntr; cntidx++) {
						infowindow[cntidx].close();
					}
					var contentString = '<div id="content">'+ place.name + ', <br>' + place.formatted_address + '<br>' 
					+ '<div style="width: 100%; white-space: nowrap;display:inline-block">'
					+ '<a href="tel:' + place.formatted_phone_number + '" class="x-button x-button-rpc x-button-plain x-layout-box-item" target="_blank">' 		
					+ '<img src="resources/icons/roadside/sym_action_call.png"/> <div style="clear:both"></div>'
					+ place.formatted_phone_number + '</a> '
					
					+ ' </div></div>';
					
					infowindow[0] = new google.maps.InfoWindow({
					content : contentString,
					
					});
				
					var infoContent = infowindow[0].content;
					
					infowindow[0].open(mapref, marker1);
			
				});
			
				google.maps.event.addListener(mapref, 'click', function() {
					console.log('  map click event ');					
						for (var idx = 0; idx < infoCntr; idx++) {
							infowindow[idx].close();
						}
				});
			
				infoCntr++;
				//Pan the map to your marker
				/*    setTimeout(function () {
				 mapref.panTo(place.geometry.location);
				 }, 1000);
				 */
			
				console.log('createmarker end.');
	
			}
			});

			}
		}
			console.log('callback end.');
		});	
	},
	/*callbackPlaces: function(results, status) {

	 if (status == google.maps.places.PlacesServiceStatus.OK) {

	 for (var i = 0; i < results.length; i++) {
	 addMarker(results[i]);
	 }
	 }
	 },

	 addMarker: function(place) {
	 //Here Place = google.maps.places

	 var infoWindow = new google.maps.InfoWindow();

	 var marker = new google.maps.Marker({
	 map: this.getMap(),
	 position: place.geometry.location
	 });

	 google.maps.event.addListener(marker, "click", function() {
	 infoWindow.setContent("Lng: " + marker.position.lng() + "\n Lat: " + marker.position.lat());
	 infoWindow.open(this.getMap(), marker);
	 });
	 },

	 */

	initialize : function() {
		this.callParent(arguments);
		this.getNavigationBar().titleComponent.setTitle('Towing Finder');
	},
	
	
});

var towingObj; 




var infoCntr = 0;
var infowindow = {};
function createMarkerDetails(place) {
	console.log('createMarkerDetails begin.' + mapref + '  name: ' + place.name + infoCntr);

	var placeLoc = place.geometry.location;
	infowindow[infoCntr] = new google.maps.InfoWindow({
		content : place.name + ' , <br> \n ' + place.formatted_address + '  - ' + place.formatted_phone_number
	});

	var marker1 = new google.maps.Marker({
		map : mapref,
		position : place.geometry.location
	});
	google.maps.event.addListener(marker1, 'click', function() {
		console.log(infoCntr + '  - createmarker place.name11.' + place.name + '  - ' + place.formatted_phone_number);
		//infowindow[infoCntr].close();
		for (var cntidx = 0; cntidx < infoCntr; cntidx++) {
			infowindow[cntidx].close();
		}
		var contentString = '<div id="content">'+ place.name + ', <br>' + place.formatted_address + '<br>' 
		+ '<div style="width: 100%; white-space: nowrap;display:inline-block">'
		+ '<a href="tel:' + place.formatted_phone_number + '" class="x-button x-button-rpc x-button-plain x-layout-box-item" target="_blank">' 		
		+ '<img src="resources/icons/roadside/sym_action_call.png"/> <div style="clear:both"></div>'
		+ place.formatted_phone_number + '</a> '
		//+ '<div style="white-space: nowrap;display:inline-block">&nbsp;</div>'
		//+ '<div style="clear:both"></div><a href="#" class="x-button x-button-rpc" target="_blank" onclick="onGuestButtonTap();return false;">Send Location</a>' 
		//+ ' </div>'
		+ ' </div></div>';
		
		infowindow[0] = new google.maps.InfoWindow({
		content : contentString,
		
		});
	
		var infoContent = infowindow[0].content;
		
		infowindow[0].open(mapref, marker1);

	});

	google.maps.event.addListener(mapref, 'click', function() {
		console.log('  map click event ');

		//if (infowindow != null && infowindow.length > 0 )
		{
			for (var idx = 0; idx < infoCntr; idx++) {
				infowindow[idx].close();
			}

		}
	});

	infoCntr++;
	//Pan the map to your marker
	/*    setTimeout(function () {
	 mapref.panTo(place.geometry.location);
	 }, 1000);
	 */

	console.log('createmarker end.');
}

 function onGuestButtonTap() {
		console.log('callback begin...... ' );
		var me = this;

		//Roadside.app.push('current-location', '');
		 Ext.Viewport.add({
		         xtype: 'mainMenuView' // This is the xtype of new view you want to push 
		     });

	}

function onInfoWindowClickHanlder(event) {
	  console.log('Towing onInfoWindowClickHanlder(event) class '+event.target.className);
   if(event.target.className == 'button') {
      // Button click
      console.log('Towing class button');
   }
  else if(event.target.className == 'call-button') {
      // Button click
      console.log('Towing class call-button');
   }
   else if(event.target.className == 'call-button') {
      // Button click
      console.log('Towing class share-button');
   }
}


function redirect(Num)
{
	console.log('Towing Share loca redirect' + Num);
}

function createMarker(place, num) {
	console.log('createmarker begin.' + mapref + '  name: ' + place.name);

	var placeLoc = place.geometry.location;
	var infowindow = new google.maps.InfoWindow({
		content : place.name
	});

	var marker1 = new google.maps.Marker({
		map : mapref,
		position : place.geometry.location
	});
	google.maps.event.addListener(marker1, 'click', function() {
		console.log('createmarker place.name.' + place.name);
		infowindow.setContent(place.name);
		infowindow.open(mapref, marker1);
	});

	//Pan the map to your marker
	/*    setTimeout(function () {
	 mapref.panTo(place.geometry.location);
	 }, 1000);
	 */

	console.log('createmarker end.');
}
var mapref;
/* Uncomment if required..
var lat, lng;

//var infowindow;

var geoLocationOptions = {
	maximumAge : 3000,
	timeout : 5000,
	enableHighAccuracy : true
};
navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, geoLocationOptions);
function geoLocationSuccess(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	console.log('Towing geoLocationSuccess = lat = ' + lat + ' , lng= ' + lng);
	// Ext.Msg.alert("Geolocation","Latitude:"+ lat +", Longitude:"+ lng);
}

function geoLocationError() {
	Ext.Msg.alert('Error', 'Error while getting geolocation');
}
*/
