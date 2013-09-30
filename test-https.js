/* (1) APP SETUP */

	// init module usage
	var fs = require('fs')
	var http = require('http')
	var https = require('https')
	var privateKey  = fs.readFileSync('key.pem')
	var certificate = fs.readFileSync('cert.pem')
	var credentials = {key: privateKey, cert: certificate}
	var express = require('express')
	var httpsServer
	var app = express()

/* (3) REQUESTS */
	
	app.get('/test/:url/:url2', function(req, res){
		res.send('url: ' + req.params['url'] + ' url2: ' + req.params['url2'])
	})

/* (4) SERVER LISTENING */

	// listen on port
	var httpsServer = https.createServer(credentials, app)
	httpsServer.listen(8443)

