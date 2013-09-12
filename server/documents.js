var mongoose = require('mongoose')
	mongoose.connect('mongodb://govinda:mongo8424@paulo.mongohq.com:10061/startup_cloud')


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
	cash: String, 
	accounts_rec: String, 
	inventories: String, 
	prepaid_expenses: String, 
	prop_plant_equip: String, 
	intangible: String, 
	financial_assets: String, 
	equity_method: String, 
	biological: String, 
	accounts_payable: String, 
	provisions: String, 
	financial_liab: String, 
	deferred_tax_liab_assets: String, 
	unearned_rev: String
})


var Contract = mongoose.model('Contract', { // this is a type of notification
	to_id: String, 
	from_id: String,
	equity: String, 
	job: String, 
	contribution: String,
	company_id: String,
	to: String, // 0 to person, 1 to company
	type: String, // 0 equity partnership, 1 investment
	read: String, // whether the notification is read
	date: String, /* ADD CONTRACT PDF FILE */
})


module.exports.User = User
module.exports.Company = Company
module.exports.Contract = Contract
