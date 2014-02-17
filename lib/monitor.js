var util = require('util'),
    events = require('events'),
    timers = require('timers'),
	http = require('http'),
	url = require('url');



var MonitorTask = function(site, page){
	events.EventEmitter.call(this);
	var self = this;
	
	self.page = page;
	self.status = null;
	
	self.url = url.parse(url.format({
		protocol: page.protocol,
		hostname: site.host,
		pathname: page.path,
		method: page.method,
		query: page.parameters
	}));
	
	//console.log(page);
	self.IntervalID = null;
	
	
	self.run = function () {
		
		if (self.status !== "running") {
			self.status = "running";
			
		    var req = http.request(self.url, function (res) {
		        /* Task is done, so set status to reflect that it's been scheduled
		         * for its next run. */
				var data = [];
				res
					.on('data', function(chunk) { data.push(chunk); })
					.on('end', function () {
						var result = data.join('').trim();
						res.text = result;
						//console.log(self.IntervalID);
						//console.log(site.host);
						//console.log(res);
						self.status = "scheduled";
						self.emit('result', self.page, res);
					});
				
				self.IntervalID = setTimeout(self.run, self.page.interval * 1000);

			});
		    /* Must call end() to fire off the request */
			req.end();
		} else {
			self.emit('error', new Error("Task is currently running."));
		}
		
	};
	
	
	self.run();
	
};

util.inherits(MonitorTask, events.EventEmitter);

var Monitor = function (rules) {
	
}



module.exports = MonitorTask;