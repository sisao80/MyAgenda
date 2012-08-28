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
/* Questo file conterrˆ tutte le pagini disponibili con l'applicazione,
 * Definendo per ogni pagina un id, oltre che a definire un layout generale di presentazione
 * del contenuto.
 */


// This is the main content center region that will contain each example layout panel.
// It will be implemented as a CardLayout since it will contain multiple panels with
// only one being visible at any given time.
ContentPanel = Ext.extend(Ext.Panel, {
	border: false,
	initComponent: function() {
		
		Ext.apply(this, {
		
			layout: 'card',
			margins: '2 5 5 0',
			activeItem: 0,

			defaults: {
				autoScroll: true,
				toWidth: true
			},
			
			items: [
				{
					xtype:'startpanel',
					id:'start-panel'
				},{
					xtype:'agendapanel',
					id:'agenda-panel'
				},{
					xtype:'nuovopanel',
					id:'nuovo-panel'
				}
			]
		});
		
		ContentPanel.superclass.initComponent.apply(this, arguments);
	}
});

// Registra un xtype per il componente:
Ext.reg('contentpanel', ContentPanel);
