Ext.define('Roadside.model.ShareLocation',
{
	extend: 'Ext.data.Model',
	alias: 'model.ShareLocation',
	config: {
		identifier: {
		  type: 'uuid',
		  isUnique: true
		},
		
		fields: [
		{
			name: 'agentfname'
		},
		{
			name: 'agentlname'
		},		
		{
			name: 'agentphone'
		},
		{
			name: 'agentlat'
		},
		{
			name: 'agentlng'
		},
		{
			name: 'primarycontactfname'
		},
		{
			name: 'primarycontactlname'
		},		
		{
			name: 'primarycontactphone'
		},
		{
			name: 'primarycontactlat'
		},
		{
			name: 'primarycontactlng'
		},
		{
			name: 'otherfname'
		},
		{
			name: 'otherlname'
		},		
		{
			name: 'otherphone'
		},
		{
			name: 'otherlat'
		},
		{
			name: 'otherlng'
		},
		
		]
	   }


});


