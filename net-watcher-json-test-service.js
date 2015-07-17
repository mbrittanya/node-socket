/*Rather than setup a file-system 
watcher we just return the first
predetermined chunk immediately
* Setup a timer
after a or
*When teh
clearTime
*/
"use strict";
const
  fs = require('fs'),
  net = require('net'),
  filename = process.argv[2],
  server = net.createServer(function(connection){
    console.log('Subscriber connected');

    connection.write('{"type":"changed","file":"targ')

    let timer = setTimeout(function(){
      connection.write('et.txt","timestamp":1358175758495}'+"\n");
      connection.end(); //conversation over
    }, 1000); //after a second

    connection.on('end',function(){
      clearTimeout(timer);
      console.log('Subscriber disconnected');
    });
  });

  if(!filename){
    throw Error('No target filename was specified.');
  }

  server.listen(5432, function(){
    console.log('Listening for subsrcibers...');
  });
