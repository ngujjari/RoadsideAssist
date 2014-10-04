Ext.define('Roadside.view.Services', {
    extend: 'Ext.Container',
    xtype: 'services-view',
    config: {
		iconCls: 'settings',
		title: 'Services',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Services'
            },
            {
		xtype: 'spacer',
		height: 20
            },
        
           {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Battery',
                handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Out of Fuel',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Flat Tire',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Lock Out',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Accident',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Towing',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            },
            {               
               xtype: 'button',    
               ui: 'orange-round',           
                width: '40%',
                margin: '3px auto',
               // ui: 'confirm',		                
                text: 'Other ?',
                 handler : function() {		                          
                     window.location.href = 'tel:+1-774-641-7519';
                   }
            },
            {
                xtype: 'spacer',
                height: 2
            }
        ]
    }

});