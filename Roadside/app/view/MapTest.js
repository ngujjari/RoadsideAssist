Ext.define('Roadside.view.MapTest', {
    extend: 'Ext.Container',
    xtype: 'mapTest',

    requires: [
    	'Ext.Map'
    ],
 
    config: {
        iconCls: 'locate',
        title: 'Location',
        layout: 'fit',
 
        items: [
            {
                ui: 'light',
                docked: 'top',
                xtype: 'toolbar',
                title: 'Location'
            }
        ]
    },
 
    initialize: function() {
 
        this.callParent();
 
        var position = new google.maps.LatLng(32.9770421, -96.8270373);
 
        var infowindow = new google.maps.InfoWindow({
                content: 'Improving Enterprises<br/>Addison, TX 75001'
        });
 
        var map = Ext.create('Ext.Map',{
            mapOptions : {
                zoom : 14,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
 
            listeners: {
                maprender: function(comp, map) {
 
                    var marker = new google.maps.Marker({
                        position: position,
                        title : 'Improving Enterprises',
                        map: map
                    });
 
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });
                }
            }
 
        });
 
        map.setMapCenter(position);
        this.add(map);
    }
}); 
