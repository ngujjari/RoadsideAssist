/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src'
    //'Ext.plugin': 'lib/plugin'
});
//</debug>

Ext.application({
    name: 'Roadside',

    requires: [
        'Ext.MessageBox',
        'Ext.tab.Panel'
    ],

    models: ['Contact','UserProfile','Guest','ShareLocation','Registration'],
    stores: ['Guest','Registration'],
    views: ['Main' , 'Login', 'MainMenu', 'Home', 'Location','MainPanel','Towing','Services','MainProfile','Guest','Registration'],
    controllers: ['Application','Login','Guest','Registration'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
		console.log('Roadside Application Launch : Enter');
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
       // Ext.Viewport.add(Ext.create('Roadside.view.MainPanel'));
        Ext.Viewport.add(Ext.create('Roadside.view.MainPanel'));
       // Ext.Viewport.add([  { xtype: 'loginview' },  { xtype: 'mainmenuview' }   ]);


	//we send a config block into the Ext.Viewport.add method which will
        //create our tabpanel
      /*  Ext.Viewport.add({
            //first we define the xtype, which is tabpanel for the Tab Panel component
            xtype: 'tabpanel',

            //now we specify the tabBar configuration and give it a docked property of bottom
            //this will dock the tabbar of this tabpanel to the bottom

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

            //here we specify the ui of the tabbar to light
            ui: 'light',

            //defaults allow us to add default configuratons for each of the items added into
            //this container. adding scrollable true means that all items in this tabpanel will
            //be scrollable unless otherwise specified in the item configuration
            defaults: {
                scrollable: true
            },

            layout: {
                animation: false
            },



            //next we define the items that will appear inside our tab panel
            items: [
                {
                    //each item in a tabpanel requires the title configuration. this is displayed
                    //on the tab for this item


                    //specify the html to be displayed in this item
                    //html: '<h1>Bottom Tabs</h1><p>Docking tabs to the bottom will automatically change their style. The tabs below are type="light" (default type is "dark"). Badges (like the 4 &amp; Long title below) can be added by setting <code>badgeText</code> when creating a tab/card or by using <code>setBadge()</code> on the tab later.</p>',
		    xtype: 'loginview',
                    //the iconCls is the cls of the icon to be used on the tab (only works when the tab
                    //bar is docked to the bottom)



                },
                {
                    //each item in a tabpanel requires the title configuration. this is displayed
                    //on the tab for this item
                    title: 'Contacts',

                    //specify the html to be displayed in this item
                    //html: '<h1>Bottom Tabs</h1><p>Docking tabs to the bottom will automatically change their style. The tabs below are type="light" (default type is "dark"). Badges (like the 4 &amp; Long title below) can be added by setting <code>badgeText</code> when creating a tab/card or by using <code>setBadge()</code> on the tab later.</p>',
		    xtype: 'mainview',
                    //the iconCls is the cls of the icon to be used on the tab (only works when the tab
                    //bar is docked to the bottom)
                    iconCls: 'Contacts',
		    disabled : false,
		    id: '1',
                    //custom cls to be added to the item
                    cls: 'card2'

                },
                {
                    title: 'Location',
                    xtype: 'current-location',
                    iconCls: 'Location',
                    disabled : false,
                    id: '2',
                    cls: 'card3',

                    //the badgetext configuration allows us to add a badge/tooltip onto the tab
                    //this is useful when you want to notify users of new content in an unactive tab
                   // badgeText: '4'
                },
                {
                    title: 'Find a Towing',
                    xtype: 'current-location-show',
                    iconCls: 'Towing',
                    disabled : false,
                    id: '3',
                    cls: 'card4',

                    //the badgetext configuration allows us to add a badge/tooltip onto the tab
                    //this is useful when you want to notify users of new content in an unactive tab
                   // badgeText: '4'
                }
            ],
    listeners : {
        delegate : 'tabbar > tab',
	        tap      : function() {
	            console.log(arguments);
	            //console.log(arguments[0].iconCls);
	        }
    	}

        });
        */
        console.log('Roadside Application Launch : Exit');
    },


    onUpdated: function() {
		console.log('Roadside Application onUpdated : Enter');
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
        console.log('Roadside Application onUpdated : Exit');
    }
});
