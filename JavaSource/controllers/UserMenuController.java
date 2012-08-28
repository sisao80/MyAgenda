package controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;

import util.TreeNode;

public class UserMenuController extends MainController {

	private Map<String, TreeNode> moduleMap;

	public UserMenuController() {
		initModuleMap();
	}

	/**
	 * Metodo action che elenca tutte le voci del menu.
	 * Ogni voce è raresentata da una configurazione di nodo.
	 * Il nome assegnato ad un nodo è automaticamente mappato nel file
	 * AppBrowser.js da una regola associativa basata sull'id dell'item.
	 * 
	 * @param request
	 * @param response
	 * @return model
	 */
	public ModelAndView listNodes(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String node = ServletRequestUtils.getStringParameter(request, "node");
		List<String> modKeys = new ArrayList<String>();
		List<TreeNode> userMenu = new ArrayList<TreeNode>();
		/* Carico i moduli del menù che voglio visualizzare
		 * Eventualmente posso filtrare i nodi da visualizzare in base alle authorities 
		 * definite con SpringSecurity.
		 */
		modKeys.add("start");
		modKeys.add("agendaservices");
		/*
		 * Il menù iniziale così come appare al boot è un "xnode".
		 * Questa proprietà è posta in un parametro di sessione da ExtJs, "node".
		 * Quindi se ho "xnode" devo elencare tutti i nodi definiti sopra, i macronodi per intenderci.
		 * Altrimenti elenco i sottonodi del macronodo richiesto, e questa volta in sessione ci va il
		 * nome identificativo del nodo, e non più xnode.
		 */
		if(null != node && !node.startsWith("xnode")) {
			//Voglio i sottonodi di un macronodo
			TreeNode nodeObj = moduleMap.get(node);
			userMenu = (null != nodeObj) ? nodeObj.getChildren() : null;
		} else {
			//Voglio tutti i macronodi, xnode
			for(String key : modKeys) {
				userMenu.add(moduleMap.get(key));
			}
		}
		
		ModelAndView model = getSuccess();
		model.addObject("results", userMenu);
		return model;
	}

	/**
	 * Inizializza la mappa dei moduli.
	 */
	private void initModuleMap() {

		moduleMap = new HashMap<String, TreeNode>();
		
		TreeNode start = new TreeNode();
		start.setId("start");
		start.setIconCls("icon-start");
		start.setText("Pagina iniziale");
		start.setLeaf(true);
		moduleMap.put("start", start);

		TreeNode agendaServices = new TreeNode();
		agendaServices.setId("agendaservices");
		agendaServices.setText("Servizi Agenda");
		agendaServices.setLeaf(false);
		agendaServices.setChildren(new ArrayList<TreeNode>());
		
		TreeNode agenda = new TreeNode();
		agenda.setId("agenda");
		agenda.setIconCls("icon-anagrafica");
		agenda.setText("Agenda");
		agenda.setLeaf(true);
		TreeNode nuovoContatto = new TreeNode();
		nuovoContatto.setId("nuovo");
		nuovoContatto.setText("Nuovo");
		nuovoContatto.setLeaf(true);
		
		//Figli di agendaServices
		agendaServices.getChildren().add(agenda);
		agendaServices.getChildren().add(nuovoContatto);
		moduleMap.put("agendaservices", agendaServices);
		
	}
}



