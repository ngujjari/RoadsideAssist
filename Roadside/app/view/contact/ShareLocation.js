Ext.define('Roadside.view.contact.ShareLocation', {
	extend : 'Ext.navigation.View',
	xtype : 'share-location',

	requires : ['Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.Text', 'Roadside.store.Contacts', 'Ext.field.Hidden'],

	config : {
		title : 'Share Location',
		layout : 'card',
		// autoDestroy: true,
		navigationBar : false,

		items : [{
			xtype : 'formpanel',
			itemId : 'shareLocForm',
			items : [{
				xtype : 'fieldset',
				id : 'shareloc-fieldset1',
				hidden : false,
				defaults : {
					labelWidth : '35%'
				},
				title : 'Agent Contact',
				items : [{
					xtype : 'textfield',
					label : 'Name',
					name : 'agentfname'
				}/*,
				 {
				 xtype: 'textfield',
				 label: 'Last Name',
				 name: 'agentlname'
				 }*/,
				{
					xtype : 'textfield',
					component : {
						type : 'tel'
					},
					// id: 'telephone',
					label : 'Phone',
					name : 'agentphone'
				}, {

					//id: 'lat',
					name : 'agentlat',
					xtype : 'hiddenfield'
				}, {

					//id: 'lng',
					name : 'agentlng',
					xtype : 'hiddenfield'
				}, {

					layout : {
						type : 'hbox',
						pack : 'center'
					},
					items : [{

						xtype : 'button',
						id : 'agentShareButton',
						itemId : 'agentShareButton',
						//width: '40%',
						text : 'Send Message',
						margin : '3px',
						ui : 'blue',
						// align: 'right',
						handler : function() {
							// alert('Loader ..'+ Ext.getCmp('telephone').getValue() +' = '+Ext.getCmp('latitude').getValue());
							/*    window.location.href = "sms:"+Ext.getCmp('agentphone').getValue()
							 +'?body='+'Hello , This message holds my current location. Click on the link https://maps.google.com/maps?q='
							 + Ext.getCmp('agentlat').getValue()+','
							 + Ext.getCmp('agentlng').getValue()
							 +'&z=16'
							 +' to see my location in google map.' ;
							 */
							console.log('Button Handler == ' + Ext.getCmp('agentphone'));
						}
					}],
				}]
			}/*,
			 {
			 xtype: 'fieldset',
			 defaults: {
			 labelWidth: '35%'
			 },
			 title: 'Primary Contact',
			 items: [
			 {
			 xtype: 'textfield',
			 label: 'First Name',
			 name: 'primarycontactfname'
			 },
			 {
			 xtype: 'textfield',
			 label: 'Last Name',
			 name: 'primarycontactlname'
			 },
			 {
			 xtype: 'textfield',
			 // id: 'telephone',
			 label: 'Telephone',
			 name: 'primarycontactphone'
			 },
			 {
			 //id: 'latitude',
			 name: 'primarycontactlat',
			 xtype: 'hiddenfield'
			 },
			 {

			 //id: 'longitude',
			 name: 'primarycontactlng',
			 xtype: 'hiddenfield'
			 },
			 {
			 xtype: 'button',
			 itemId: 'guestSubmitButton',
			 width: '20%',
			 text: 'Share',
			 margin: '5px auto',
			 ui: 'confirm'
			 }

			 ]
			 }*/,
			{
				xtype : 'fieldset',
				defaults : {
					labelWidth : '35%'
				},
				title : 'Other ',
				items : [{
					xtype : 'textfield',
					label : 'Name',
					name : 'otherfname'
				}, /*
				 {
				 xtype: 'textfield',
				 label: 'Last Name',
				 name: 'otherlname'
				 },*/
				{
					xtype : 'textfield',
					component : {
						type : 'tel'
					},
					// id: 'telephone',
					label : 'Phone',
					name : 'otherphone'
				}, {
					//id: 'latitude',
					name : 'otherlat',
					xtype : 'hiddenfield'
				}, {

					//id: 'longitude',
					name : 'otherlng',
					xtype : 'hiddenfield'
				}, {
					layout : {
						type : 'hbox',
						pack : 'center'
					},
					items : [{

						xtype : 'button',
						id : 'otherShareButton',
						itemId : 'otherShareButton',
						text : 'Send Message',
						margin : '3px',
						ui : 'blue'

					}],
				}]
			}]
		}
		//,

		// <!-- Docked Items -->

		// Create a docked bottom toolbar which will contain buttons to trigger various functions in our formpanel.
		/*        {
		xtype: 'toolbar',
		docked: 'bottom',
		scrollable: true,
		items: [

		{
		text: 'Send Message',
		ui: 'sencha',
		scope: this,
		handler : function() {
		// alert('Loader ..'+ Ext.getCmp('telephone').getValue() +' = '+Ext.getCmp('latitude').getValue());
		window.location.href = "sms:"+Ext.getCmp('telephone').getValue()
		+'?body='+'Hello , This message holds my current location. Click on the link https://maps.google.com/maps?q='
		+ Ext.getCmp('latitude').getValue()+','
		+ Ext.getCmp('longitude').getValue()
		+'&z=16'
		+' to see my location in google map.' ;
		}
		}
		]
		} */

		// Docked Items End
		],

		listeners : {
			delegate : 'textfield',
			keyup : 'onKeyUp'
		},

		record : null
	},

	updateRecord : function(newRecord) {
		//alert(newRecord.data.latitude);
		console.log('ShareLocation: newrecord = ' + newRecord);
		if (newRecord != null) {
			this.record = newRecord;
			var shareLocForm = Ext.ComponentQuery.query('#shareLocForm')[0];
			if (shareLocForm != null) {
				shareLocForm.setRecord(newRecord);
			}
		}
	},

	saveRecord : function() {
		var formPanel = this.down('formpanel'), record = formPanel.getRecord();

		formPanel.updateRecord(record);

		return record;
	},

	onKeyUp : function() {
		this.fireEvent('change', this);
	},
	initialize : function() {
		console.log('ShareLocation: initialize method ');
		/* var sto = Ext.getStore('allapp');
		 sto.clearFilter();
		 sto.filter('categoryid', this.getCatid());
		 this.callParent(arguments);
		 */
	}
});
