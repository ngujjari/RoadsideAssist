Ext.define('Roadside.model.Guest',
{
	extend: 'Ext.data.Model',
	alias: 'model.Guest',
	config: {
		identifier: {
		  type: 'uuid',
		  isUnique: true
		},
		
		fields: [
		{
			name: 'userId'
		},
		{
			name: 'password'
		},
		{
			name: 'fname'
		},
		{
			name: 'lname'
		},
		{
			name: 'email'
		},
		{
			name: 'phone'
		},
		{
			name: 'agentfname'
		},
		{
			name: 'agentlname'
		},
		{
			name: 'agentphone'
		}
		
		],
		 validations: [             
		 {                 
		 	type: 'presence',                 
		 	field: 'fname',
		 	message: 'First Name must be present'            
		 },   
		 {                 
		 	type: 'presence',                 
		 	field: 'phone' ,
		 	message: 'Phone must be present'            
		 },
		 {                 
		 	type: 'presence',                 
		 	field: 'agentfname',
		 	message: 'Agent First Name must be present'             
		 },
		 {                 
		 	type: 'presence',                 
		 	field: 'agentphone',
		 	message: 'Agent Phone must be present'             
		 },
		 {                
		 	type: 'format',                
		 	field: 'phone',                
		 	matcher: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/, 
		 	///^([0-9]{3}[-]?){1,2}([0-9]{4})$/, //US Phone No                
		 	message: 'Phone is invalid'            
		 }  ,          		              
		 {                
		 	type: 'format',                
		 	field: 'agentphone',                
		 	matcher: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,                
		 	message: 'Agent Phone is invalid'            
		 }        
		 
		 ] 
		 
	   }


});


