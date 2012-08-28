/*!
 * Ext JS Library 3.0+
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
AgendaGrid = Ext.extend(Ext.grid.GridPanel, {


	// NOTE: This is an example showing simple state management. During development,
	// it is generally best to disable state management as dynamically-generated ids
	// can change across page loads, leading to unpredictable results.  The developer
	// should ensure that stable state ids are set for stateful components in real apps.    
	

	refresh: function() {
	this.store.reload();
},

/**
 * Inizializzatore del componente.
 */
initComponent:function() {

	this.store = new Ext.data.Store({
		url: 'agenda.json',
		baseParams: {action: 'listAll'},
		reader: new Ext.data.JsonReader({
			root: "anagrafica" 
		}, Ext.data.Record.create([
		                           {name: 'cognome'},
		                           {name: 'nome'},
		                           {name: 'email'},
		                           {name: 'indirizzo'},
		                           {name: 'cellulare'},
		                           {name: 'telefono'}
		                           ])),
		                           autoLoad:true,
		                           remoteSort: false
	});

	this.store.setDefaultSort('cognome', 'asc');

	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function change(val){
		if(val > 0){
			return '<span style="color:green;">' + val + '</span>';
		}else if(val < 0){
			return '<span style="color:red;">' + val + '</span>';
		}
		return val;
	}

	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function pctChange(val){
		if(val > 0){
			return '<span style="color:green;">' + val + '%</span>';
		}else if(val < 0){
			return '<span style="color:red;">' + val + '%</span>';
		}
		return val;
	}

	//create the Grid
	Ext.apply(this, {
		store: this.store,
		columns: [
		          {header: 'Cognome', width: 200, sortable: true, dataIndex: 'cognome'},
		          {header: 'Nome', width: 200, sortable: true, dataIndex: 'nome'},
		          {header: 'Email', width: 150, sortable: true, dataIndex: 'email'},
		          {header: 'Indirizzo', width: 75, sortable: true, dataIndex: 'indirizzo'},
		          {header: 'Cellulare', width: 75, sortable: true, dataIndex: 'cellulare'},
		          {header: 'Telefono', width: 85, sortable: true, dataIndex: 'telefono'}
		          ],
		          stripeRows: true,
		          //autoExpandColumn: 'company',
		          //height: 350,
		          //width: 600,
		          // config options for stateful behavior
		          stateful: true,
		          stateId: 'grid'        
	});

	AgendaGrid.superclass.initComponent.apply(this, arguments);
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

}

});

//Registra un xtype per il componente:
Ext.reg('agendagrid', AgendaGrid);