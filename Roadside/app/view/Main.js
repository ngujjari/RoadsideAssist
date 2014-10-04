Ext.define('Roadside.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',

    requires: [
    	'Roadside.view.MenuItems',
        'Roadside.view.Contacts',
        'Roadside.view.contact.Show',
        'Roadside.view.contact.Edit',
        'Roadside.view.contact.ShowCurrentLoc',
        'Ext.util.Geolocation'
    ],

    config: {
        autoDestroy: false,
	iconCls: 'contacts',
	title: 'Contacts',
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
                    id: 'saveButton',
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

                },
                
                {
                    xtype: 'button',
                    id: 'currentLocationButton',
                    text: 'Show Current Location',
                    align: 'center',
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

        items: [
            { xtype: 'contacts' }
           //{ xtype: 'menuitems' }
        ]
    }
});
