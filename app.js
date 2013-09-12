/* (1) APP SETUP */

	// init module usage
	var fs = require('fs')
	var http = require('http')
	var https = require('https')
	var privateKey  = fs.readFileSync('key.pem')
	var certificate = fs.readFileSync('cert.pem')
	var credentials = {key: privateKey, cert: certificate}
	var express = require('express')
	var stylus = require('stylus')
	var nib = require('nib')
	var check = require('validator').check,
		sanitize = require('validator').sanitize
	var exec = require('child_process').exec

	// init servers to be used
	var httpServer
	var httpsServer

	// redirect all http traffic to https 
	var app_http = express()
	app_http.get('*', function(req, res){
		res.redirect('https://startupcloud.org'+req.url)
	})
	var httpServer = http.createServer(app_http)

	// init db and app
	var app = express()
	var httpsServer = https.createServer(credentials, app)

	// init session
	app.use(express.cookieParser('secret'))
	app.use(express.cookieSession())

/* (2) FRONT END CONFIGURATIONS */

	// init jade compiler
	function compile(str, path) {
		return stylus(str)
		.set('filename', path)
		.use(nib())
	}

	// init views
	app.set('views', __dirname + '/views')
	app.set('view engine', 'jade')
	app.use(express.logger('dev'))
	app.use(stylus.middleware({ 
		src: __dirname + 'public',
		compile: compile
	}))
	app.configure('development', function(){
		app.use(express.errorHandler())
		app.locals.pretty = true
	})

	// init static public directory
	app.use(express.static(__dirname + '/public'))

/* (3) REQUESTS */
	
	require("./server/pages")(app)
	require("./server/apis")(app)

/* (4) SERVER LISTENING */

	// listen on port
	httpServer.listen(3000)
	httpsServer.listen(8443)

