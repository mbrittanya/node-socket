//ldj.js
/* The goal is to take the incoming raw data from
the stream and convert it into message events 
containing 
*/
"use strict";
const
	events = require('events'),
	util = require('util'),
LDJClient = function(stream){
	events.EventEmitter.call(this);// this is the context
	let
		self = this,
		buffer = '';
	stream.on('data', function(data){
		buffer += data;
		let boundary = buffer.indexOf('\n');
		while(boundary !== -1){
			let input = buffer.substr(0, boundary);
			buffer = buffer.substr(boundary + 1);
			self.emit('message', JSON.parse(input));
			boundary = buffer.indexOf('\n');
		}
	});
};

util.inherits(LDJClient, events.EventEmitter);

exports.LDJClient = LDJClient;
exports.connect = function(stream){
	return new LDJClient(stream);
};
//exports is what the file does
// exports.LDJClient is creating the LDJClient variable