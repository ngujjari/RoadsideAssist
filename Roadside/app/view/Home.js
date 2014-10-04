Ext.define('Roadside.view.Home', {

	extend: 'Ext.tab.Panel',
	xtype: 'Home',

	config: {

		tabBarPosition: 'bottom',
		tabBar: {
			ui: 'gray'
		},

		items: [
			{ xclass: 'Roadside.view.Contacts' },
			{ xclass: 'Roadside.view.contact.ShowCurrentLoc' }
			
		]
	}
});
