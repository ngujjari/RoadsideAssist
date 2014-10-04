Ext.define('Roadside.view.Location', {
	extend : 'Ext.navigation.View',
	xtype : 'current-location',

	requires : ['Ext.util.Geolocation', 'Ext.Map', 'Ext.navigation.View','Roadside.model.Location'],

	config : {
		title : 'Location',
		baseCls : 'x-current-location',
		layout : 'card',
		iconCls : 'locate',

		navigationBar : {
			//title : 'Location',
			
			items : [{
				xtype : 'button',
				id : 'shareButton',
				text : '&nbsp;&nbsp;Share&nbsp;&nbsp;',
				//ui: 'darkblue',
				align : 'right',
				hidden : false,
				hideAnimation : Ext.os.is.Android ? false : {
					type : 'fadeOut',
					duration : 200
				},
				showAnimation : Ext.os.is.Android ? false : {
					type : 'fadeIn',
					duration : 200
				}
			}]
		},
		items : [{
			xtype : "map",
			id : "locationmap",
			itemId : "mapHomeView",
			flex : 1,
			mapOptions : {
				//useCurrentLocation:true,
				zoomControl : true,
				//panControl: true,
				rotateControl : false,
				streetViewControl : false,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				// mapTypeControl: true,
				zoom : 16
			}
		}],
		
		control : {
			'map[itemId="mapHomeView"]' : {
				maprender : 'mapHomeViewMapRenderer'
			}
		},

		record : null
	},

	onBackButtonTap : function() {
		this.callParent(arguments);
		console.log('back button pressed');
		Ext.Viewport.remove('Roadside.view.contact.ShareLocation', true);
		this.getNavigationBar().titleComponent.setTitle('Location');

		Ext.ComponentQuery.query('#shareButton')[0].show();

	},

	mapHomeViewMapRenderer : function(comp, map) {
		var mapRef = Ext.ComponentQuery.query('#mapHomeView')[0].getMap();
		console.log('mapHomeViewMapRenderer begin === ' + mapRef);
		var me = this;
		
		

		 //waits until latitude exists then does something..
		 var untilLatThere = setInterval(function(){
		 	console.log('mapHomeViewMapRenderer untilLatThere begin === '+lat);
		 if(lat != 'undefined' && lat != null && lat != '') {
		 	console.log('mapHomeViewMapRenderer untilLatThere === ');
		 clearInterval(untilLatThere);
		 var latLngCoordinates = new google.maps.LatLng(lat, lng);
		 me.setNewRecord(lat, lng);
		 marker = new google.maps.Marker({
			position : latLngCoordinates,
			animation : google.maps.Animation.DROP,
			title : 'My Location',
			map : mapRef
		 });

		mapRef.setCenter(latLngCoordinates);
		//map.setMapCenter(latLngCoordinates);
		
		}
		 }, 1000);
		console.log('mapHomeViewMapRenderer end == ' + this.getRecord());

	},
	
	setNewRecord : function (lat, lng)
	{
		 this.record = Ext.create('Roadside.model.Location');
		this.record.data.lat = lat;
		this.record.data.lng = lng;
		this.setRecord(this.record);
	},

	initialize : function() {
		this.callParent(arguments);

		this.getNavigationBar().titleComponent.setTitle('Location');
		// wait 100 ms to avoid map creation latency
		//Ext.Function.defer(this.centerMap,100,this);

	},
	
	updateRecord : function(newRecord) {
		console.log('Location update record !!' + newRecord);
		this.centerMap();
	},
	 
	 centerMap: function()
	 {
	 	var mapRef = Ext.ComponentQuery.query('#mapHomeView')[0].getMap();
	 	var latLngCoordinates = new google.maps.LatLng(lat, lng);
	 	mapRef.setCenter(latLngCoordinates);
	 }
});
var lat, lng;

var geoLocationOptions = {
	maximumAge : 3000,
	timeout : 5000,
	enableHighAccuracy : true
};
navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, geoLocationOptions);
function geoLocationSuccess(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	lat = '42.292647';
	lng = '-71.783099';
	console.log('Location geoLocationSuccess = lat = ' + lat + ' , lng= ' + lng);
	// Ext.Msg.alert("Geolocation","Latitude:"+ lat +", Longitude:"+ lng);
}

function geoLocationError() {
	Ext.Msg.alert('Error', 'Error while getting geolocation !!!!!!!');
}

/*
 var latitude;

 //waits until latitude exists then does something..
 var untilLatThere = setInterval(function(){
 if(latitude) {
 clearInterval(untilLatThere);
 }
 }, 1000);

 var geo = Ext.create('Ext.util.Geolocation', {

 autoUpdate: false,
 frequency: '1000',

 listeners: {
 locationupdate: function (geo) {
 latitude = geo.getLatitude();
 //alert('New latitude: ' + geo.getLatitude());
 },
 locationerror: function (geo, bTimeout, bPermissionDenied,
 bLocationUnavailable, message) {
 if (bTimeout) {
 alert('Timeout occurred. Secs '+bTimeout);
 } else {
 alert('Error occurred. Secs '+bTimeout);
 }
 }

 }
 });
 geo.updateLocation();
 */