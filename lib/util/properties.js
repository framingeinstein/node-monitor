var properties = function (defaults, options) {
	var self = this;
	
	self.copy = function(dest, from) {
	    var props = Object.getOwnPropertyNames(from), destination;

	    props.forEach(function (name) {
	        if (typeof from[name] === 'object' && !from[name] instanceof RegExp) {
	            if (typeof dest[name] !== 'object') {
	                dest[name] = {}
	            }
	            self.copy(dest[name],from[name]);
	        } else {
				
	            destination = Object.getOwnPropertyDescriptor(from, name);
				//console.log(name);
				//console.log(destination);
	            Object.defineProperty(dest, name, destination);
	        }
	    });
	}
	
	self.copy(this, defaults);
	self.copy(this, options)

};


module.exports = properties;