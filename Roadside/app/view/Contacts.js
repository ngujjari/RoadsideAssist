Ext.define('Roadside.view.Contacts', {
    extend: 'Ext.List',
    xtype: 'contacts',

    config: {
        title: 'Contacts',
        cls: 'x-contacts',
        variableHeights: true,

        store: 'Contacts',
        itemTpl: [
            '<div class="headshot" style="background-image:url(resources/images/headshots/{headshot});"></div>',
            '{firstName} {lastName}',
            '<span>{title}</span>'
        ].join('')
    }
});
