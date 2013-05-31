var os = require('os');

console.log(os.uptime());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.EOL);
console.log("---------------");
console.log("Memory Utilization %d%", ((os.totalmem() - os.freemem()) * 100) / os.totalmem());
console.log("---------------");
console.log(os.loadavg());