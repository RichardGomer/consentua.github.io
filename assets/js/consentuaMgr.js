/**
 * A helper for all things Consentua
 *
 */

function ConsentuaMgr(opts) {
    var self = this;

    // List of required options
    var reqOpts = ['serviceID', 'clientID'];

    // Default values for non-required options
    var defOpts = {cookiename: '_consentuaid'};

    // Enforce required options
    for(var i in reqOpts)
    {
        var k = reqOpts[i];
        if(typeof opts[k] == 'undefined')
        throw "Required option '"+k+"' is not set";
    }

    // Set default options
    for(var k in defOpts)
    {
        if(typeof opts[k] == 'undefined')
        opts[k] = defOpts[k];
    }

    // Create a client
    var client = new ConsentuaClient({
        serviceID: opts.serviceID,
        clientID: opts.clientID,
        baseURL: 'https://api.consentua.com/'
    });

    /**
     * Get a reference to the Client
     */
    self.getClient = function(){
        return client;
    }

    /**
     * Get the Consentua ID
     * This method returns a Promise that resolves with the ID, once it is available
     */
    var def_setid = $.Deferred();
    self.getID = function() {
        return def_setid;
    }

    /**
     * Set the Consentua ID
     */
    self.setID = function(id) {
        console.log("Storing ID");
        Cookies.set(opts.cookiename, id, {path: '', expires: 365 * 10});
        def_setid.resolve(id);
    }

    /**
     * Get extant consents; returns a promise
     */
    self.getConsentsRaw = function(){
        var def = $.Deferred();
        self.getID().then(function(uid){
            console.log("ID established, fetching consent");
            client.getConsents(uid).then(def.resolve);
        });
        return def;
    }

    self.getConsents = function(){
        var def = $.Deferred();
        self.getConsentsRaw().then(function(raw){

            console.log("Got raw consents", raw);

            if(typeof raw == 'undefined'){
                raw = {};
            }

            var map = {};
            for(var k of Object.keys(raw)){
                var c = raw[k];
                map[c.PurposeId] = c.Consent;
            }

            def.resolve(map);
        });

        return def;
    }

    /**
     * Initialise
     */
    var cuid = Cookies.get(opts.cookiename) || false;
    if(cuid == false) {
        client.addUser().then(function(user){
            self.setID(user.Identifier);
        });
    } else {
        client.testIfUserExists(cuid).then(function(){
            self.setID(cuid);
        });
    }
}

var cmgr = new ConsentuaMgr({
    serviceID: "25",
    clientID: "266"
});
