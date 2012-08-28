/*gobal Ext, escape, ip, unescape */

String.prototype.utf8_decode = function(s)
{
   return decodeURIComponent( escape( s ) );
};

String.prototype.utf8_encode = function(s)
{
	 return unescape( encodeURIComponent( s ) );
};

Number.prototype.truncate = function(n)
{
	return Math.round(this * Math.pow(10, n)) / Math.pow(10, n);
};

// plug Italian currency renderer into formatter
Ext.util.Format.itMoney = function(v)
{
	v = Math.round((v-0)*100)/100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
	return ('€ ' + v).replace(/\./, ',');
};

Ext.namespace('Ext.ux');

Ext.ux.CurrencyField = function(config) {
	this.format = config.format || "€ #,###.##"; //eu format;
	Ext.ux.CurrencyField.superclass.constructor.call(this, config);
	
	this.on('focus',this._onFocus);
	this.on('blur',this._onBlur);
	this.on('render',this._onRender);
    this.on('change',this._onChange,this);   
	this.oValue=config.value || 0;
	
};

Ext.extend(Ext.ux.CurrencyField, Ext.form.NumberField, {
   format:"",
   oValue:0,
   _onChange:function(f,n,o){
       this.oValue = n;
       this.setRawValue(this.formatter(n));
   },
   getValue:function(){
	 return this.oValue;
   },
   _onRender:function(cmp){
		this.setRawValue(this.formatter(this.oValue));
   },   
   formatter:function(value){
	  var prefix = '';
	  var decimals = '';
	  var millars = '';
	  var ndecimals = 0;
		
	  var s = this.format.substring(1);
	  
	  var i=0;
	  for(i=0; i < this.format.length; i++)
	  {
		if(this.format.charAt(i) != '#')
		{
			prefix = prefix + this.format.charAt(i);			
		}else {
			break;
		}
	  }
	  
	  s =  this.format.substring(prefix.length);
	  
	  for(i=0; i < s.length; i++) {
		if(s.charAt(i) != '#')
		{
			millars = s.charAt(i);
			s = s.substring(i+1);
			break;
		}
	  }
	  
	  for(i=0; i < s.length; i++) {
		if(s.charAt(i) != '#')
		{
			decimals = s.charAt(i);
			ndecimals = s.substring(i+1).length;

			break;
		}
	  }

	  var n = Number(value);
	  
	  ip = Math.floor(n);
	  
	  var dp = n - ip; 
	
	  dp = Math.round(dp*Math.pow(10,ndecimals)); 
		  
	  var regex  = new RegExp('(-?[0-9]+)([0-9]{3})');
	  ip = ip+'';
	  while(regex.test(ip)) {		
		ip = ip.replace(regex, '$1' + millars + '$2');
	  }
	  
	  ip = prefix+ip;
	  if(ndecimals > 0) {
	   ip = ip+decimals+dp;  
	  }
	  return ip;
   },
   _onBlur:function(field){
		this.oValue=field.getRawValue();
		field.setRawValue(this.formatter(this.oValue));
   },
   _onFocus:function(field){
	   field.setRawValue(this.oValue);
   }
});

Ext.reg('currencyfield', Ext.ux.CurrencyField);