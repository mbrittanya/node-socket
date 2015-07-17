/*This short program uses net.connect() to create a 
client connection to localhost port 5432, then waits for 
data. The client object is a Socket, jsut like the 
incoming connection we saw on teh server side.
* Whenever a data event happens, our callback function 
takes the incoming buffer object, parses the JSON message, 
and then logs an appropriate message to the console.
*/
"use strict"
const
	net = require('net'),
	client = net.connect({port:5432});
	client.on('data', function(data){
		let message = JSON.parse(data);
		if(message.type === 'watching'){
			console.log("Now watching: " + message.file);
		} else if (message.type === 'changed') {
			let date = new Date(message.timestamp);
			console.log("File '" + message.file + "' changed at " + date);
		} else {
			throw Error("Unrecognized message type: " + message.type);
		}
	});