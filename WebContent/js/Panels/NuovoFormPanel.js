NuovoFormPanel = Ext.extend(Ext.FormPanel, {

	initComponent: function() {

	Ext.apply(this, {
		labelWidth: 100, // label settings here cascade unless overridden
		//title: 'Utilizza la form sottostante per le tue modifiche anagrafiche',
		url:'nuovoContatto.json',
		//region: 'center',
		frame:true,
		//bodyStyle:'padding:5px 5px 0',
		//height: 80,
		//minSize: 80,
		//maxSize: 80,
		//margins: '0 0 0 0',
		//layout:'fit',
		//collapsible:false,
		//hideCollapseTool:true,
		defaultType: 'textfield',

		items: [{
			fieldLabel: 'Cognome',
			name: 'cognome',
			allowBlank:false
		},{
			fieldLabel: 'Nome',
			name: 'nome',
			allowBlank:false
		},{
			fieldLabel: 'Email',
			name: 'email',
			vtype:'email'
		},{
			fieldLabel: 'Indirizzo',
			name: 'indirizzo'
		},{
			fieldLabel: 'Telefono',
			name: 'telefono'
		},{
			fieldLabel: 'Cellulare',
			name: 'cellulare'
		}
		],

		buttons: [{
			id: 'submit-btn',
			text: 'Salva',
			iconCls: 'icon-save',
			tooltip: {title: 'Salva', text: 'Immetti il nuovo contatto'},
			handler: this.confermaSalvataggio,
			scope: this
		},{
			id: 'reset-btn',
			text: 'Reimposta',
			iconCls: 'icon-cancel',
			tooltip: {title: 'Reimposta', text: 'Reimposta i campi'},
			handler: function () {
				this.nuovoContattoForm.getForm().reset();
			},

			scope: this
		}]
	});

	/*
	Ext.apply(this, {
		//title: 'Utilizza la form sottostante per le tue modifiche anagrafiche',
		//iconCls: 'icon-anagrafica',
		//layout: 'border',
		defaults: {
		//collapsible: true,
		//split: true,
		//bodyStyle: 'padding:5px'
	},
	items: [this.nuovoContattoForm]
	});
	 */

	NuovoFormPanel.superclass.initComponent.apply(this, arguments);
},

confermaSalvataggio : function() {

	// Chiede conferma all'utente:
	Ext.Msg.show({
		title:'Conferma richiesta'
			, msg: 'Scegliendo <b>si</b> le modifiche verranno salvate nel database.<br/>Vuoi continuare?'
				, buttons: Ext.Msg.YESNO
				, fn: function(button){
		switch(button)
		{
		case 'yes':
			this.performSubmit();
			break;
		case 'no':
			break;
		}
	}
	, scope: this
	, icon: Ext.MessageBox.QUESTION
	});
},

onClientValidation: function(form, valid) {
	Ext.get('submit-btn').setDisabled(!valid);
},

performSubmit: function() {

	this.store = new Ext.data.Store({
		url: 'nuovoContatto.json',
		baseParams: {
		action:'createContatto'
	},
	reader: new Ext.data.JsonReader({
		root: "results"
	}, Ext.data.Record.create([
	                           {name: 'cognome'},
	                           {name: 'nome'},
	                           {name: 'email'},
	                           {name: 'indirizzo'},
	                           {name: 'telefono'},
	                           {name: 'cellulare'}
	                           ])),
	                           autoLoad: false,
	                           remoteSort: true
	});

	// Async form submit:
	this.store.baseParams = {
			action: 'createContatto',
			cognome:  this.getForm().findField('cognome').getValue(),
			nome: this.getForm().findField('nome').getValue(),
			email: this.getForm().findField('email').getValue(),
			indirizzo: this.getForm().findField('indirizzo').getValue(),
			telefono: this.getForm().findField('telefono').getValue(),
			cellulare: this.getForm().findField('cellulare').getValue()
	};

	this.store.load({
		params: {
		cognome:  this.getForm().findField('cognome').getValue(),
		nome: this.getForm().findField('nome').getValue(),
		email: this.getForm().findField('email').getValue(),
		indirizzo: this.getForm().findField('indirizzo').getValue(),
		telefono: this.getForm().findField('telefono').getValue(),
		cellulare: this.getForm().findField('cellulare').getValue()
	}
	});
}
});

Ext.reg('nuovoformpanel', NuovoFormPanel);