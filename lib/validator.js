var events = require('events');

var validator = function () {
	events.EventEmitter.call(this);
	var self = this;
	
	self.handlers= {};
	
	self.validate = function (page, response, notifier, callback) {
		var r = page.rules;
		var results = {};
		results.validations = [];
		results.raw = response.text;
		var pass = true;
		for (var k = 0; k < r.length; k++) {
			var rule = r[k];
			result = self.validateRule(rule, response, notifier);
			result.DT = new Date();
			pass = pass && result.pass;
			results.validations.push(result);
		}
		if(!pass){
			self.emit('page-error', page, results, notifier);
		}
		callback(null, results);
	};

	validator.validate = self.validate;
	
	self.validateRule = function (rule, response, notifier){
		
		if (typeof self.handlers[rule.type] == "undefined") {
			self.handlers[rule.type] = require('../lib/validators/' + rule.type);
		}
		
		var handler = self.handlers[rule.type];
		var result = handler.handle(rule, response);
		
		if (!result.pass) {
			self.emit('rule-error', result, notifier);
			//console.log(result);
		}
		return result;
	};
	//validator.validate = self.validateRule;	
};

util.inherits(validator, events.EventEmitter);

module.exports = validator;