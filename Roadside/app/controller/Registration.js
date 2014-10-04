Ext.define('Roadside.controller.Registration', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			loginView : 'loginview',
			registerView : 'registerView',
			maintabpanel : 'maintabpanel',
			registerForm : 'registerView #registerForm',
			shareButton : '#shareButton1',
		},
		control : {
			loginView : {
				registerClickCommand : 'registerClickCommand',
			},
			registerView : {
				registerSubmitCommand : 'registerSubmitCommand',
			}
		}
	},

	// Session token

	sessionToken : null,

	// Transitions
	getSlideLeftTransition : function() {
		return {
			type : 'slide',
			direction : 'left'
		};
	},

	getSlideRightTransition : function() {
		return {
			type : 'slide',
			direction : 'right'
		};
	},

	registerClickCommand : function(view) {

		console.log('registerClickCommand begin');

		var me = this,
		// maintabpanel = me.getMaintabpanel();
		loginView = me.getLoginView();
		registerView = me.getRegisterView();
		var form = this.getRegisterForm();

		if (!registerView) {
			registerView = Ext.create('Roadside.view.Registration');
		}

		registerView.updateRecord();
		loginView.push(registerView);
	},

	registerSubmitCommand : function(view) {

		var form = this.getRegisterForm();
		var values = form.getValues();
		console.log('registerSubmitCommand Username: ' + values + '\n' + 'NAME: ' + values.fname);
		var usr = Ext.create('Roadside.model.Registration', {
			loginid : values.loginid,
			password : values.password,
			confirmpassword : values.confirmpassword,
			fname : values.fname,
			lname : values.lname,
			email : values.email,
			phone : values.phone,
			agentfname : values.agentfname,
			agentlname : values.agentlname,
			agentphone : values.agentphone
		});

		var errs = usr.validate();
		var msg = '';
		var errFields = [];
		if (!errs.isValid()) {
			errs.each(function(err) {
				//err.getField()
				var present = false;
				for (var fldIdx = 0; fldIdx < errFields.length; fldIdx++) {
					if (errFields[fldIdx] == err.getField()) {
						present = true;
					}
				}
				if (!present) {
					errFields.push(err.getField());
					msg += err.getMessage() + '<br>';
				}
			});
			errFields = null;
			errFields = [];
			Ext.Msg.alert('ERROR', msg);
		} else {
			//Ext.Msg.alert('SUCCESS', 'Looks like the model is valid');
		}

		if (!msg.length > 0) {
			/*var registerstore = Ext.getStore('registerstore');
			 registerstore.removeAll();
			 registerstore.add(usr);
			 registerstore.sync();
			 console.log('profileSubmitCommand getCount: ' +registerstore.getCount());
			 */
			form.setMasked(true);
			console.log('Usr == ' + values.loginid + '  = ' + values.password + ' == ' + values.fname);
			var registrationstore = Ext.getStore('registrationstore');
			//registrationstore.removeAll();
			registrationstore.add(usr);
			registrationstore.sync();
			console.log('profileSubmitCommand getCount: ' + registrationstore.getCount());

			/*Ext.Ajax.request({
			 url: 'http://localhost:8080/RoadsideWeb/roadside/register',
			 method: 'post',
			 params: {
			 userId: values.loginid,
			 password: values.password,
			 confirmpassword: values.confirmpassword,
			 fname: values.fname,
			 lname: values.lname,
			 email:values.email,
			 phone: values.phone,
			 agentfname: values.agentfname,
			 agentlname: values.agentlname,
			 agentphone: values.agentphone

			 },
			 success: function (response) {
			 console.log('Success res == '+response.responseText);
			 //var registerResponse = Ext.JSON.decode(response.responseText);
			 var registerResponse = response.responseText;

			 registerView.setMasked(false);
			 console.log('registerResponse === '+registerResponse);

			 ///if (loginResponse.loginStatus === "Success") {
			 // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
			 //me.sessionToken = loginResponse.sessionToken;
			 //me.signInSuccess();     //Just simulating success.
			 //} else {
			 //me.singInFailure(loginResponse.errorMsg);
			 //}
			 },
			 failure: function (response) {
			 //me.sessionToken = null;
			 //me.singInFailure('Login failed. Please try again later.');
			 }
			 });
			 */
			form.setRecord(usr);
			// Mask the form

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

		}// No Validation errors

	},

	// Base Class functions.
	launch : function() {
		this.callParent(arguments);
		console.log("launch");
	},
	init : function() {
		this.callParent(arguments);
		console.log("init");
		//this.onOverCommand();
	}
});
