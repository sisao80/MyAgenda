package controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Anagrafica;

import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;

import org.apache.commons.lang.StringUtils;

import services.AnagraficaService;

public class AnagraficaController extends MainController{
	
	//Sto modificando il file per capire il versionamento.
	
	/**Oggetto che istanzia il container di servizi per
	 * la tabella Anagrfica.
	 */
	private AnagraficaService anagraficaService;
	
	public ModelAndView listAll(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		
		//Dialogo con il service layer (La logica di Business)
		List<Anagrafica> listAnagrafica =  anagraficaService.getAnagraficaList();
		//Inizializzo la view (il parametro stringa corrisponde ad una pagina jsp)
		ModelAndView mav = getSuccess();
		//aggiungo il model alla view (il model da usare come data container nella jsp di sopra)
		mav.addObject("anagrafica", listAnagrafica);
		//ritorno la view alla DispatcherServlet
		return mav;
		
	}
	
	public void createContatto(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
				
		Anagrafica nuovoContatto = new Anagrafica();
		//Preparo la fase di acquisizione dati da form
		try{
			String strNome = ServletRequestUtils.getStringParameter(request, "nome");
			String strCognome = ServletRequestUtils.getStringParameter(request, "cognome");
			String strEmail = ServletRequestUtils.getStringParameter(request, "email");
			String strIndirizzo = ServletRequestUtils.getStringParameter(request, "indirizzo");
			String strTelefono = ServletRequestUtils.getStringParameter(request, "telefono");
			String strCellulare = ServletRequestUtils.getStringParameter(request, "cellulare");
			
			//Costruisco l'oggetto nuovoContatto con i dati della request
			nuovoContatto.setNome(strNome.toUpperCase());
			nuovoContatto.setCognome(strCognome.toUpperCase());
			nuovoContatto.setEmail(strEmail);
			nuovoContatto.setIndirizzo(strIndirizzo);
			nuovoContatto.setTelefono(strTelefono);
			nuovoContatto.setCellulare(strCellulare);
			
			/*Sezione di debug
			System.out.println(nuovoContatto.getNome());
			System.out.println(nuovoContatto.getCognome());
			System.out.println(nuovoContatto.getEmail());
			System.out.println(nuovoContatto.getIndirizzo());
			System.out.println(nuovoContatto.getTelefono());
			System.out.println(nuovoContatto.getCellulare());
			*/
			//Creo il nuovo record
			anagraficaService.createContatto(nuovoContatto);
		}
		catch(ServletRequestBindingException e) {
		}
}

	public AnagraficaService getAnagraficaService() {
		return anagraficaService;
	}

	public void setAnagraficaService(AnagraficaService anagraficaService) {
		this.anagraficaService = anagraficaService;
	}

}
