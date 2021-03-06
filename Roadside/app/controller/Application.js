Ext.define('Roadside.controller.Application', {
	extend : 'Ext.app.Controller',

	config : {
		refs : {
			main : 'mainview',
			editButton : '#editButton',
			contacts : 'contacts',
			showContact : 'contact-show',
			editContact : 'contact-edit',
			showCurrentLocation : 'current-location-show',
			currentLocationButton : '#currentLocationButton',
			saveButton : '#saveButton',
			shareLocation : 'share-location',
			shareButton : '#shareButton',
			currentLocationView : 'current-location',
			maintabpanel : 'maintabpanel',
			locationnav : '#locationnav',
			shareLocForm : 'share-location #shareLocForm',
			otherShareButton : '#otherShareButton',
			agentShareButton : '#agentShareButton',
		},

		control : {
			main : {
				push : 'onMainPush',
				pop : 'onMainPop',
				back : 'backButtonHandler'

			},
			editButton : {
				tap : 'onContactEdit'
			},
			contacts : {
				itemtap : 'onContactSelect'
			},
			saveButton : {
				tap : 'onContactSave'
			},
			editContact : {
				change : 'onContactChange'
			},
			currentLocationButton : {
				tap : 'onCurrentLocationShow',
				back : 'backButtonHandler'
			},
			shareButton : {
				tap : 'onShareButton'
			},
			shareLocation : {
				push : 'onShareLocPush',
				back : 'backButtonHandler'
			},
			showCurrentLocation : {
				back : 'backButtonHandler'
			},
			agentShareButton : {
				tap : 'sendAgentMessage'
			},
			otherShareButton : {
				tap : 'sendOtherMessage'
			},

		}
	},

	onShareLocPush : function() {
		console.log('onShareLocPush: Enter');
	},
	backButtonHandler : function() {
		console.log('backButtonHandler: Enter');
	},
	sendAgentMessage : function() {
		console.log('Application : sendAgentMessage Enter');

		var shareLocFormVal = this.getShareLocForm().getValues();
		console.log('Application: sendAgentMessage shareLocFormVal= ' + shareLocFormVal);

		if (shareLocFormVal != null) {
			console.log('Application: sendMessage agentphone = ' + shareLocFormVal.agentphone);
			window.location.href = "sms:"+shareLocFormVal.agentphone
                            +'?body='+'Hello '+ shareLocFormVal.agentfname +', This message holds my current location. Click on the link https://maps.google.com/maps?q='
                            + shareLocFormVal.agentlat +','
                            + shareLocFormVal.agentlng 
                            +'&z=16'
                            +' to see my location in google map.' ;
                            
			
		}

		console.log('Application : sendAgentMessage End');

	},
	sendOtherMessage : function() {
		console.log('Application : sendOtherMessage Enter');

		var shareLocFormVal = this.getShareLocForm().getValues();
		console.log('Application: sendOtherMessage shareLocFormVal= ' + shareLocFormVal);

		if (shareLocFormVal != null) {
			console.log('Application: sendMessage agentphone = ' + shareLocFormVal.otherphone);
			window.location.href = "sms:"+shareLocFormVal.otherphone
                            +'?body='+'Hello '+ shareLocFormVal.otherfname +', This message holds my current location. Click on the link https://maps.google.com/maps?q='
                            + shareLocFormVal.otherlat +','
                            + shareLocFormVal.otherlng 
                            +'&z=16'
                            +' to see my location in google map.' ;
			
			
		}

		console.log('Application : sendOtherMessage End');

	},
	onMainPush : function(view, item) {
		console.log('onMainPush: Enter');
		var editButton = this.getEditButton();
		var shareButton = this.getShareButton();

		if (item.xtype == "contact-show") {
			this.getContacts().deselectAll();
			this.showCurrentLocationButton();
			this.showEditButton();
		} else if (item.xtype == "current-location-show") {

			this.showShareButton();
			this.hideEditButton();
			this.hideCurrentLocationButton();
		} else {
			this.hideEditButton();
			this.hideCurrentLocationButton();
			this.hideShareButton();
		}
		console.log('onMainPush: Exit');
	},

	onMainPop : function(view, item) {
		console.log('onMainPop: Enter');
		if (item.xtype == "contact-edit") {
			this.showEditButton();
			this.showCurrentLocationButton();
		} else {
			this.hideEditButton();
			this.hideCurrentLocationButton();
		}
		console.log('onMainPop: Exit');
	},

	onContactSelect : function(list, index, node, record) {
		console.log('onContactSelect: Enter');
		var editButton = this.getEditButton();

		if (!this.showContact) {
			this.showContact = Ext.create('Roadside.view.contact.Show');
		}

		// Bind the record onto the show contact view
		this.showContact.setRecord(record);
		console.log('onContactSelect: Exit');

		// Push the show contact view into the navigation view
		this.getMain().push(this.showContact);

	},

	onContactEdit : function() {
		if (!this.editContact) {
			this.editContact = Ext.create('Roadside.view.contact.Edit');
		}

		// Bind the record onto the edit contact view
		this.editContact.setRecord(this.getShowContact().getRecord());

		this.getMain().push(this.editContact);
	},

	onShareButton : function() {
		if (!this.shareLocation) {
			Ext.Viewport.remove(this.shareLocation, true);
			//this.getShareLocation().destroy();
		}
		// Create a New Object to fix the issue with BACK button
		console.log('onShareButton:  NEW shareLocation object');
		this.shareLocation = Ext.create('Roadside.view.contact.ShareLocation');

		// Bind the record onto the edit contact view
		console.log('onShareButton: record= ' + this.getCurrentLocationView().getRecord());

		var gueststore = Ext.getStore('gueststore');
		var storeData;
		gueststore.load(function(records, operation, success) {
			if (success) {
				var record = gueststore.first();
				if (record != null) {
					console.log('record ==== ' + record.getData().agentlname);
					storeData = record;

				} else {
					storeData = Ext.create('Roadside.model.ShareLocation', {
						agentfname : '',
						agentlname : '',
						agentphone : '',
						agentlat : '',
						agentlng : ''
					});
				}
			}

		});

		var shareLocModel = Ext.create('Roadside.model.ShareLocation', {
			agentfname : storeData.getData().agentfname,
			agentlname : storeData.getData().agentlname,
			agentphone : storeData.getData().agentphone,
			agentlat : this.getCurrentLocationView().getRecord().data.lat,
			agentlng : this.getCurrentLocationView().getRecord().data.lng,
			otherlat : this.getCurrentLocationView().getRecord().data.lat,
			otherlng : this.getCurrentLocationView().getRecord().data.lng
		});

		this.shareLocation.setRecord(shareLocModel);
		//var fieldset1 = Ext.ComponentQuery.query('#shareloc-fieldset1')[0];
		//console.log(' fieldset1 == '+ fieldset1);
		if (storeData.getData().agentphone == '') {
			var shareLocForm = this.getShareLocForm();
			console.log(' shareLocForm == ' + shareLocForm);
			var fieldset1 = shareLocForm.child('[id=shareloc-fieldset1]');
			console.log(' fieldset1 == ' + fieldset1);
			fieldset1.hide();
		}

		//var shareLocForm = this.getShareLocForm();
		//console.log(' shareLocForm == '+ shareLocForm);
		//fieldset2 = shareLocForm.child('[id=shareloc-fieldset1]');
		//console.log(' fieldset2 == '+ fieldset2);
		//fieldset2.hide();
		//this.getMaintabpanel().setActiveItem(0);
		//Ext.Viewport.getComponent(0).setActiveItem(0);

		//this.getMaintabpanel().animateActiveItem({ xtype : 'share-location'}, {type: 'slide', direction: 'left'});
		//this.getLocationnav().push(this.shareLocation);
		this.hideShareButton();
		this.getCurrentLocationView().push(this.shareLocation);
	},

	onCurrentLocationShow : function() {
		if (!this.showCurrentLocation) {
			this.showCurrentLocation = Ext.create('Roadside.view.contact.ShowCurrentLoc');
		}
		this.showCurrentLocation.setRecord(this.getShowContact().getRecord());
		this.showShareButton();
		this.getMain().push(this.showCurrentLocation);
	},

	onContactChange : function() {
		this.showSaveButton();
	},

	onContactSave : function() {
		var record = this.getEditContact().saveRecord();

		this.getShowContact().updateRecord(record);

		this.getMain().pop();
	},

	showEditButton : function() {
		var editButton = this.getEditButton();

		if (!editButton.isHidden()) {
			return;
		}

		this.hideSaveButton();

		editButton.show();
	},

	hideEditButton : function() {
		var editButton = this.getEditButton();

		if (editButton.isHidden()) {
			return;
		}

		editButton.hide();
	},

	showShareButton : function() {
		var shareButton = this.getShareButton();

		if (!shareButton.isHidden()) {
			return;
		}

		//this.hideSaveButton();

		shareButton.show();
	},

	hideShareButton : function() {
		var shareButton = this.getShareButton();

		if (shareButton.isHidden()) {
			return;
		}

		shareButton.hide();
	},

	showCurrentLocationButton : function() {
		var currentLocationButton = this.getCurrentLocationButton();

		if (!currentLocationButton.isHidden()) {
			return;
		}

		//this.hideSaveButton();

		currentLocationButton.show();

	},

	hideCurrentLocationButton : function() {
		var currentLocationButton = this.getCurrentLocationButton();

		if (currentLocationButton.isHidden()) {
			return;
		}

		currentLocationButton.hide();

	},

	showSaveButton : function() {
		var saveButton = this.getSaveButton();

		if (!saveButton.isHidden()) {
			return;
		}

		saveButton.show();
	},

	hideSaveButton : function() {
		var saveButton = this.getSaveButton();

		if (saveButton.isHidden()) {
			return;
		}

		saveButton.hide();
	}
});
