Ext.define('Roadside.view.contact.Show', {
    extend: 'Ext.Container',
    xtype: 'contact-show',

    requires: [
        'Ext.Map',
        'Ext.util.Geolocation'
    ],

    config: {
        title: 'Information',
        baseCls: 'x-show-contact',
        layout: 'vbox',

        items: [
            {
                id: 'content',
                tpl: [
                    '<div class="top">',
                        '<div class="headshot" style="background-image:url(./resources/images/headshots/{headshot});"></div>',
                        '<div class="name"> {firstName} {lastName}<span>{title}</span></div>',
                    '</div>'
                ].join('')
            },
            {
                xtype: "map",
                flex: 1,
                mapOptions: {
               	    center : new google.maps.LatLng(50.077721, 14.448585),
               	    useCurrentLocation:false,
                    zoomControl: true,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: true,
                    zoom: 13

                }
            }
        ],

        record: null
    },

   /* updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
	alert('latitude = '+ newRecord.data.latitude +'  , longitude = ' +newRecord.data.longitude);
            //this.down('map').setMapCenter({latitude: newRecord.data.latitude, longitude: newRecord.data.longitude});
           // alert(this.down('map').getMapOptions().center);
          this.down('map').setMapCenter(new google.maps.LatLng(newRecord.data.latitude, newRecord.data.longitude ));
	// this.down('map').getMapOptions().center = new google.maps.LatLng(newRecord.data.latitude, newRecord.data.longitude );

           // alert('latitude = '+ newRecord.data.latitude +'  , longitude = ' +newRecord.data.longitude);
        }
    }*/

    initialize: function() {
    	this.callParent(arguments);
          // wait 100 ms to avoid map creation latency
          Ext.Function.defer(this.centerMap,100,this);
    },

    centerMap: function(newRecord) {
        var mapPanel = this.down('map');
          var gMap = mapPanel.getMap();
          if (gMap == null) {
              // Still no map, wait a little longer
               Ext.Function.defer(this.centerMap,250,this);
          }
          else {

             // ready to start calling google map methods
             if(this.record) {
             	//alert('latitude = '+ this.record.data.latitude +'  , longitude = ' +this.record.data.longitude);
             	var latLngCoordinates = new google.maps.LatLng(this.record.data.latitude, this.record.data.longitude );

             	marker = new google.maps.Marker(
             		{
             		position: latLngCoordinates,
            		//animation: google.maps.Animation.DROP,
            		map: gMap
        		});

		 gMap.setCenter(latLngCoordinates);
                // mapPanel.setMapCenter(latLngCoordinates);
               }
          }
    },
    updateRecord: function(newRecord) {
        this.record=newRecord;
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
            this.centerMap(newRecord);
        }
    }

});
