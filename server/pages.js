var configurations = require("./../configurations")

var docs = require('./documents'), User = docs.User, Company = docs.Company, Contract = docs.Contract

module.exports = function(app) {

	/* */

	app.get('/', function(req, res){
		if (req.session.at == null) {
			console.log('at null -> going to login')
			console.log('req', req.session)
			res.render('index', {title: 'Startup Cloud', fbapp: configurations.fbapp})
		}
		else {
			console.log('at not null')
			console.log('req', req.session)
			res.render('entrepreneur/company', {title: 'Startup Cloud', user: req.session.user})
		}
	})

	/* */

	app.get('/entrepreneur/company', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else res.render('entrepreneur/company', {title: "Entrepreuneur's Desk: Company", user: req.session.user})
	})

	/* */

	app.get('/entrepreneur/company/:id', function test(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/company', {title: "Entrepreuneur's Desk: Company", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/product/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/product', {title: "Entrepreuneur's Desk: Product", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/team/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/team', {title: "Entrepreuneur's Desk: Team", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/investors/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/investors', {title: "Entrepreuneur's Desk: Investors", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/finances/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/finances', {title: "Entrepreuneur's Desk: Finances", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/social_outreach/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/social_outreach', {title: "Entrepreuneur's Desk: Social Outreach", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/related_companies/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/related_companies', {title: "Entrepreuneur's Desk: Related Companies", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/entrepreneur/equity_valuation/:id', function(req, res){
		if (req.session.user == null) res.redirect('/')
		Company.findById(req.params['id'], function(err, result){
			if (result != null) res.render('entrepreneur/equity_valuation', {title: "Entrepreuneur's Desk: Equity and Valuation", company: result, user: req.session.user})
			else res.redirect('/')
		})
	})

	/* */

	app.get('/investor/my_equity', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else {
			User.findById(req.session.user._id, function(err, user) {
				if (err) console.log('Error while finding user.')
				if (user != null && user != undefined) 
					res.render('investor/my_equity', {title: "Investor's Desk: My Equity", user: user})
				else
					return console.log('Problem finding user.')
			})	
		} 
	})

	/* */

	app.get('/equity_partner/my_companies', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else { 
			User.findById(req.session.user._id, function(err, user) {
				if (err) console.log('Error while finding user.')
				if (user != null && user != undefined) 
					res.render('equity_partner/my_companies', {title: "Equity Partner's Desk: My Companies", user: user})
				else
					return console.log('Problem finding user.')
			})			
		}
	})

	/* */

	app.get('/profile', function(req, res){
		if (req.session.user == null) res.redirect('/')
		else { 
			User.findById(req.session.user._id, function(err, user) {
				if (err) console.log('Error while finding user.')
				if (user != null && user != undefined) 
					res.render('profile', {title: "Profile", user: user, public_user: user})
				else
					return console.log('Problem finding user.')
			})			
		}
	})

	/* */

	app.get('/profile/:user_id', function(req, res){ // public profile
		User.findById(req.params['user_id'], function(err, public_user) {
			if (err) console.log('Error while finding user.')
			if (public_user != null && public_user != undefined) 
				res.render('profile', {title: "Profile", user: req.session.user, public_user: public_user})
			else return console.log('Problem finding user.')
		})		
	})

	/* */

	app.get('/company/:company_id', function(req, res){
		Company.findById(req.params['company_id'], function(err, public_company) {
			if (err) console.log('Error while finding company.')
			if (public_company != null && public_company != undefined)
				res.render('company', {title: "Company Profile", user: req.session.user, public_company: public_company})
			else return console.log('Problem finding company.')
		})
	})

	/* */

	app.get('/logout', function(req, res){
		req.session.at = null
		req.session.user = null
		res.redirect('/')
	})

}