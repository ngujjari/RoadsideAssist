Ext.define('Roadside.view.Login', {
	extend : 'Ext.navigation.View',
	xtype : 'loginview',
	requires : ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
	config : {
		title : 'Home',
		autoDestroy : false,
		baseCls : 'x-loginview',
		layout : 'card',
		// disabled : false,
		id : '0',
		// custom cls to be added to the item
		cls : 'card1',
		align : 'default',
		iconCls : 'home',

		navigationBar : {
			items : [{
				xtype : 'img',
				id : 'titleImg',
				itemId : 'titleImg',
				// icon: './resources/icons/roadside/NTTAMSTitleLogoNew.png', // specify the path of the image
				html : '<div><img src="./resources/icons/roadside/NTTAMSTitleLogo.png" style="height:40px; width:130px" /></div>',
				align : 'left',
				hidden : false
			}]
		},

		items : [{
			/*
			* { xtype: 'image', src: Ext.Viewport.getOrientation() ==
			* 'portrait' ? 'resources/icons/roadside/NTTAMSTitleLogo.png' :
			* 'resources/icons/roadside/icon.png', style:
			* Ext.Viewport.getOrientation() == 'portrait' ?
			* 'width:80px;height:80px;margin:auto' :
			* 'width:40px;height:40px;margin:auto' },
			*/

			//title : 'Logon Page',
			//title : '<img src="resources/icons/roadside/NTTAMSTitleLogo.png" />',
			//title : '<div class="logo">&nbsp;&nbsp;&nbsp;Roadside Assist&nbsp;&nbsp;  &nbsp;           </div>',
			title : '<div>&nbsp;&nbsp;&nbsp;Roadside Assist&nbsp;&nbsp;  &nbsp;           </div>',

			xtype : 'formpanel',
			items : [{
				xtype : 'label',
				html : 'Login failed. Please enter the correct credentials.',
				itemId : 'signInFailedLabel',
				hidden : true,
				hideAnimation : 'fadeOut',
				showAnimation : 'fadeIn',
				style : 'color:#990000;margin:5px 0px;'
			}, {
				xtype : 'fieldset',
				title : 'Login',
				items : [{
					xtype : 'textfield',
					placeHolder : 'Username',
					itemId : 'userNameTextField',
					name : 'userNameTextField',
					required : true
				}, {
					xtype : 'passwordfield',
					placeHolder : 'Password',
					itemId : 'passwordTextField',
					name : 'passwordTextField',
					required : true
				}]
			}, {
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [{
					xtype : 'button',
					itemId : 'logInButton',
					ui : 'blue',
					margin : '3px',
					//cls: 'loginbutton',
					text : 'Log In'
				}, /*{
				 xtype : 'spacer',
				 // The amount of spacing between buttons
				 width : 10
				 },*/
				{
					xtype : 'button',
					itemId : 'resetButton',
					ui : 'reset',
					margin : '3px',
					text : 'Reset'
				}]
			}, {
				xtype : 'spacer',
				// The amount of spacing between buttons
				width : 20
			}, {

				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [{
					xtype : 'label',
					html : 'First time user  ? click &nbsp;',
				}, {

					xtype : 'button',
					itemId : 'registerButton',
					ui : 'brown-round',
					text : 'Register'
				}],

			}, {
				xtype : 'spacer',
				// The amount of spacing between buttons
				width : 20
			}, {

				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [{

					xtype : 'button',
					itemId : 'guestButton',
					ui : 'brown-round',

					margin : '3px',
					text : 'Guest Login ?'
				}],

			}]
		}],

		listeners : [{
			delegate : '#logInButton',
			event : 'tap',
			fn : 'onLogInButtonTap'
		}, {
			delegate : '#guestButton',
			event : 'tap',
			fn : 'onGuestButtonTap'
		}, 
		{
		delegate : '#resetButton',
		event : 'tap',
		fn : 'onResetButtonTap'
		}, {
			delegate : '#registerButton',
			event : 'tap',
			fn : 'onRegisterButtonTap'
		}]

	},

	onResetButtonTap : function() {
		var me = this;
		usernameField = me.down('#userNameTextField'), 
		passwordField = me.down('#passwordTextField'), 
		usernameField.setValue('');
		passwordField.setValue('');
	
	},
	onGuestButtonTap : function() {
		var me = this;

		// Using a delayed task in order to give the hide animation above
		// time to finish before executing the next steps.
		var task = Ext.create('Ext.util.DelayedTask', function() {
			me.fireEvent('guestClickCommand', me);

		});

		task.delay(500);

	},

	onRegisterButtonTap : function() {
		var me = this;

		// Using a delayed task in order to give the hide animation above
		// time to finish before executing the next steps.
		var task = Ext.create('Ext.util.DelayedTask', function() {
			me.fireEvent('registerClickCommand', me);

		});

		task.delay(500);

	},

	onLogInButtonTap : function() {
		var me = this;

		var usernameField = me.down('#userNameTextField'), passwordField = me.down('#passwordTextField'), label = me.down('#signInFailedLabel');

		label.hide();

		var username = usernameField.getValue(), password = passwordField.getValue();

		// Using a delayed task in order to give the hide animation above
		// time to finish before executing the next steps.
		var task = Ext.create('Ext.util.DelayedTask', function() {

			label.setHtml('');

			me.fireEvent('signInCommand', me, username, password);

			usernameField.setValue('');
			passwordField.setValue('');
		});

		task.delay(500);

	},

	showSignInFailedMessage : function(message) {
		console.log('showSignInFailedMessage : begin ');
		var me = this;
		label = me.down('#signInFailedLabel');
		label.show();
		label.setHtml(message);
		console.log('showSignInFailedMessage : end ');
	},

	initialize : function() {
		this.callParent(arguments);
		//this.getNavigationBar().setHidden(false);
		this.down('#titleImg').show();
		console.log('Login.js : initialize begin ');

	},
	onBackButtonTap : function() {
		this.callParent(arguments);
		console.log('back button pressed');
		//Ext.Viewport.remove('Roadside.view.Login', true);
		//this.getNavigationBar().titleComponent.setTitle('Location');
		//Ext.create('Roadside.view.Login');
		this.down('#titleImg').show();

	},
});
