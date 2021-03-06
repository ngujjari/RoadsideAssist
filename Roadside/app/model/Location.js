Ext.define('Roadside.model.Location',
{
	extend: 'Ext.data.Model',
	alias: 'model.Location',
	config: {
		identifier: {
		  type: 'uuid',
		  isUnique: true
		},
		
		fields: [
		{
			name: 'fname'
		},
		{
			name: 'lname'
		},		
		{
			name: 'phone'
		},
		{
			name: 'lat'
		},
		{
			name: 'lng'
		}
		
		]
	   }


});


