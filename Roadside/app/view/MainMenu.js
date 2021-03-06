Ext.define('Roadside.view.MainMenu', {
    extend : 'Ext.navigation.View',
    requires: ['Ext.TitleBar','Roadside.view.Login'],
    xtype: 'mainMenuView',
    config: {
    	title: 'Main Menu',    	
    	baseCls: 'x-mainMenuView',   
    	align: 'default' ,     
        layout: "card",
        /*items: [{
            xtype: 'titlebar',
            title: 'Home',
            iconCls: 'Home',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Log Off',
                    itemId: 'logOffButton',
                    align: 'right'
                }
            ]
        }], */
        listeners: [{
            delegate: '#logOffButton',
            event: 'tap',
            fn: 'onLogOffButtonTap'
        }]
    },
    onLogOffButtonTap: function () {
    	console.log('onSignOffCommand event fired !!');
        this.fireEvent('onSignOffCommand');
    }
});
