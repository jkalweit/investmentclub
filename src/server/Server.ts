/// <reference path='./typings/tsd.d.ts' />

import express = require('express');
import http = require('http');
import path = require('path');
import bodyParser = require('body-parser');
import socketio = require('socket.io');

import Sync = require('./SyncNodeServer');

var app = express();
var server = http.createServer(app);


app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var io = socketio(server);

var defaultData = {
		}


var syncServer = new Sync.SyncNodeServer('data', io, defaultData);

app.use('/', express.static(path.join(__dirname, '../client/')));
app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));

console.log('path', path.join(__dirname, '../client/'));

var port = process.env.PORT || 1337;
server.listen(port, function() {
console.log('Express is listening on %s:%s', server.address().address, server.address().port);
});
