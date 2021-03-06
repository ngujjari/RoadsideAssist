Ext.define('Roadside.view.contact.ShowCurrentLoc', {
    extend: 'Ext.Container',
    xtype: 'current-location-show',

    requires: [
        'Ext.util.Geolocation',
        'Ext.Map',
        'Roadside.view.contact.ShareLocation',
        'Roadside.store.Contacts'
    ],

    config: {
        title: 'Towing',
        baseCls: 'x-current-location-show',
        //layout: 'vbox',
		iconCls: 'locate',
		layout: 'fit',

        items: [
              {
                xtype: "map",
                id: "currentmap",
                flex: 1,
                mapOptions: {
               	    useCurrentLocation:true,
                    zoomControl: true,
                    panControl: true,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: true,
                    zoom: 13

                }
            }
        ],

        record: null
    },

    initialize: function() {
    	this.callParent(arguments);
          // wait 100 ms to avoid map creation latency
          Ext.Function.defer(this.centerMap,100,this);
    },

    centerMap: function() {
        var mapPanel = this.down('map');
          var gMap = mapPanel.getMap();
          if (gMap == null) {
              // Still no map, wait a little longer
               Ext.Function.defer(this.centerMap,250,this);
          }
          else {

             // ready to start calling google map methods
             	var latLngCoordinates = new google.maps.LatLng(lat, lng);
             	this.record = Ext.create('Roadside.model.Contact');

             	this.record.data.firstName = 'Naresh1';
				this.record.data.lastName = 'Gujjari';
				this.record.data.telephone = '774-641-7519';
				this.record.data.latitude = lat;
				this.record.data.longitude = lng;
					marker = new google.maps.Marker(
             		{
             		position: latLngCoordinates,
            		//animation: google.maps.Animation.DROP,
            		map: gMap
        		});

		 		gMap.setCenter(latLngCoordinates);
                 mapPanel.setMapCenter(latLngCoordinates);

          }
    },

    updateRecord: function(newRecord) {
	//this.record = newRecord;
	if(lat) {
        this.centerMap();

	}
    }


});


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