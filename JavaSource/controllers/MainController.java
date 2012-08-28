package controllers;

import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

import view.JsonView;

import javax.servlet.ServletRequest;

import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

public class MainController extends MultiActionController {

	
		
		/** La vista JSON utilizzata dal controller per serializzare automaticamente il modello dei dati */
		private JsonView view;
		
		public MainController() {
			super();
			view = new JsonView();
		}
		
		/**
		 * Restituisce la vista d'errore dell'applicazione.
		 * @return 
		 */
		public static ModelAndView getErrorView() {
			return new ModelAndView("error");
		}
		
		/**
		 * Restituiscce una risposta JSON convenzionale che viene interpretata
		 * dal view layer come esito negativo di un'operazione.
		 * Viene utilizzato generalmente nella callback di una chiamata asincrona
		 * per confermare il buon esito di un comando ovvero del suo fallimento, in
		 * modo da poter ripristinare lo stato dell'interfaccia grafica.
		 * 
		 * @return una coppia modello-vista secondo quanto sancito da Spring MVC
		 */
		protected ModelAndView getSuccess() {
			Map<String, Object> model = new TreeMap<String, Object>();
			model.put("success", "true");
			model.put("exception", null);
		
			return new ModelAndView(getView(), model);
		}

		/**
		 * Restituiscce una risposta JSON convenzionale che viene interpretata
		 * dal view layer come esito negativo di un'operazione.
		 * Viene utilizzato generalmente nella callback di una chiamata asincrona
		 * per confermare il buon esito di un comando ovvero del suo fallimento, in
		 * modo da poter ripristinare lo stato dell'interfaccia grafica.
		 * 
		 * @param message	il messagio d'errore da mostrare all'utente
		 * 
		 * @return una coppia modello-vista secondo quanto sancito da Spring MVC
		 */
		protected ModelAndView getFailure(String message) {
			Map<String, Object> model = new TreeMap<String, Object>();
			model.put("exception", message);

			return new ModelAndView(getView(), model);
		}

		public JsonView getView() {
			view.setContentType("application/json");
			return view;
		}
		
		/**
		 * Estrae dalla richiesta un parametro convertendolo automaticamente in un oggetto
		 * Date.
		 * @param request riferimento alla richiesta
		 * @param name nome del parametro di cui effettuare il parsing
		 * @return
		 * @throws ServletRequestBindingException
		 */
		protected Date getRequiredDateParameter(ServletRequest request, String name) throws ServletRequestBindingException {
			Long numDate = ServletRequestUtils.getRequiredLongParameter(request, name);
			Date date = new Date(numDate);
			return date;
		}


}