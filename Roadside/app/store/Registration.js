Ext.define('Roadside.store.Registration', {
    extend: 'Ext.data.Store',

     alias: 'store.Registration',
     requires: [
     		'Roadside.model.Registration'
     		],

     config: {
		 model: 'Roadside.model.Registration',
		 storeId: 'registrationstore',
		// identifier:'uuid', // needed to avoid console warnings!

		 proxy: {
			 type: 'localstorage',
			 id: 'registrationstoreproxy'
			 }

		}
});
