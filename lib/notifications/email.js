var  util = require('util');
var settings = require("../../configuration/settings");
var emailjs = require("emailjs");
var events = require('events');
var _ = require('underscore');

var email = function () {
	events.EventEmitter.call(this);	
	var self = this;
	self.defaults = {
		 to: ""
		,text: ""
		,cc: ""
		,subject: ""
		,from: settings.mail.smtp.user
	};
	
	self.server  = emailjs.server.connect({
	   user:		settings.mail.smtp.user, 
	   password:	settings.mail.smtp.password, 
	   host:		settings.mail.smtp.host, 
	   ssl:			settings.mail.smtp.ssl
	});

	self.send = function (options) {
		//console.log("sending");
		var message = _.extend({}, self.defaults, options);
		//console.log(message);
		self.server.send({
		   text:    message.text, 
		   from:    message.from,
		   to:      message.to,
		   cc:      message.cc,
		   subject: message.subject
		}, function(err, message) { 
			console.log(err || message); 
		});
	};
	
	email.send = self.send;
};

util.inherits(email, events.EventEmitter);


module.exports = email;


	
	
