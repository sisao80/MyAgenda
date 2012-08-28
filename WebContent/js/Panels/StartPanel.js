/**
 * Definizione di un pannello per la dashboard iniziale dell'utente.
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

StartPanel = Ext.extend(Ext.Panel, {

	initComponent: function() {

        Ext.apply(this, {
			id: 'start-panel',
			title: 'Pagina iniziale',
			iconCls: 'icon-start',
			layout: 'fit',
			bodyStyle: 'padding:25px',
			cls: 'credits-panel',
			contentEl: 'start-div'  // pull existing content from the page
        });
        //INIZIO

        //FINE
		StartPanel.superclass.initComponent.apply(this, arguments);
	}	
});

// Registra un xtype per il componente:
Ext.reg('startpanel', StartPanel);
