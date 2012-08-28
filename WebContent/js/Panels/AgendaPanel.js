AgendaPanel = Ext.extend(Ext.Panel, {
	
	
	refresh: function() {
	this.getUpdater().refresh();
	},
	
	initComponent: function() {
	
		Ext.apply(this, {
			id: 'agenda-panel',
			title: 'La tua lista di contatti',
			collapsible:false,
			items: [{
			xtype:'agendagrid'
			}],
			tools: [{
				id:'refresh',
				handler: this.refresh,
				scope: this,
				qtip: {title: 'Aggiorna', text: 'Ricarica i contatti'}
			}]
		});	
		AgendaPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('agendapanel', AgendaPanel);