/* (1) APP SETUP */

	var configurations = require("./configurations")

	// init module usage
	var fs = require('fs')
	var http = require('http')
	var https = require('https')
	var privateKey  = fs.readFileSync('startupcloud_org.key')
	var certificate = fs.readFileSync('startupcloud_org.crt')
	var credentials = {key: privateKey, cert: certificate}
	var express = require('express')
	var stylus = require('stylus')
	var nib = require('nib')
	var check = require('validator').check,
		sanitize = require('validator').sanitize

	// init servers to be used
	var httpServer
	var httpsServer

	// redirect all http traffic to https 
	var app_http = express()
	
	app_http.get('*', function(req, res){
		res.redirect(configurations.site_name+req.url) 
	})

	// init app
	var app = express()

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
	var httpServer = http.createServer(app_http)
	var httpsServer = https.createServer(credentials, app)
	httpServer.listen(3000)
	httpsServer.listen(8443)

