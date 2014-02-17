var _ = require('underscore');
var handler = {};

handler.handle = function (rule, response) {
	//var $ = cheerio.load(response.text);
	//console.log($(rule.selector).text());
	
	
	
	var result = _.extend({}, rule);


	//console.log(response);
	result.value = response.statusCode;
	result.pass = result.value === result.expectation;
	

	
	return result; 
	
}


module.exports = handler;