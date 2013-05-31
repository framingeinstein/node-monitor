var handler = {};

handler.handle = function (rule, response) {
	//var $ = cheerio.load(response.text);
	//console.log($(rule.selector).text());
	
	
	
	var result = {};
	
	for(var k in rule) result[k]=rule[k];
	//console.log(response);
	result.value = response.statusCode;
	result.pass = result.value === result.expectation;
	
	return result; 
	
}


module.exports = handler;