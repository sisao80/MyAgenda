/**
 * Definizione del ViewPort dell'applicazione.
 * Questo componente arrangia e gestisce gli elementi dell'interfaccia grafica dell'applicazione. 
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

Viewport = Ext.extend(Ext.Viewport, {
	title: 'My Agenda',

	initComponent: function() {
		Ext.apply(this, {
			layout: 'border',
			items: [{
				xtype: 'box',
				region: 'north',
				applyTo: 'header',
				height: 76
			},{
				xtype:'appbrowser',
		    	id: 'layout-browser',
		        region:'west',
				split: true
			}, {
				xtype: 'contentpanel',
				id: 'content-panel',
				region: 'center'
			}],
	        renderTo: Ext.getBody()
		});

		// Chiama il metodo della superclasse secondo il pattern decorator:
		Viewport.superclass.initComponent.apply(this, arguments);

		this.appBrowser = this.items.itemAt(1);
	},
	
	afterRender:function() {
  
		Viewport.superclass.afterRender.apply(this, arguments);
	} // e/o function afterRender
});

// Registra un xtype per il componente:
Ext.reg('viewport', Viewport);
