Ext.define('Roadside.view.Registration', {
	extend : 'Ext.navigation.View',
	requires : ['Ext.TitleBar', 'Roadside.view.Login'],
	xtype : 'registerView',
	id : 'registerView',
	config : {
		title : 'Registration Form',
		navigationBar : false,
		
		items : [{
			xtype : 'formpanel',
			itemId : 'registerForm',
			scrollable : true,
			flex : 1,
			fieldDefaults : {
				labelAlign : 'left',
				labelWidth : '100%',
			},
			items : [{
				xtype : 'fieldset',
				fullscreen : false,
				items : [{
					xtype : 'hiddenfield',
					name : 'id'
				}, 
				{
					xtype : 'textfield',
					name : 'loginid',
					labelWidth : 120,
					disabled : false,
					disclosure : false,
					label : 'Login Id'
				}, {
					xtype : 'passwordfield',
					name : 'password',
					labelWidth : 120,
					disabled : false,
					disclosure : false,
					label : 'Password'
				}/*,
				{
					xtype : 'passwordfield',
					label : 'Confirm Password',
					itemId : 'confirmpassword',
					name : 'confirmpassword',
					required : true,
					labelWidth : 120,
					disabled : false,
					disclosure : false
				}*/,{
					xtype : 'textfield',
					name : 'fname',
					labelWidth : 120,
					disabled : false,
					disclosure : false,
					label : 'First Name'
				}, {
					xtype : 'textfield',
					name : 'lname',
					labelWidth : 120,
					disabled : false,
					disclosure : false,
					label : 'Last Name'
				}, {
					xtype : 'textfield',
					name : 'email',
					labelWidth : 120,
					disabled : false,
					label : 'Email'
				}, {
					xtype : 'textfield',
					component : {
						type : 'tel'
					},
					name : 'phone',
					labelWidth : 120,
					disabled : false,
					label : 'Phone'
				}, {
					xtype : 'textfield',
					name : 'agentfname',
					disabled : false,
					labelWidth : 120,
					label : 'Agent Name'
				}/*,
				 {
				 xtype: 'textfield',
				 name : 'agentlname',
				 disabled:false,
				 label: 'Agent Last Name'
				 }*/,
				{
					xtype : 'textfield',
					component : {
						type : 'tel'
					},
					name : 'agentphone',
					labelWidth : 120,
					disabled : false,
					label : 'Agent Phone'
				}, {
					xtype : 'spacer',
					height : 20
				}, {
					xtype : 'button',
					itemId : 'registerSubmitButton',
					width : 100,
					text : 'Save',
					margin : '15px auto',
					ui : 'blue'
				}]
			}]

		}],
		listeners : [{
			delegate : '#logOffButton',
			event : 'tap',
			fn : 'onLogOffButtonTap'
		}, {
			delegate : '#registerSubmitButton',
			event : 'tap',
			fn : 'registerSubmitButton'
		}],

		record : null
	},
	onLogOffButtonTap : function() {
		console.log('onSignOffCommand event fired !!');
		this.fireEvent('onSignOffCommand');
	},
	registerSubmitButton : function() {
		console.log('guestSubmitButton event fired !!');
		this.fireEvent('registerSubmitCommand');
	},
	updateRecord : function(newRecord) {
		console.log('registerview update record ');
		/*var registerstore = Ext.getStore('registerstore');
		
		registerstore.load(function(records, operation, success) {
			if (success) {
				var record1 = registerstore.first();
				if (record1 != null) {
					console.log('localstorage record ==== ' + record1.getData().fname);
					var registerForm = Ext.ComponentQuery.query('#registerForm')[0];
					console.log('guestForm ==== ' + registerForm);

					registerForm.setRecord(record1);
				}
			}

		});
		*/
		Ext.ComponentQuery.query('#titleImg')[0].hide();
	},
	initialize : function() {
		this.callParent(arguments);
		Ext.ComponentQuery.query('#titleImg')[0].hide();
		console.log('registerview  initComponent ... ');
	}
});
