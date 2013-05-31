var cheerio = require('cheerio');
var _ = require('underscore');

var handler = {};

handler.handle = function (rule, response) {
	var $ = cheerio.load(response.text);
	//console.log($(rule.selector).text());
	
	//console.log("dom");
	//console.log(rule);
	var result = _.extend({}, rule);
	
	result.value = $(rule.selector).text().trim();
	
	if(result.expectation instanceof RegExp){
		result.pass = result.expectation.test(result.value);
	} else {
		result.pass = result.value === result.expectation;
	}
	
	return result;
	
}


module.exports = handler;
