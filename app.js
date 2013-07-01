// init module usage
var express = require('express')
var stylus = require('stylus')
var nib = require('nib')
var check = require('validator').check,
    sanitize = require('validator').sanitize

// init db and app
var app = express()

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

// render pages
 app.get('/', function(req, res){
 res.render('index', {title: 'Startup Cloud'})
})

// listen on port
app.listen(7777)