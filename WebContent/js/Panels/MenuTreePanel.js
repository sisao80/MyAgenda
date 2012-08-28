/**
 * Definizione del componente del menu dell'applicazione.
 * Il menu estende la classe Ext.tree.TreePanel e carica la sua 
 * configurazione dal backend tramite AJAX.
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

MenuTreePanel = Ext.extend(Ext.tree.TreePanel, {
    autoScroll: true,

    initComponent:function() {
		// tree-specific configs:
    	Ext.apply(this, {
			rootVisible: false,
			lines: false,
			singleExpand: true,
			useArrows: true,
			
			loader: new Ext.ux.tree.RootTreeLoader({
				dataUrl:'userMenu.json?action=listNodes',
				root:'results'
			}),

			root: new Ext.tree.AsyncTreeNode()
		});
 
       MenuTreePanel.superclass.initComponent.apply(this, arguments);
	} // eo function initComponent
});

// Registra l'xtype del componente:
Ext.reg('menutreepanel', MenuTreePanel);
