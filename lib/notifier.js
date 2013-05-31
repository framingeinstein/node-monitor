var util = require('util');
var events = require('events');
var assert = require('assert');
var _ = require('underscore');



var notifier = function () {
	events.EventEmitter.call(this);
	var self = this;
	self.notifications = [];
	self.handlers = {};
	
	self.push = function (notifications) {
		//console.log(notifications instanceof Array);
		if (notifications instanceof Array) {
			notifications.forEach(function (notification, index, array) {
				self.notifications.push(notification);
			});
		} else {
			self.notifications.push(notifications);
		}
		
		
	};

	notifier.push = self.push;
	
	self.retrieve = function (items) {
		return self.notifications;
	};
	
	notifier.retrieve = self.retrieve;

	self.notify = function (rule) {
		
		self.notifications.forEach(function (notification, index, notifications) {
			var matcher = new RegExp(notification.rule);
			if (matcher.test(rule.name)) {
				if (typeof self.handlers[notification.type] === "undefined") {
					var Handler = require('./notifications/' + notification.type);
					self.handlers[notification.type] = new Handler();
				}
				var handler = self.handlers[notification.type];
				var message = {
					 text: "Error for rule " + rule.name + ". Expectation: " + rule.expectation + ", Value: " + rule.value
					,to: notification.to
					,subject: rule.name + " : " + rule.expectation + "... FAILED"
				};
				handler.send(message);
			}
		});
	};
	
	notifier.notify = self.notify;
};


util.inherits(notifier, events.EventEmitter);



module.exports = notifier;

//rule1 = {site: "*", rule: "*", type: "email", to: "jason@framingeinstein.com", pass: false};
//rule2 = {site: "*", rule: "*", type: "email", to: "jason@framingeinstein.com", pass: false};
//assert.deepEqual(rule1, rule2);
//console.log(rule1 === rule2);
//console.log(_.isEqual(rule1, rule2));

//var defaults = {valueA: "default A", valueB: "default B", valueC: "default C"};
//var options = {valueA: "set A", valueC: "set C"};

//var props = new Properties(defaults, options);
//var props = _.extend({}, defaults, options);
//console.log(props);



/*
server.send({
   text:    "i hope this works", 
   from:    "Jason Morgan <monitor@framingeinstein.com>", 
   to:      "jason@framingeinstein.com",
   cc:      "",
   subject: "testing emailjs"
}, function(err, message) { 
	console.log(err || message); 
});
*/
