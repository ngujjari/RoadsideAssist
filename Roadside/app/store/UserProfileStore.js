Ext.define('Roadside.store.UserProfileStore', {
    extend: 'Ext.data.Store',

     alias: 'store.UserProfileStore',
     requires: [
     		'Roadside.model.UserProfile'
     		],

     config: {
		 model: 'Roadside.model.UserProfile',
		 storeId: 'userstore',
		// identifier:'uuid', // needed to avoid console warnings!

		 proxy: {
			 type: 'localstorage',
			 id: 'userstoreproxy'
			 }

		}
});
