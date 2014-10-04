Ext.define('Roadside.controller.Login', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {			
			loginView: 'loginview',
			mainMenuView: 'mainMenuView',
			mainProfileView: 'mainProfileView',
			maintabpanel: 'maintabpanel',
			profileForm: 'mainProfileView #profileForm'

		},
		control: {			
			loginView: {
				signInCommand: 'onSignInCommand',
			//	guestClickCommand: 'guestClickCommand',				
			},
			mainMenuView: {
				onSignOffCommand: 'onSignOffCommand'
			},
			mainProfileView: {
				profileSubmitCommand: 'profileSubmitCommand',				
			}
		}
	},

	// Session token

	sessionToken: null,
	
	// Transitions
	getSlideLeftTransition: function () {
		return { type: 'slide', direction: 'left' };
	},

	getSlideRightTransition: function () {
		return { type: 'slide', direction: 'right' };
	},
/*
	guestClickCommand: function (view) {

		console.log('guestClickCommand begin!!!');

		var me = this,
		maintabpanel = me.getMaintabpanel();
		loginView = me.getLoginView();
		mainProfileView = me.getMainProfileView();
		if(!mainProfileView)
		{
			mainProfileView = Ext.create('Roadside.view.MainProfile');	
		}
		
		var userStore = Ext.getStore('userstore');
		userStore.load();
		
		var item = userStore.getAt(0);
		console.log('userStore storeId '+item);
		 userStore.each(function (record) {
                    console.log(record.getData());
                });
		var userStore = Ext.getStore('userstore');
                    userStore.load(function(records, operation, success)
                    {
                        if(success)
                        {
                            var record = userStore.first();
                            console.log('record ==== '+record.getData().username);                      
                           mainProfileView.setRecord(record);
                        }
                       
                    });
		
	loginView.push(mainProfileView);
	}, */

	profileSubmitCommand:function (view) {

		var form = this.getProfileForm();
		var values = form.getValues();
		console.log('profileSubmitCommand Username: ' + values + '\n' + 'NAME: ' + values.name);
		var usr = Ext.create('Roadside.model.UserProfile',{
			username: values.name,
			age: '30',
			email:values.email
		});

		var userStore = Ext.getStore('userstore');
		userStore.removeAll();
		userStore.add(usr);
		userStore.sync();
		console.log('profileSubmitCommand getCount: ' +userStore.getCount());
	

		form.setRecord(usr);
		  // Mask the form
                            form.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving...'
                            });

                            // Put it inside a timeout so it feels like it is going to a server.
                            setTimeout(function() {
                                if (form.user) {
                                    // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                                    // with the latest values.
                                    form.updateRecord(usr, true);
                                }

                                // Unmask the formpanel
                                form.setMasked(false);
                            }, 1000);
                                
		

	},

	profileHome: function () {
		console.log('mainProfileView in.');	
		Ext.Viewport.remove(this.loginview); 
		Ext.Viewport.getComponent(0).setActiveItem(0);
	
		Ext.Viewport.getComponent(0).animateActiveItem({ xtype : 'mainProfileView'}, {type: 'slide', direction: 'left'});
	
		console.log("mainProfileView screen!");
	
	},

	
	onSignInCommand: function (view, username, password) {

		console.log('Username: ' + username + '\n' + 'Password: ' + password);
		
		var me = this,		
		maintabpanel = me.getMaintabpanel();
		loginView = me.getLoginView();
		mainProfileView = me.getMainProfileView();
		
		if(!mainProfileView)
		{
			mainProfileView = Ext.create('Roadside.view.MainProfile');	
		}
		
		
		if (username.length === 0 || password.length === 0) {

			loginView.showSignInFailedMessage('Please enter your username and password.');
			return;
		}

		loginView.setMasked({
			xtype: 'loadmask',
			message: 'Signing In...'
		});
		/*
		Ext.Ajax.request({
		url: 'http://localhost:8080/RoadsideWeb/roadside/login',
		method: 'post',
		params: {
		userId: username,
		password: password
		},
		success: function (response) {
		console.log('Success res == '+response.responseText);
		var loginResponse = Ext.JSON.decode(response.responseText);
		
		loginView.setMasked(false);


		if (loginResponse.loginStatus === "Success") {
		// The server will send a token that can be used throughout the app to confirm that the user is authenticated.
		me.sessionToken = loginResponse.sessionToken;
		me.signInSuccess();     //Just simulating success.
		} else {
		me.singInFailure(loginResponse.errorMsg);
		} 
		},
		failure: function (response) {
		me.sessionToken = null;
		me.singInFailure('Login failed. Please try again later.');
		}
		});
		*/
		
		var registrationstore = Ext.getStore('registrationstore');
		 var signinsuccess = false;
		registrationstore.load(function(records, operation, success) {
			var count = registrationstore.getCount();
                    var data = registrationstore.getRange();
                    console.log('count : ' + count);
                    console.log('data : ' + data);
                   
                    for(var i =0 ; i< count ; i++)
                    {
                    	var item = registrationstore.getAt(i);
                    	var loginid = item.getData().loginid;
                    	var pass = item.getData().password
                    	console.log('item : ID ' + item.getData().loginid +'  = pass = '+item.getData().password);
                    	
                    	if(loginid.toLowerCase() == username.toLowerCase() && pass ==  password)
                    	{
                    		console.log('Login Success ');
                    		
                    		signinsuccess = true;
                    		
                    		break;
                    	}
                    	
                    }
                    
                 

		});
		loginView.setMasked(false);
		if(!signinsuccess)
                    {
                    	this.singInFailure('Login id '+username +' was not found. Please re-register.');
                    	
                    }
                else{
                this.signInSuccess();     //Just simulating success.
        }
                	

},





signInSuccess: function () {
	console.log('Signed in.');	
	Ext.Viewport.getComponent(0).setActiveItem(1);
	
	console.log("mainMenuView screen!");

},

singInFailure: function (message) {
	var loginView = this.getLoginView();
	loginView.showSignInFailedMessage(message);
	loginView.setMasked(false);
},

onSignOffCommand: function () {
	console.log("Login Controller :  onSignOffCommand!");
	var me = this;

	/* Ext.Ajax.request({
	url: '../../services/logoff.ashx',
	method: 'post',
	params: {
	sessionToken: me.sessionToken
	},
	success: function (response) {

	// TODO: You need to handle this condition.
	},
	failure: function (response) {

	// TODO: You need to handle this condition.
	}
	});
	*/
	Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
},
// Base Class functions.
launch: function () {
	this.callParent(arguments);
	
	console.log("launch");
	
                            
},
init: function () {
	this.callParent(arguments);
	console.log("init");
	//this.onOverCommand();
}

});
