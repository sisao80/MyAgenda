NuovoContattoPanel = Ext.extend(Ext.Panel, {
	
	initComponent: function() {
	
		Ext.apply(this, {
			id: 'nuovo-panel',
			title: 'Inserisci un nuovo contatto',
			collapsible:false,
			items: [{
			xtype:'nuovoformpanel'
			}]
		});	
		NuovoContattoPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('nuovopanel', NuovoContattoPanel);