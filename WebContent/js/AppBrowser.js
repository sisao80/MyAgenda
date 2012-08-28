/**
 * Definizione di un pannello per la visualizzazione dei dattagli di un modulo.
 * Quando un modulo viene selezionato nel menu in questo pannelo vengono mostrate
 * informazioni relative all'utilizzo del servizio, assieme ad un link alla guida
 * in linea dell'applicazione. 
 *
 * @author    InputData SRL
 * @copyright (c) 2008, InputData SRL
 * @date      2. April 2008
 * @version   $Id$
 *
 * @license application.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the 
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

// This is the main content center region that will contain each example layout panel.
// It will be implemented as a CardLayout since it will contain multiple panels with
// only one being visible at any given time.
AppBrowser = Ext.extend(Ext.Panel, {

    border: false,
    split:true,
	margins: '2 0 5 5',
    width: 200,
    minSize: 100,
    maxSize: 350,
	
	initComponent: function() {

        Ext.apply(this, {

			layout: 'border',
			//collapsible: true,
			items: [{
				xtype:'menutreepanel',
		        title: 'Servizi disponibili',
				region:'north',
				split: true,
				useSplitTips: true,
				height: 200,
				minSize: 150
			}, {
				xtype:'detailspanel',
				id: 'details-panel',
				collapsible: true,
			    region: 'center'
			}]
		});

		AppBrowser.superclass.initComponent.apply(this, arguments);
		
		// Ricostruisce i riferimenti ai componenti da gestire dinamicamente:
		this.menuTreePanel = this.items.itemAt(0);
		this.detailsPanel  = this.items.itemAt(1);
		
		// Gestisce il click sulle voci del menu:
		this.menuTreePanel.on({click:this.onLinkClick,stopEvent:true});
	},
	
	onLinkClick:function(n) {
		var sn = this.selModel.selNode || {}; // selNode is null on initial selection
		if(n.leaf && n.id != sn.id) { // ignore clicks on folders and currently selected node
			Ext.getCmp('content-panel').layout.setActiveItem(n.id + '-panel');
			if(!this.detailEl){
				var bd = Ext.getCmp('details-panel').body;
				bd.update('').setStyle('background','#fff');
				this.detailEl = bd.createChild(); //create default empty div
			}
			this.detailEl.hide().update(Ext.getDom(n.id+'-details').innerHTML).slideIn('l', {stopFx:true,duration:0.2});
		}
	}
});

// Registra un xtype per il componente:
Ext.reg('appbrowser', AppBrowser);
