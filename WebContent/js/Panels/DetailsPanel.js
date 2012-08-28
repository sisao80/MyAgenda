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

DetailsPanel = Ext.extend(Ext.Panel, {
    title: 'Guida',
    bodyStyle: 'padding-bottom:15px;background:#eee;',
    iconCls:'icon-help',
	autoScroll: true,
	html: '<h2>Aiuto contestuale</h2><p class="details-info">Quando selezioni una funzione dal menu dei servizi disponibili, qui verranno mostrati i consigli che ti guideranno nell\'utilizzo dell\'interfaccia.</p>'
});

// Registra un xtype per il componente:
Ext.reg('detailspanel', DetailsPanel);
