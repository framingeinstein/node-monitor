var os = require('os');
var dns = require('dns');

console.log(os.uptime());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.EOL);
console.log("---------------");
console.log("Memory Utilization %d%", ((os.totalmem() - os.freemem()) * 100) / os.totalmem());
console.log("---------------");
console.log(os.loadavg());


/*Would use this to allow for site ownership verification alla google*/
dns.resolveTxt("jasonmorgandevelopment.com", function (err, domains) {
	if (err) {
		console.log(err);
		throw err;
	}
	
	console.log(domains);
});