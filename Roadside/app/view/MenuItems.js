Ext.define('Roadside.view.MenuItems', {
    extend: 'Ext.List',
    xtype: 'menuitems',

    config: {
        title: 'NTT RSA',
        cls: 'x-menuitems',
        variableHeights: false,       
        html: [
            '<div class="headshot" style="background-image:url(resources/images/headshots/{headshot});"></div>',
            'Login',
            '<span>Login</span>'
        ].join('')
    }
});
