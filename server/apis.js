var docs = require('./documents'), User = docs.User, Company = docs.Company, Contract = docs.Contract
var exec = require('child_process').exec
var http = require('http')
var https = require('https')

module.exports = function(app) {

	/* */

	app.get('/access_token/:at', function(req, res){
		req.session.at = unescape(req.params['at'])
		if (req.session.at != null) {
			var fb_request = {
				host: 'graph.facebook.com',
				port: 443, // because https
				path: '/me?access_token=' + req.session.at,
				method: 'GET'
			}
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
						console.log('here')
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

	/* */

	app.get('/create_company/:name/:slogan/:description/:website/:facebook/:twitter/:blog/:category/:phone/:email/:founded/:address/:city/:state/:country/:zip/:video', function(req, res){
		console.log(req.params['name'])
		if (req.session.user != null) {
			var new_company = new Company({
				user: req.session.user._id,
				picture: null,
				name: unescape(req.params['name']).trim(),
				slogan: unescape(req.params['slogan']).trim(),
				description: unescape(req.params['description']).trim(),
				website: unescape(req.params['website']).trim(),
				fb_page: unescape(req.params['facebook']).trim(),
				twitter: unescape(req.params['twitter']).trim(),
				blog: unescape(req.params['blog']).trim(),
				category: unescape(req.params['category']).trim(),
				phone: unescape(req.params['phone']).trim(),
				email: unescape(req.params['email']).trim(),
				founded: unescape(req.params['founded']).trim(),
				address: unescape(req.params['address']).trim(),
				city: unescape(req.params['city']).trim(),
				state: unescape(req.params['state']).trim(),
				country: unescape(req.params['country']).trim(),
				zip: unescape(req.params['zip']).trim(),
				video: unescape(req.params['video']).trim(),
				products: [],
				team: [],
				investors: [],
				cash: '', 
				accounts_rec: '', 
				inventories: '', 
				prepaid_expenses: '', 
				prop_plant_equip: '', 
				intangible: '', 
				financial_assets: '', 
				equity_method: '', 
				biological: '', 
				accounts_payable: '', 
				provisions: '', 
				financial_liab: '', 
				deferred_tax_liab_assets: '', 
				unearned_rev: ''
			})
			new_company.save(function(err) {
				if (err) return console.log("Problem saving a new Company.")
				else return console.log("Successfully saved new company: ", new_company)
			}) /* lesson - dont put res.send's in mongoose calls because it will cause a 502 or 504 */
			User.findById(req.session.user._id, function(err, result){
				if (err) return console.log("Problem finding current user.")
				else {
					current_companies = []
					if (result != undefined) current_companies = result.companies_started
					current_companies.push({id: new_company._id, name: new_company.name})
					User.update({_id: req.session.user._id}, {companies_started: current_companies}, function(err){
						if (err) console.log("Problem finding current user.")
						else console.log("Updated user with new company")
						req.session.user.companies_started.push({id: new_company._id, name: new_company.name})// add new company to session list	
						res.json({company_id: new_company._id})
					})
				}
			})		
		}
		else res.redirect('/')
	})

	/* */

	app.get('/save_company_record/:company_id/:record_name/:record_index/:record_value/', function(req, res){
		var permissions = false
		if (req.session.user != null) {
			User.findById(req.session.user._id, function(err, result){
				if (err) console.log("Problem finding user")
				for (index in result.companies_started){
					if (result.companies_started[index].id == unescape(req.params['company_id'])) {
						permissions = true
						break
					}
				}
				if (permissions) {
					switch(unescape(req.params['record_name'])) {
						case 'name': 
							Company.update({_id: unescape(req.params['company_id'])}, {name: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'slogan':
							Company.update({_id: unescape(req.params['company_id'])}, {slogan: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'description':
							Company.update({_id: unescape(req.params['company_id'])}, {description: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'website':
							Company.update({_id: unescape(req.params['company_id'])}, {website: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'fb_page':
							Company.update({_id: unescape(req.params['company_id'])}, {fb_page: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'twitter':
							Company.update({_id: unescape(req.params['company_id'])}, {twitter: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'blog':
							Company.update({_id: unescape(req.params['company_id'])}, {blog: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'category':
							Company.update({_id: unescape(req.params['company_id'])}, {category: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'phone':
							Company.update({_id: unescape(req.params['company_id'])}, {phone: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'email':
							Company.update({_id: unescape(req.params['company_id'])}, {email: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'founded':
							Company.update({_id: unescape(req.params['company_id'])}, {founded: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'address':
							Company.update({_id: unescape(req.params['company_id'])}, {address: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'city':
							Company.update({_id: unescape(req.params['company_id'])}, {city: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'state':
							Company.update({_id: unescape(req.params['company_id'])}, {state: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'country':
							Company.update({_id: unescape(req.params['company_id'])}, {country: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'zip':
							Company.update({_id: unescape(req.params['company_id'])}, {zip: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'video':
							Company.update({_id: unescape(req.params['company_id'])}, {video: unescape(req.params['record_value']).trim()}, function(err) {
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'product_image':
							break
						case 'product_name':
							Company.findById(unescape(req.params['company_id']), function(err, result){
								if (err) console.log('Could not find company to update.')
								var company = result
								var index = unescape(req.params['record_index'])
								if (index < company.products.length) company.products[index].name = unescape(req.params['record_value']).trim() // just update the name case
								else company.products.push({name: unescape(req.params['record_value']).trim(), subtitle: '', description: '', video: ''}) // add a new product struct case
								Company.update({_id: unescape(req.params['company_id'])}, {products: company.products}, function(err){
									if (err) console.log('Error while updating company record.')
								}) // so in the end the products are listed in the order one types them in, not the order of the original form
							})
							break
						case 'product_subtitle':
							Company.findById(unescape(req.params['company_id']), function(err, result){
								if (err) console.log('Could not find company to update.')
								var company = result
								var index = unescape(req.params['record_index'])
								if (index < company.products.length) company.products[index].subtitle = unescape(req.params['record_value']).trim() // just update the name case
								else company.products.push({name: '', subtitle: unescape(req.params['record_value']).trim(), description: '', video: ''}) // add a new product struct case
								Company.update({_id: unescape(req.params['company_id'])}, {products: company.products}, function(err){
									if (err) console.log('Error while updating company record.')
								}) // so in the end the products are listed in the order one types them in, not the order of the original form
							})
							break
						case 'product_description':
							Company.findById(unescape(req.params['company_id']), function(err, result){
								if (err) console.log('Could not find company to update.')
								var company = result
								var index = unescape(req.params['record_index'])
								if (index < company.products.length) company.products[index].description = unescape(req.params['record_value']).trim() // just update the name case
								else company.products.push({name: '', subtitle: '', description: unescape(req.params['record_value']).trim(), video: ''}) // add a new product struct case
								Company.update({_id: unescape(req.params['company_id'])}, {products: company.products}, function(err){
									if (err) console.log('Error while updating company record.')
								}) // so in the end the products are listed in the order one types them in, not the order of the original form
							})
							break
						case 'product_video':
							Company.findById(unescape(req.params['company_id']), function(err, result){
								if (err) console.log('Could not find company to update.')
								var company = result
								var index = unescape(req.params['record_index'])
								if (index < company.products.length) company.products[index].video = unescape(req.params['record_value']).trim() // just update the name case
								else company.products.push({name: '', subtitle: '', description: '', video: unescape(req.params['record_value']).trim()}) // add a new product struct case
								Company.update({_id: unescape(req.params['company_id'])}, {products: company.products}, function(err){
									if (err) console.log('Error while updating company record.')
								}) // so in the end the products are listed in the order one types them in, not the order of the original form
							})
							break
					}			
				}
				else console.log('no-permissions')
			})
			res.send('updating-db')
		}
		else res.redirect('/')
	})

	/* */

	app.get('/find_user/:name.json', function(req, res){
		if (req.session.user != null) {
			var name = unescape(req.params['name']).split(" ")
			var fname = name[0]
			var lname = (name.length > 1) ? name[name.length - 1] : ''
			User.find({fname: new RegExp(fname, 'i'), lname: new RegExp(lname, 'i')}, function(err, result){
				users = []
				for (index in result){
					users.push({value: result[index].fname + ' ' + result[index].lname, id: result[index]._id} )
				}
				res.json(users)
			})
		}
		else res.send('not-logged-in')
	})

	/* c */

	app.get('/add_pending_member/:company_id/:member_id/:job/:equity', function(req, res){
		// either the session user must own company_id or be member_id
		var permissions = false
		var company_id = unescape(req.params['company_id'])
		var member_id = unescape(req.params['member_id'])
		var job = unescape(req.params['job'])
		var equity = unescape(req.params['equity'])
		console.log('equity', equity)
		if (req.session.user._id == member_id) permissions = true
		User.findById(req.session.user._id, function(c_err, c_result){
			if (!permissions){
				if (c_err) console.log("Problem finding user")
				for (index in c_result.companies_started){
					if (c_result.companies_started[index].id == unescape(req.params['company_id'])) {
						permissions = true
						break
					}
				}
			}
			if (permissions){
				Company.findById(company_id, function(err, result){
					if (err) console.log('Could not find company to update')
					var team = result.team
					var member_seen = 0
					for (index in team){
						if (team[index].id == member_id) {
							member_seen = 1
							team[index].job = job
							team[index].equity = equity
							team[index].pending = 1
						}
					}
					if (!member_seen) team.push({id: member_id, job: job, equity: equity, pending: 1})
					Company.update({_id: company_id}, {team: team}, function(err){
						if (err) console.log('Error while updating company record.')
						res.json('updating company and member in database')
					})
				})
				User.findById(member_id, function(err, result){
					if (err) console.log('Could not find user to update')
					var equity_partnerships = result.equity_partnerships
					var partnership_seen = 0
					for (index in equity_partnerships){
						if (equity_partnerships[index].id == company_id){
							partnership_seen = 1
							equity_partnerships[index].job = job
							equity_partnerships[index].equity = equity
							equity_partnerships[index].pending = 1
						}
					}
					if (!partnership_seen) equity_partnerships.push({id: company_id, job: job, equity: equity, pending: 1})
					User.update({_id: member_id}, {equity_partnerships: equity_partnerships}, function(err){
						if (err) console.log('Error while updating user record.')
						res.json('updating company and member in database')
					})
				})
			}
			else console.log('no-permissions')
		})
	})

	/* c */ 

	app.get('/add_pending_investor/:company_id/:investor_id/:contribution/:equity', function(req, res){
		var permissions = false
		var company_id = unescape(req.params['company_id'])
		var investor_id = unescape(req.params['investor_id'])
		var contribution = unescape(req.params['contribution'])
		var equity = unescape(req.params['equity'])
		if (req.session.user._id == investor_id) permissions = true
		User.findById(req.session.user._id, function(c_err, c_result){
			if (!permissions) { // case where we have to check the session user's companies
				if (c_err) console.log("Problem finding user")
				for (index in c_result.companies_started){
					if (c_result.companies_started[index].id == unescape(req.params['company_id'])) {
						permissions = true
						break
					}
				}
			}
			if (permissions){
				Company.findById(company_id, function(err, result){
					if (err) console.log('Could not find company to update')
					var investors = result.investors
					var investor_seen = 0
					for (index in investors){
						if (investors[index].id == investor_id) {
							investor_seen = 1
							investors[index].contribution = contribution
							investors[index].equity = equity
							investors[index].pending = 1
						}
					}
					if (!investor_seen) investors.push({id: investor_id, contribution: contribution, equity: equity, pending: 1})
					Company.update({_id: company_id}, {investors: investors}, function(err){
						if (err) console.log('Error while updating company record.')
						res.json('updating company and member in database')
					})
				})
				User.findById(investor_id, function(err, result){
					if (err) console.log('Could not find user to update')
					var investments = result.investments
					var investment_seen = 0
					for (index in investments){
						if (investments[index].id == company_id){
							investment_seen = 1
							investments[index].contribution = contribution
							investments[index].equity = equity
							investments[index].pending = 1
						}
					}
					if (!investment_seen) investments.push({id: company_id, contribution: contribution, equity: equity, pending: 1})
					User.update({_id: investor_id}, {investments: investments}, function(err){
						if (err) console.log('Error while updating user record.')
						res.json('updating company and member in database')
					})
				})
			}
			else console.log('no-permissions')
		})
	})

	/* */

	app.get('/get_user_by_id/:id', function(req, res){
		var id = unescape(req.params['id'])
		User.findById(id, function(err, result){
			if (result != null && result != undefined) res.json({name: result.fname + ' ' + result.lname})
			else res.json({name: 'no-name-found'})
		})
	})

	/* */

	app.get('/find_company/:name.json', function(req, res){
		if (req.session.user != null) {
			var name = unescape(req.params['name'])
			Company.find({name: new RegExp(name, 'i')}, function(err, result){
				companies = []
				for (index in result){
					companies.push({value: result[index].name, id: result[index]._id} )
				}
				res.json(companies)
			})
		}
		else res.send('not-logged-in')
	})

	/* */

	app.get('/get_company_by_id/:id', function(req, res){
		var id = unescape(req.params['id'])
		Company.findById(id, function(err, result){
			if (result != null && result != undefined) res.json({name: result.name})
			else res.json({name: 'no-name-found'})
		})
	})

	/* c */

	app.get('/save_financial_record/:company_id/:record_name/:record_value/', function(req, res){
		var permissions = false
		var company_id = unescape(req.params['company_id'])
		User.findById(req.session.user._id, function(c_err, c_result){
			if (c_err) console.log("Problem finding user")
			for (index in c_result.companies_started){
				if (c_result.companies_started[index].id == unescape(req.params['company_id'])) {
					permissions = true
					break
				}
			}
			if (permissions){
				Company.findById(company_id, function(err, result){
					if (err) console.log('Could not find company.')
					var company = result
					if (company.finances == null) 
						company.finances = {cash: '', accounts_rec: '', inventories: '', prepaid_expenses: '', prop_plant_equip: '', intangible: '', 
											financial_assets: '', equity_method: '', biological: '', accounts_payable: '', provisions: '', 
											financial_liab: '', deferred_tax_liab_assets: '', unearned_rev: ''}
					switch(unescape(req.params['record_name'])) {
						case 'cash':
							Company.update({_id: company_id}, {cash: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'accounts_rec':
							Company.update({_id: company_id}, {accounts_rec: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'inventories':
							Company.update({_id: company_id}, {inventories: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'prepaid_expenses':
							Company.update({_id: company_id}, {prepaid_expenses: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'prop_plant_equip':
							Company.update({_id: company_id}, {prop_plant_equip: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'intangible':
							Company.update({_id: company_id}, {intangible: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'financial_assets':
							Company.update({_id: company_id}, {financial_assets: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'equity_method':
							Company.update({_id: company_id}, {equity_method: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'biological':
							Company.update({_id: company_id}, {biological: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'accounts_payable':
							Company.update({_id: company_id}, {accounts_payable: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'provisions':
							Company.update({_id: company_id}, {provisions: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'financial_liab':
							Company.update({_id: company_id}, {financial_liab: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'deferred_tax_liab_assets':
							Company.update({_id: company_id}, {deferred_tax_liab_assets: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
						case 'unearned_rev':
							Company.update({_id: company_id}, {unearned_rev: unescape(req.params['record_value']).trim()}, function(err){
								if (err) return console.log("Problem finding company.")
								else return console.log("Updated company with new value")
							})
							break
					}
				})
			}
			else console.log('no-permissions')
		})
		res.send('Saving company record.')
	})

	/* */

	app.get('/get_fb_data/:page', function(req, res){
		var page = unescape(req.params['page'])
		var fb_request = {
			host: 'graph.facebook.com',
			port: 443, // because https
			path: '/' + page,
			method: 'GET'
		}
		https.get(fb_request, function(resp){
			var data = ''
			resp.on('data', function(chunk){
				data += chunk
			})
			resp.on('end', function(){
				res.json(JSON.parse(data)) 
			})
		}).on("error", function(e){
			console.log("When making fb request, got error: " + e.message)
		})
	})

	/* */

	app.get('/get_seo_data/:url/:field', function(req, res){
		var url = unescape(req.params['url'])
		var name = unescape(req.params['url']).split('.')[0] // get simply the domain
		var field = unescape(req.params['field'])
		var child = exec('php php_seo_api/get_seo_data.php ' + url + ' ' + name + ' ' + field, function(error, stdout, stderr){
			if (error != null) res.send('exec error: ' + error)
			else res.json(JSON.parse(stdout))
		})
	})

	/* */

	app.get('/get_company_record/:company_id/:record_name', function(req, res){
		Company.findById(unescape(req.params['company_id']), function(err, result){
			if (err) console.log('Could not find company.')
			var record_name = unescape(req.params['record_name'])
			switch(record_name) {
				case 'accounts_payable': res.json({record: result.accounts_payable}); break;
				case 'accounts_rec': res.json({record: result.accounts_rec}); break;
				case 'address': res.json({record: result.address}); break;
				case 'biological': res.json({record: result.biological}); break;
				case 'blog': res.json({record: result.blog}); break;
				case 'cash': res.json({record: result.cash}); break;
				case 'category': res.json({record: result.category}); break;
				case 'city': res.json({record: result.city}); break;
				case 'country': res.json({record: result.country}); break;
				case 'deferred_tax_liab_assets': res.json({record: result.deferred_tax_liab_assets}); break;
				case 'description': res.json({record: result.description}); break;
				case 'email': res.json({record: result.email}); break;
				case 'equity_method': res.json({record: result.equity_method}); break;
				case 'fb_page': res.json({record: result.fb_page}); break;
				case 'financial_assets': res.json({record: result.financial_assets}); break;
				case 'financial_liab': res.json({record: result.financial_liab}); break;
				case 'founded': res.json({record: result.founded}); break;
				case 'intangible': res.json({record: result.intangible}); break;
				case 'inventories': res.json({record: result.inventories}); break;
				case 'investors': res.json({record: result.investors}); break;
				case 'name': res.json({record: result.name}); break;
				case 'phone': res.json({record: result.phone}); break;
				case 'picture': res.json({record: result.picture}); break;
				case 'prepaid_expenses': res.json({record: result.prepaid_expenses}); break;
				case 'products': res.json({record: result.products}); break;
				case 'prop_plant_equip': res.json({record: result.prop_plant_equip}); break;
				case 'provisions': res.json({record: result.provisions}); break;
				case 'slogan': res.json({record: result.slogan}); break;
				case 'state': res.json({record: result.state}); break;
				case 'team': res.json({record: result.team}); break;
				case 'twitter': res.json({record: result.twitter}); break;
				case 'unearned_rev': res.json({record: result.unearned_rev}); break;
				case 'user': res.json({record: result.user}); break;
				case 'video': res.json({record: result.video}); break;
				case 'website': res.json({record: result.website}); break;
				case 'zip': res.json({record: result.zip}); break;
				default: res.json({record: null})
			}
		})
	})

	/* c */

	app.get('/get_user_record/:user_id/:record_name', function(req, res){
		User.findById(unescape(req.params['user_id']), function(err, result){
			if (err) console.log('Could not find user.')
			var record_name = unescape(req.params['record_name'])
			switch(record_name){ // need to have security on some of these 
				case 'companies_started': res.json({record: result.companies_started}); break;
				case 'equity_partnerships': res.json({record: result.equity_partnerships}); break;
				case 'extra_fb_info': res.json({record: result.extra_fb_info}); break;
				case 'fbid': res.json({record: result.fbid}); break;
				case 'fname': res.json({record: result.fname}); break;
				case 'investments': 
					if (req.session.user._id == unescape(req.params['user_id']))
						res.json({record: result.investments})
					else 
						res.json({record: 'no-permissions'})
					break
				case 'lname': res.json({record: result.lname}); break;
				case 'resume_pdfs': res.json({record: result.resume_pdfs}); break;
				default: res.json({record: null})
			}
		})
	})

	/* c */

	app.get('/notify/:to_id/:equity/:job/:contribution/:company_id/:to/:type', function(req, res){
		// here we must disallow multiple notification for same company-user pair
		var date = new Date()
		var to_id = unescape(req.params['to_id'])
		var from_id = req.session.user._id
		var equity = unescape(req.params['equity']).trim()
		var job = unescape(req.params['job']).trim()
		var contribution = unescape(req.params['contribution']).trim()
		var company_id = unescape(req.params['company_id'])
		var to = unescape(req.params['to'])
		var type = unescape(req.params['type'])
		var notification = new Contract({
			to_id: to_id, 
			from_id: from_id,
			equity: equity, 
			job: job, 
			contribution: contribution,
			company_id: company_id,
			to: to,
			type: type,
			read: 0, // whether the notification is read
			date: date.getTime(), // milliseconds since epoch
		})
		if (to == 0) { // from a company to a person 
			var permissions = false
			User.findById(req.session.user._id, function(c_err, c_result){
				if (c_err) console.log("Problem finding user")
				for (index in c_result.companies_started){
					if (c_result.companies_started[index].id == unescape(req.params['company_id'])) { 
						// in scenario the session user must own the company
						permissions = true
						break
					}
				}
				if (permissions){
					Contract.find({to_id: to_id, company_id: company_id, type: type, to: 0}, function(err, result){ 
						console.log('here')
						if (result.length == 0) {
							console.log('here1')
							// check if a notification from the person to the company exists
							Contract.find({from_id: to_id, company_id: company_id, type: type, to: 1}, function(err1, result1){ 
								if (result1.length == 0){
									notification.save(function(err) {
										if (err) return console.log("Problem saving a new Contract.")
										else res.json({response: "saved-contract"})
									})
								}
								else {
									res.json({response: "existing-contract-between-parties"})
								}
							})
						}
						else { // update the contract - the company already asked the person
							var contract_id = result[0].id
							Contract.update({_id: contract_id}, {equity: equity, job: job, contribution: contribution}, function(err){
								res.json({response: "updated-contract"})
							})
						}
					})
				}
			})
		}
		else // from a person to a company 
			Contract.find({from_id: from_id, company_id: company_id, type: type, to: 1}, function(err, result){
				if (result.length == 0) {
					// check if a notification from the company to the person exists
					Contract.find({to_id: from_id, company_id: company_id, type: type, to: 0}, function(err1, result1){
						if (result1.length == 0){
							notification.save(function(err) {
								if (err) return console.log("Problem saving a new Contract.")
								else res.json({response: "saved-contract"})
							})
						}
						else {
							res.json({response: "existing-contract-between-parties"})
						}
					})
				}
				else { // update the contract - the person already asked the company
					var contract_id = result[0].id
					Contract.update({_id: contract_id}, {equity: equity, job: job, contribution: contribution}, function(err){
						res.json({response: "updated-contract"})
					})
				}
			})

	})

	/* c */

	app.get('/confirm-equity-partnership/:notification_id', function(req, res){
		var company_id, member_id
		var notification_id = unescape(req.params['notification_id'])
		// here we will have to take in the notification id and make sure the right person is approving the equity partnership
		Contract.findById(notification_id, null, function(err, result) {
			if (err) console.log(err)
			var contract = result
			company_id = contract.company_id
			if (contract.to == 0){ // to a person, so check the session user is the to_id
				member_id = contract.to_id
				if (member_id == req.session.user._id) {
					Contract.findByIdAndRemove(notification_id, null, function(err) {
						if (err) console.log(err)
					})
					Company.findById(company_id, function(err, result){
						var team = result.team
						for (index in team) {
							if (team[index].id == member_id) team[index].pending = 0
						}
						Company.update({_id: company_id}, {team: team}, function(err){
							if (err) console.log("Problem finding company.")
							else {
								console.log("Updated company with new value")
								res.json({response: 'confirming'})
							}
						})
					})
					User.findById(member_id, function(err, result){
						var equity_partnerships = result.equity_partnerships
						for (index in equity_partnerships) {
							if (equity_partnerships[index].id == company_id) equity_partnerships[index].pending = 0
						}
						User.update({_id: member_id}, {equity_partnerships: equity_partnerships}, function(err){
							if (err) console.log("Problem finding user.")
							else {
								console.log("Updated user with new value")
								res.json({response: 'confirming'})
							}
						})
					})
				}
				else console.log('no-permissions')
			} 
			else { // to a company, so check the session user is the owner of the company
				member_id = contract.from_id
				User.findById(req.session.user._id, function(c_err, c_result){
					if (c_err) console.log("Problem finding user")
					var permissions = false
					for (index in c_result.companies_started){
						if (c_result.companies_started[index].id == contract.to_id) {
							permissions = true
							break
						}
					}
					if (permissions){
						Contract.findByIdAndRemove(notification_id, null, function(err) {
							if (err) console.log(err)
						})
						Company.findById(company_id, function(err, result){
							var team = result.team
							for (index in team) {
								if (team[index].id == member_id) team[index].pending = 0
							}
							Company.update({_id: company_id}, {team: team}, function(err){
								if (err) return console.log("Problem finding company.")
								else {
									console.log("Updated company with new value")
									res.json({response: 'confirming'})
								}
							})
						})
						User.findById(member_id, function(err, result){
							var equity_partnerships = result.equity_partnerships
							for (index in equity_partnerships) {
								if (equity_partnerships[index].id == company_id) equity_partnerships[index].pending = 0
							}
							User.update({_id: member_id}, {equity_partnerships: equity_partnerships}, function(err){
								if (err) return console.log("Problem finding user.")
								else { 
									console.log("Updated user with new value")
									res.json({response: 'confirming'})
								}
							})
						})
					}
					else console.log('no-permissions')
				})
			}
		})
	})

	/* c */

	app.get('/delete-pending-equity-partnership/:notification_id', function(req, res){
		var company_id, member_id
		var notification_id = unescape(req.params['notification_id'])
		// here we will have to take in the notification id and make sure the right person is approving the equity partnership
		Contract.findById(notification_id, null, function(err, result) {
			if (err) console.log(err)
			var contract = result
			company_id = contract.company_id
			if (contract.to == 0){ // to a person, so check the session user is the to_id
				member_id = contract.to_id
				if (contract.to_id == req.session.user._id) {
					Contract.findByIdAndRemove(notification_id, null, function(err) {
						if (err) console.log(err)
					})
					Company.findById(company_id, function(err, result){
						var team = result.team
						for (index in team) {
							if (team[index].id == member_id) team.splice(index, 1) // remove element from array
						}
						Company.update({_id: company_id}, {team: team}, function(err){
							if (err) return console.log("Problem finding company.")
							else {
								console.log("Updated company with new value")
								res.json({response: 'confirming'})
							}
						})
					})
					User.findById(member_id, function(err, result){
						var equity_partnerships = result.equity_partnerships
						for (index in equity_partnerships) {
							if (equity_partnerships[index].id == company_id) equity_partnerships.splice(index, 1) // remove element from array
						}
						User.update({_id: member_id}, {equity_partnerships: equity_partnerships}, function(err){
							if (err) return console.log("Problem finding user.")
							else {
								console.log("Updated user with new value")
								res.json({response: 'confirming'})
							}
						})
					})
				}
				else console.log('no-permissions')
			} 
			else { // to a company, so check the session user is the owner of the company
				member_id = contract.from_id
				User.findById(req.session.user._id, function(c_err, c_result){
					if (c_err) console.log("Problem finding user")
					var permissions = false
					for (index in c_result.companies_started){
						if (c_result.companies_started[index].id == contract.to_id) {
							permissions = true
							break
						}
					}
					if (permissions){
						Contract.findByIdAndRemove(notification_id, null, function(err) {
							if (err) console.log(err)
						})
						Company.findById(company_id, function(err, result){
							var team = result.team
							for (index in team) {
								if (team[index].id == member_id) team.splice(index, 1) // remove element from array
							}
							Company.update({_id: company_id}, {team: team}, function(err){
								if (err) return console.log("Problem finding company.")
								else {
									console.log("Updated company with new value")
									res.json({response: 'confirming'})
								}
							})
						})
						User.findById(member_id, function(err, result){
							var equity_partnerships = result.equity_partnerships
							for (index in equity_partnerships) {
								if (equity_partnerships[index].id == company_id) equity_partnerships.splice(index, 1) // remove element from array
							}
							User.update({_id: member_id}, {equity_partnerships: equity_partnerships}, function(err){
								if (err) return console.log("Problem finding user.")
								else {
									console.log("Updated user with new value")
									res.json({response: 'confirming'})
								}
							})
						})
					}
					else console.log('no-permissions')
				})
			}
		})
	})

	/* c */

	app.get('/confirm-investment/:notification_id', function(req, res){
		var company_id, member_id
		var notification_id = unescape(req.params['notification_id'])
		// here we will have to take in the notification id and make sure the right person is approving the investment
		Contract.findById(notification_id, null, function(err, result) {
			if (err) console.log(err)
			var contract = result
			company_id = contract.company_id
			if (contract.to == 0){ // to a person, so check the session user is the to_id
				member_id = contract.to_id
				if (contract.to_id == req.session.user._id) {
					Contract.findByIdAndRemove(notification_id, null, function(err) {
						if (err) console.log(err)
					})
					Company.findById(company_id, function(err, result){
						var investors = result.investors
						for (index in investors) {
							if (investors[index].id == member_id) investors[index].pending = 0
						}
						Company.update({_id: company_id}, {investors: investors}, function(err){
							if (err) return console.log("Problem finding company.")
							else {
								console.log("Updated company with new value")
								res.json({response: 'confirming'})
							}
						})
					})
					User.findById(member_id, function(err, result){
						var investments = result.investments
						for (index in investments) {
							if (investments[index].id == company_id) investments[index].pending = 0
						}
						User.update({_id: member_id}, {investments: investments}, function(err){
							if (err) return console.log("Problem finding user.")
							else {
								console.log("Updated user with new value")
								res.json({response: 'confirming'})
							}
						})
					})
				}
				else console.log('no-permissions')
			} 
			else { // to a company, so check the session user is the owner of the company
				member_id = contract.from_id
				User.findById(req.session.user._id, function(c_err, c_result){
					if (c_err) console.log("Problem finding user")
					var permissions = false
					for (index in c_result.companies_started){
						if (c_result.companies_started[index].id == contract.to_id) {
							permissions = true
							break
						}
					}
					if (permissions){
						Contract.findByIdAndRemove(notification_id, null, function(err) {
							if (err) console.log(err)
						})
						Company.findById(company_id, function(err, result){
							var investors = result.investors
							for (index in investors) {
								if (investors[index].id == member_id) investors[index].pending = 0
							}
							Company.update({_id: company_id}, {investors: investors}, function(err){
								if (err) return console.log("Problem finding company.")
								else {
									console.log("Updated company with new value")
									res.json({response: 'confirming'})
								}
							})
						})
						User.findById(member_id, function(err, result){
							var investments = result.investments
							for (index in investments) {
								if (investments[index].id == company_id) investments[index].pending = 0
							}
							User.update({_id: member_id}, {investments: investments}, function(err){
								if (err) return console.log("Problem finding user.")
								else {
									console.log("Updated user with new value")
									res.json({response: 'confirming'})
								}
							})
						})
					}
					else console.log('no-permissions')
				})
			}
		})
	})

	/* c */

	app.get('/delete-pending-investment/:notification_id', function(req, res){
		var company_id, member_id
		var notification_id = unescape(req.params['notification_id'])
		// here we will have to take in the notification id and make sure the right person is approving the investment
		Contract.findById(notification_id, null, function(err, result) {
			if (err) console.log(err)
			var contract = result
			company_id = contract.company_id
			if (contract.to == 0){ // to a person, so check the session user is the to_id
				member_id = contract.to_id
				if (contract.to_id == req.session.user._id) {
					Contract.findByIdAndRemove(notification_id, null, function(err) {
						if (err) console.log(err)
					})
					Company.findById(company_id, function(err, result){
						var investors = result.investors
						for (index in investors) {
							if (investors[index].id == member_id) investors.splice(index, 1)
						}
						Company.update({_id: company_id}, {investors: investors}, function(err){
							if (err) return console.log("Problem finding company.")
							else {
								console.log("Updated company with new value")
								res.json({response: 'confirming'})
							}
						})
					})
					User.findById(member_id, function(err, result){
						var investments = result.investments
						for (index in investments) {
							if (investments[index].id == company_id) investments.splice(index, 1)
						}
						User.update({_id: member_id}, {investments: investments}, function(err){
							if (err) return console.log("Problem finding user.")
							else {
								console.log("Updated user with new value")
								res.json({response: 'confirming'})
							}
						})
					})
				}
				else console.log('no-permissions')
			} 
			else { // to a company, so check the session user is the owner of the company
				member_id = contract.from_id
				User.findById(req.session.user._id, function(c_err, c_result){
					if (c_err) console.log("Problem finding user")
					var permissions = false
					for (index in c_result.companies_started){
						if (c_result.companies_started[index].id == contract.to_id) {
							permissions = true
							break
						}
					}
					if (permissions){
						Contract.findByIdAndRemove(notification_id, null, function(err) {
							if (err) console.log(err)
						})
						Company.findById(company_id, function(err, result1){
							var investors = result1.investors
							for (index in investors) {
								if (investors[index].id == member_id) investors.splice(index, 1)
							}
							Company.update({_id: company_id}, {investors: investors}, function(err){
								if (err) return console.log("Problem finding company.")
								else {
									console.log("Updated company with new value")
									res.json({response: 'confirming'})
								}
							})
						})
						User.findById(member_id, function(err, result2){
							var investments = result2.investments
							for (index in investments) {
								if (investments[index].id == company_id) investments.splice(index, 1)
							}
							User.update({_id: member_id}, {investments: investments}, function(err){
								if (err) return console.log("Problem finding user.")
								else {
									console.log("Updated user with new value")
									res.json({response: 'confirming'})
								}
							})
						})
					}
					else console.log('no-permissions')
				})
			}
		})
	})

	/* */

	app.get('/load-notifications', function(req, res){
		Contract.find({to_id: req.session.user._id}, null, {sort: {date: -1}}, function(err, docs) {
			res.json({result: docs})
		})
	})

	/* */

	app.get('/find_user_or_company/:name.json', function(req, res){
		if (req.session.user != null) {
			var name = unescape(req.params['name'])
			Company.find({name: new RegExp(name, 'i')}, function(err, result){
				var responses = []
				for (index in result){
					responses.push({value: result[index].name, id: result[index]._id, type: 'company'} )
				}
				var name_arr = unescape(req.params['name']).split(" ")
				var fname = name_arr[0]
				var lname = (name_arr.length > 1) ? name_arr[name_arr.length - 1] : ''
				User.find({fname: new RegExp(fname, 'i'), lname: new RegExp(lname, 'i')}, function(err1, result1){
					for (index in result1){
						responses.push({value: result1[index].fname + ' ' + result1[index].lname, id: result1[index]._id, type: 'user'} )
					}
					res.json(responses)
				})
			})
		}
		else res.send('not-logged-in')
	})



}

