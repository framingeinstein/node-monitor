var items = [1,2,3,4,5,6,7,8,9];
function loop(rule) {
	//console.log(rule.name);
	items.forEach(function (val, i, a) {
		console.log(rule.name);		
	});
}
	
var rule = {
	 name: "Name"
	,value: "dom"
}

loop(rule);