
//net-watcher-ldj-client.js 
/* Note that this is similar to net-watcher-json-client.js
*One major difference is that instead of sending
data buffers directly to JSON.parse(), we rely
on the ldj module ot produce message events.
*/
"use strict";
const
	net = require('net'),
	ldj = require('./ldj.js'),
	netClient = net.connect({port: 5432}),
	ldjClient = ldj.connect(netClient);

ldjClient.on('message', function(message){
	if (message.type ==='watching'){
		console.log("Now watching: " + message.file);
	} else if(message.type ==='changed'){
		console.log(
			"File '" + message.file + "' changed at " + new Date(message.timestamp)
		);
	} else {
		throw Error("Unrecognized message type: " + message.type);
	}
});
