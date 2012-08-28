Ext.namespace('Ext.ux.tree');

Ext.ux.tree.RootTreeLoader = function(config){
    this.baseParams = {};
    Ext.apply(this, config);

    Ext.ux.tree.RootTreeLoader.superclass.constructor.call(this);
};
 
Ext.extend(Ext.ux.tree.RootTreeLoader, Ext.tree.TreeLoader, {
	/**
	 * @cfg {String} root name of the property which contains the Array of row objects.
	 */
	processResponse : function(response, node, callback){
        var json = response.responseText;
        try {
            var o = eval("("+json+")");
            o = o.results;
            node.beginUpdate();
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            if(typeof callback == "function"){
                callback(this, node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    }
});
