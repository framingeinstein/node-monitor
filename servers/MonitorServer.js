
var settings = require("../configuration/settings"),
	email = require("emailjs"),
	http = require('http'),
	url = require('url'),
	Validator = require('../lib/validator'),
	MongoProvider = require('mongo-provider').MongoProvider,
	validator = new Validator(),
	rules = require("../configuration/rules"),
	MonitorTask = require("../lib/monitor"),
	Notifier = require("../lib/notifier");

var provider = new MongoProvider('localhost', 27017, 'monitor', 'result');

validator.on("page-error", function (page, results, notifier) {
	//notifier.notify();
	//console.log(results);
});
validator.on("rule-error", function (rule, notifier) {
	notifier.notify(rule);
	//console.log(results);
});
for (var i = 0; i < rules.sites.length; i++){
	var site = rules.sites[i];
	var notifier = new Notifier();
	if (typeof rules.notifications !== "undefined") notifier.push(rules.notifications);
	if (typeof site.notifications !== "undefined") notifier.push(site.notifications);
	//console.log(notifier.retrieve());
	var pages = site.pages;
	//console.log(site);
	for (var j = 0; j < pages.length; j++) {
		var page = pages[j];
		
		var task = new MonitorTask(site, page);
		
		task.on("result", function (page, result) {
			validator.validate(page, result, notifier, function (err, results) {
				if (err) console.log(err);
				//console.log(result);
				provider.save(results, function (err, result) {
					//callback(err, results);
				});
			});
		});
		
		task.on("error", function (err) {
			console.log(err);
		});

	}

}

