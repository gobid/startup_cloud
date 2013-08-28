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
	var mongoose = require('mongoose')
		mongoose.connect('mongodb://govinda:mongo8424@paulo.mongohq.com:10061/startup_cloud')

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

/* (3) DATABASE MODELS */
	
	// init mongoose models 
	var User = mongoose.model('User', { 
		fname: String, 
		lname: String, 
		fbid: String, 
		extra_fb_info: Object,
		companies_started: [],
		investments: [],
		equity_partnerships: [],
		resume_pdfs: [],
		payment_info: Object 
	}) // shortcuts for f/lname, fbid
	var Company = mongoose.model('Company', {
		user: String,
		picture: Object,
		name: String,
		slogan: String,
		description: String,
		website: String,
		fb_page: String,
		twitter: String,
		blog: String,
		category: String,
		phone: String,
		email: String,
		founded: String,
		address: String,
		city: String,
		state: String,
		country: String,
		zip: String,
		video: String,
		products: [],
		team: [],
		investors: [],
		finances: Object
	})

/* (4) PAGE REQUESTS */

	// render pages
	app.get('/', function(req, res){
		if (req.session.at == null) {
			console.log('at null -> going to login')
			console.log('req', req.session)
			res.render('index', {title: 'Startup Cloud'})
		}
		else {
			console.log('at not null')
			console.log('req', req.session)
			res.render('entrepreneur/company', {title: 'Startup Cloud', user: req.session.user})
		}
	})
	app.get('/entrepreneur/company', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('entrepreneur/company', {title: "Entrepreuneur's Desk: Company", user: req.session.user})
	})
	app.get('/entrepreneur/company/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/company', {title: "Entrepreuneur's Desk: Company", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/product/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/product', {title: "Entrepreuneur's Desk: Product", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/team/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/team', {title: "Entrepreuneur's Desk: Team", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/investors/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/investors', {title: "Entrepreuneur's Desk: Investors", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/finances/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/finances', {title: "Entrepreuneur's Desk: Finances", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/social_outreach/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/social_outreach', {title: "Entrepreuneur's Desk: Social Outreach", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/related_companies/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/related_companies', {title: "Entrepreuneur's Desk: Related Companies", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/equity_valuation/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/equity_valuation', {title: "Entrepreuneur's Desk: Equity and Valuation", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/entrepreneur/projected_growth/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/projected_growth', {title: "Entrepreuneur's Desk: Projected Growth", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})
	app.get('/investor/my_equity', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('investor/my_equity', {title: "Investor's Desk: My Equity", user: req.session.user})
	})
	app.get('/investor/research', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('investor/research', {title: "Investor's Desk: Research", user: req.session.user})
	})
	app.get('/equity_partner/my_companies', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('equity_partner/my_companies', {title: "Equity Partner's Desk: My Companies", user: req.session.user})
	})
	app.get('/profile', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('profile', {title: "Profile" })
	})
	app.get('/logout', function(req, res){
		req.session.at = null
		req.session.user = null
		res.redirect('/')
		/* note logout button when implemented must use: FB.logout(function(response) { // Person is now logged out });
		   remember to warn the user that By facebook policy they will also be logged out of facebook */
	})

	// api calls
	app.get('/access_token/:at', function(req, res){
		req.session.at = req.params['at']
		if (req.session.at != null) {
			var fb_request = {
				host: 'graph.facebook.com',
				port: 443, // because https
				path: '/me?access_token=' + req.session.at,
				method: 'GET'
			}
			// console.log('fb request', fb_request)
			https.get(fb_request, function(resp){
				var data = ''
				resp.on('data', function(chunk){
					data += chunk
				})
				resp.on('end', function(){
					var user = JSON.parse(data)
					var fbid = user.id
					var fname = user.first_name
					var lname = user.last_name
					// implement simple login to app
					User.find({fbid: fbid}, function(err, result){
						if (err) console.log('Mongoose error when finding user.')
						if (result.length == 0) { // new user case
							var new_user = new User({
								fname: fname, 
								lname: lname, 
								fbid: fbid, 
								extra_fb_info: user, 
								companies_started: [],
								investments: [],
								equity_partnerships: [],
								resume_pdfs: [],
								payment_info: Object 
							})
							new_user.save(function(err) {
								if (err) return console.log("Problem saving a new User.")
								else {
									req.session.user = {_id: new_user._id, fname: fname, lname: lname, fbid: fbid, companies_started: []}
									console.log("Successfully saved and logged in a new user: ", req.session.user)
									res.send('at-received')
								}
							})
						}
						else { // returning user case
							var returning_user = result[0]
							User.update({_id: returning_user._id}, {fname: fname, lname: lname, extra_fb_info: user}, function(err){
								if (err) return console.log("Error updating returning user information.")
								req.session.user = {_id: returning_user._id, fname: fname, lname: lname, fbid: fbid, companies_started: returning_user.companies_started}
								console.log('Successfully updated and logged in returning user:', req.session.user)
								res.send('at-received')
							}) // update all fb info that isn't an ID
						}

					})
				})
			}).on("error", function(e){
				console.log("When making fb request, got error: " + e.message)
			})
		}
		else console.log("AT null. User should not still be on the home page if they are connected.")
	})
	app.get('/create_company/:name/:slogan/:description/:website/:facebook/:twitter/:blog/:category/:phone/:email/:founded/:address/:city/:state/:country/:zip/:video', function(req, res){
		if (req.session.user != null) {
			var new_company = new Company({
				user: req.session.user._id,
				picture: null,
				name: req.params['name'].trim(),
				slogan: req.params['slogan'].trim(),
				description: req.params['description'].trim(),
				website: req.params['website'].trim(),
				fb_page: req.params['facebook'].trim(),
				twitter: req.params['twitter'].trim(),
				blog: req.params['blog'].trim(),
				category: req.params['category'].trim(),
				phone: req.params['phone'].trim(),
				email: req.params['email'].trim(),
				founded: req.params['founded'].trim(),
				address: req.params['address'].trim(),
				city: req.params['city'].trim(),
				state: req.params['state'].trim(),
				country: req.params['country'].trim(),
				zip: req.params['zip'].trim(),
				video: req.params['video'].trim(),
				products: [],
				team: [],
				investors: [],
				finances: null
			})
			new_company.save(function(err) {
				if (err) return console.log("Problem saving a new Company.")
				else return console.log("Successfully saved new company: ", new_company)
			}) /* lesson - dont put res.send's in mongoose calls because it will cause a 502 or 504 */
			console.log('curr user', req.session.user)
			User.findById(req.session.user._id, function(err, result){
				if (err) return console.log("Problem finding current user.")
				else {
					current_companies = []
					if (result != undefined) current_companies = result.companies_started
					current_companies.push({id: new_company._id, name: new_company.name})
					User.update({_id: req.session.user._id}, {companies_started: current_companies}, function(err){
						if (err) return console.log("Problem finding current user.")
						else return console.log("Updated user with new company")
					})
				}
			})		
			req.session.user.companies_started.push({id: new_company._id, name: new_company.name})// add new company to session list	
			res.send('new company entered in database')
		}
		else res.redirect('/')
	})
	app.get('/save_company_record/:company_id/:record_name/:record_index/:record_value/', function(req, res){
		if (req.session.user != null) {
			if (req.params['record_name'] == 'name') 
				Company.update({_id: req.params['company_id']}, {name: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'slogan')
				Company.update({_id: req.params['company_id']}, {slogan: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'description')
				Company.update({_id: req.params['company_id']}, {description: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'website')
				Company.update({_id: req.params['company_id']}, {website: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'fb_page')
				Company.update({_id: req.params['company_id']}, {fb_page: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'twitter')
				Company.update({_id: req.params['company_id']}, {twitter: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'blog')
				Company.update({_id: req.params['company_id']}, {blog: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'category')
				Company.update({_id: req.params['company_id']}, {category: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'phone')
				Company.update({_id: req.params['company_id']}, {phone: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'email')
				Company.update({_id: req.params['company_id']}, {email: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'founded')
				Company.update({_id: req.params['company_id']}, {founded: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'address')
				Company.update({_id: req.params['company_id']}, {address: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'city')
				Company.update({_id: req.params['company_id']}, {address: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'state')
				Company.update({_id: req.params['company_id']}, {state: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'country')
				Company.update({_id: req.params['company_id']}, {country: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'zip')
				Company.update({_id: req.params['company_id']}, {zip: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'video')
				Company.update({_id: req.params['company_id']}, {video: req.params['record_value'].trim()}, function(err) {
					if (err) return console.log("Problem finding company.")
					else return console.log("Updated company with new value")
				})
			else if (req.params['record_name'] == 'product_image') {}
			else if (req.params['record_name'] == 'product_name') {
				Company.findById(req.params['company_id'], function(err, result){
					if (err) console.log('Could not find company to update.')
					var company = result
					var index = req.params['record_index']
					if (index < company.products.length) company.products[index].name = req.params['record_value'].trim() // just update the name case
					else company.products.push({name: req.params['product_name'], subtitle: '', description: '', video: ''}) // add a new product struct case
					Company.update({_id: req.params['company_id']}, {products: company.products}, function(err){
						if (err) console.log('Error while updating company record.')
					}) // so in the end the products are listed in the order one types them in, not the order of the original form
				})
			}
			else if (req.params['record_name'] == 'product_subtitle') {
				Company.findById(req.params['company_id'], function(err, result){
					if (err) console.log('Could not find company to update.')
					var company = result
					var index = req.params['record_index']
					if (index < company.products.length) company.products[index].subtitle = req.params['record_value'].trim() // just update the name case
					else company.products.push({name: '', subtitle: req.params['product_subtitle'], description: '', video: ''}) // add a new product struct case
					Company.update({_id: req.params['company_id']}, {products: company.products}, function(err){
						if (err) console.log('Error while updating company record.')
					}) // so in the end the products are listed in the order one types them in, not the order of the original form
				})
			}
			else if (req.params['record_name'] == 'product_description') {
				Company.findById(req.params['company_id'], function(err, result){
					if (err) console.log('Could not find company to update.')
					var company = result
					var index = req.params['record_index']
					if (index < company.products.length) company.products[index].description = req.params['record_value'].trim() // just update the name case
					else company.products.push({name: '', subtitle: '', description: req.params['product_description'], video: ''}) // add a new product struct case
					Company.update({_id: req.params['company_id']}, {products: company.products}, function(err){
						if (err) console.log('Error while updating company record.')
					}) // so in the end the products are listed in the order one types them in, not the order of the original form
				})
			}
			else if (req.params['record_name'] == 'product_video') {
				Company.findById(req.params['company_id'], function(err, result){
					if (err) console.log('Could not find company to update.')
					var company = result
					var index = req.params['record_index']
					if (index < company.products.length) company.products[index].video = req.params['record_value'].trim() // just update the name case
					else company.products.push({name: '', subtitle: '', description: '', video: req.params['product_video']}) // add a new product struct case
					Company.update({_id: req.params['company_id']}, {products: company.products}, function(err){
						if (err) console.log('Error while updating company record.')
					}) // so in the end the products are listed in the order one types them in, not the order of the original form
				})
			}
			res.send('updating-db')
		}
		else res.redirect('/')
	})

/* (5) SERVER LISTENING */

	// listen on port
	httpServer.listen(3000)
	httpsServer.listen(8443)