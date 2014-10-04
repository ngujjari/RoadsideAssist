Ext.define('Roadside.model.UserProfile',
{
	extend: 'Ext.data.Model',
	alias: 'model.UserProfile',
	config: {
		identifier: {
		  type: 'uuid',
		  isUnique: true
		},
		
		fields: [
		{
			name: 'username'
		},
		{
			name: 'age'
		},
		{
			name: 'email'
		}
		]
	   }


});


