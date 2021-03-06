Ext.define('Roadside.view.MainPanel', {
    extend: 'Ext.TabPanel',
    xtype: 'maintabpanel',
	id: 'MainPanelContainer',
   requires: [
    	//'Roadside.view.Main',
        'Roadside.view.Location',
        'Roadside.view.Login'
    ],
    
    initComponent: function () {
	
		Ext.apply(Roadside.views, {
		
		loginView: new Roadside.view.Login(),
		
		profileView: new Roadside.view.MainProfile({ userProfileStore: Roadside.store.UserProfileStore })
		
		});
	},

    config: {
    	
    tabBar: {
                // Dock it to the bottom
                docked: 'bottom',

                // Change the layout so each of the tabs are centered vertically and horizontally
                layout: {
                    pack: 'center',
                    align: 'center'
                },

                // Make the tabbar scrollable horizontally, and disabled the indicators
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                }
            },

        navigationBar: {
            ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    id: 'editButton',
                    text: 'Edit',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'shareButton1',
                    text: 'Save',
                    ui: 'sencha',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },
        
            //here we specify the ui of the tabbar to light
           // ui: 'light',

            //defaults allow us to add default configuratons for each of the items added into
            //this container. adding scrollable true means that all items in this tabpanel will
            //be scrollable unless otherwise specified in the item configuration
            defaults: {
                scrollable: true
            },

            layout: {
                animation: true
            },



            //next we define the items that will appear inside our tab panel
            items: [
       
                {
		   			xtype: 'loginview',
                },
				{
					 xtype: 'services-view',
                } ,
                {
		  			 xtype: 'current-location',
		  			 listeners: {
           			 activate : function() {
           			 	console.log("bam!");
           			 	var mapRef = Ext.ComponentQuery.query('#mapHomeView')[0].getMap();
           			 	this.mapRef = new Ext.Map({
                        styleHtmlContent: true
                        ,mapOptions: {
                                center: new google.maps.LatLng(lat, lng) //Philly
                        }
                        ,listeners: {
                                scope: this
                                ,maprender: this.mapHomeViewMapRenderer
                        }
                });
	 	
	 				console.log("bam end!");
           			 	
           			 }
        			}
                },
                {
		   			xtype: 'towing-location',
		   			listeners: {
           			 activate : function() {
           			 	console.log("towing !");
           			 	var mapPanel = this.down('map');
						var gMap = mapPanel.getMap();
           			 	this.gMap = new Ext.Map({
                        styleHtmlContent: true
                        ,mapOptions: {
                                center: new google.maps.LatLng(lat, lng) //Philly
                        }
                        ,listeners: {
                                scope: this
                                ,maprender: this.towingMapRenderer
                        }
                });
	 	
	 				console.log("towing end!");
           			 	
           			 }
        			}
        			
                }

            ],
    listeners : {
        delegate : 'tabbar > tab',
        tap      : function() {
            console.log('Tab change: '+arguments);
           // var gueststore = Ext.getStore('gueststore');
           // gueststore.load();
          //Ext.Viewport.remove('current-location', true); 
            // this.callParent(arguments);
            //console.log(arguments[0].iconCls);
           
        },
        cardswitch: function(me, newcard, oldcard, idx, isAnim)
        {
            console.log('changed to ' + idx);
        }


    	}
}
});
