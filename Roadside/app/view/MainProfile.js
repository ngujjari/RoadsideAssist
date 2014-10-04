Ext.define('Roadside.view.MainProfile', {
     extend: 'Ext.navigation.View',
    requires: ['Ext.TitleBar','Roadside.view.Login'],
    xtype: 'mainProfileView',
    id: 'mainProfileView',
    config: {
    	title: 'Profile Home',
        layout: 'fit',
    	store: 'UserProfileStore',        
        layout: 'card',
		
		navigationBar: {
			 ui: 'sencha',
		      items: [{
		           
                    xtype: 'button',
                    id: 'logoff',
                    text: 'Log OFF ',
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
			
    	
      items: [
        {
        	 xtype: 'formpanel',
        	 itemId: 'profileForm',

                    items: [{
					xtype :  'fieldset',
					title: 'Profile Details',
					fullscreen : false,
					items:[{
						xtype: 'hiddenfield',
						name : 'id'
					},{
						xtype: 'textfield',
						name : 'name',
						disabled:false,
						disclosure : false,
						label: 'Name'
					}, {
						xtype: 'textfield',
						name : 'email',
						disabled:false,
						label: 'Email'
					},{
						xtype: 'textfield',
						name : 'age',
						disabled:false,
						label: 'Age'
					},
					{
                        xtype: 'button',
                        itemId: 'profileSubmitButton',
                        ui: 'confirm',
                        padding: '10px',
                        text: 'Submit'
                    }]
                }
                ]
                
                }
	
        ],
        listeners: [{
            delegate: '#logOffButton',
            event: 'tap',
            fn: 'onLogOffButtonTap'
        },
        {
            delegate: '#profileSubmitButton',
            event: 'tap',
            fn: 'profileSubmitButton'
        }
        ]
    },
    onLogOffButtonTap: function () {
    	console.log('onSignOffCommand event fired !!');
        this.fireEvent('onSignOffCommand');
    },
    profileSubmitButton:function () {
    	console.log('profileSubmitButton event fired !!');
        this.fireEvent('profileSubmitCommand');
    },
});
