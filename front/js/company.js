$(document).ready(function() {	
	// NOTE THE FOLLOWING IS SOME PRIMARILY COPIED CODE THAT SHOULD BE UNIFIED AT SOME POINT
	for (index in $(".member")) {
		var id = $(".member")[index].id
		if (id != null) {
			$.ajax({
				url: '/get_user_by_id/' + id,
				success: function(data) { 
					$(".member")[index].innerHTML = data.name
				},
				async: false
			})
		}
	}
	for (index in $(".placeholder")) {
		var id = ($(".placeholder")[index]) ? $(".placeholder")[index].id : null
		if (id != null) {
			$.ajax({
				url: '/get_user_record/' + id + '/fbid',
				success: function(data) { 
					$(".placeholder")[index].innerHTML = "<img src = 'https://graph.facebook.com/" + data.record + "/picture?type=large' style = 'width: 150px;'>"
				},
				async: false
			})
		}
		
	}
	$.get('/get_fb_data/' + encodeURIComponent($("#public_company_fb").val()), function(data){
		$('.fb_talking_about').html(data.talking_about_count)
		$('.fb_were_here').html(data.were_here_count)
		$('.fb_likes').html(data.likes)
	})
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/alexa_global', function(data){
		if (data == null) data = {alexa_global: 'n.a'}
		$('.alexa_global').html(data.alexa_global)
	})
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/google_page_rank', function(data){
		if (data == null) data = {google_page_rank: 'n.a'}
		if (isNaN(parseInt(data.google_page_rank))) data.google_page_rank = 'n.a.'
		$('.google_page_rank').html(data.google_page_rank)
	})
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/facebook_shares', function(data){
		if (data == null) data = {facebook_shares: 'n.a'}
		$('.facebook_shares').html(data.facebook_shares.total_count)
	})
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/twitter_mentions', function(data){
		if (data == null) data = {twitter_mentions: 'n.a'}
		$('.twitter_mentions').html(data.twitter_mentions)
	})
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/linkedin_shares', function(data){
		if (data == null) data = {linkedin_shares: 'n.a'}
		$('.linkedin_shares').html(data.linkedin_shares)
	})	
	$.get('/get_seo_data/' + encodeURIComponent($("#public_company_site").val()) + '/pinterest_shares', function(data){
		if (data == null) data = {pinterest_shares: 'n.a'}
		$('.pinterest_shares').html(data.pinterest_shares)
	})
	var url = $("#public_company_site").val()
	var name = $("#public_company_name").val()
	var query = '/get_seo_data/' + encodeURIComponent(url) + '/semrush_competitors'
	$.get(query, function(data){
		if (data == null || data.semrush_competitors == 'n.a.' || data.semrush_competitors.data.length == 0) 
			$('#competition').html($('#competition').html() + "<tr><td>No competitors recognized by SEMRush</td></tr>")
		else {
			$('#competition').html('<tr><td>Company</td><td>Rank</td><td>Np</td><td>Or</td><td>Ot</td><td>Oc</td><tr>')
			var competitors = data.semrush_competitors.data
			for (index in competitors) {
				var past_html = $('#competition').html()
				$('#competition').html(past_html + "<tr><td><a href = 'http://" + competitors[index].Dn + "' target = '_blank'>" + competitors[index].Dn + '</td><td>' + competitors[index].Rk + '</td><td>' + competitors[index].Np + '</td><td>' + competitors[index].Or + '</td><td>' + competitors[index].Ot + '</td><td>' + competitors[index].Oc + '</td></tr>')
			}
		}
	})
	function evaluateGroup(group) {
		var sum = 0
		for (index in group) {
			var gp_member = group[index].id
			var gp_member_education
			var gp_member_work
			$.ajax({
				url: '/get_user_record/' + gp_member + '/extra_fb_info',
				success: function(data) { 
					gp_member_education = data.record.education
					gp_member_work = data.record.work
				},
				async: false
			})
			if (gp_member_education) {
				for (edu_index in gp_member_education) {
					var school_obj = gp_member_education[edu_index]
					var school_name = school_obj.school.name
					if (tier_1_colleges.indexOf(school_name) > -1) sum += 5000
					else if (tier_2_colleges.indexOf(school_name) > -1) sum += 1000 
				}
			}
			if (gp_member_work) {
				for (edu_index in gp_member_work) {
					var work_obj = gp_member_work[edu_index]
					var work_name = work_obj.employer.name
					if (tier_1_companies.indexOf(work_name) > -1) sum += 5000
				}
			}
		}
		return sum
	}
	// CONSTANTS
	// from http://www.timeshighereducation.co.uk/world-university-rankings/2012-13/world-ranking
	var tier_1_colleges = ['Harvard University', 'Princeton University', 'Yale University', 'Columbia University', 'University of Chicago', 
	'Massachusetts Institute of Technology (MIT)', 'Stanford University', 'Duke University', 'University of Pennsylvania', 'California Institute of Technology',
	'University of Oxford', 'University of Cambridge', 'Imperial College London', 'UC Berkeley']
	var tier_2_colleges = ['ETH Zurich', 'UCLA', 'Johns Hopkins University', 'UCL', 'Cornell University', 'Northwestern University', 'University of Michigan',
	'University of Toronto', 'Carnegie Mellon University']
	// from http://jobs.aol.com/articles/2011/06/20/top-20-most-difficult-companies-for-interviews/
	// from http://en.wikipedia.org/wiki/List_of_investment_banks
	var tier_1_companies = ['McKinsey & Company', 'Jane Street Capital', 'Bain & Company', 'Palantir Technologies', 'Teach for America', 'BP', 'Procter & Gamble',
	'Salesforce', 'Amazon.com', 'eBay', 'Gallup', 'Apple Inc.', 'Google', 'Facebook', 'Disney', 'Dropbox', 'Goldman Sachs', 'Morgan Stanley', 'JP Morgan Chase & Co.']
	// Rough Algorithm: Each Tier 1 name mentioned is worth $5000 to the company. Each Tier 2 name mentioned is worth $1000 to the company. 
	// ASYNC JQUERY 
	var cash, accounts_rec, inventories, prepaid_expenses, prop_plant_equip, intangible, financial_assets, equity_method, biological, tot_assets, accounts_payable, provisions, financial_liab, deferred_tax_liab_assets, unearned_rev, pr, fb_likes, twitter_mentions, facebook_shares, linkedin_shares, team, investors, num_competitors, core, interweb, social, network, team_valuation, investors_valuation, final_valuation
	/* for core */
		// cash
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/cash',
				success: function(data) { 
					cash = data.record
					cash = (isNaN(parseInt(cash))) ? 0 : parseInt(cash) 
					Frame();
				}
			})
		})
		// accounts_rec
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/accounts_rec',
				success: function(data) { 
					accounts_rec = data.record 
					accounts_rec = (isNaN(parseInt(accounts_rec))) ? 0 : parseInt(accounts_rec) 
					Frame()
				}
			})
					
		})
		// inventories
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/inventories',
				success: function(data) { 
					inventories = data.record 
					inventories = (isNaN(parseInt(inventories))) ? 0 : parseInt(inventories) 
					Frame()
				}
			})
		})
		// prepaid_expenses
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/prepaid_expenses',
				success: function(data) { 
					prepaid_expenses = data.record 
					prepaid_expenses = (isNaN(parseInt(prepaid_expenses))) ? 0 : parseInt(prepaid_expenses) 
					Frame() 
				}
			})
		})	
		// prop_plant_equip
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/prop_plant_equip',
				success: function(data) { 
					prop_plant_equip = data.record 
					prop_plant_equip = (isNaN(parseInt(prop_plant_equip))) ? 0 : parseInt(prop_plant_equip) 
					Frame()
				}
			})
		})	
		// intangible
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/intangible',
				success: function(data) { 
					intangible = data.record 
					intangible = (isNaN(parseInt(intangible))) ? 0 : parseInt(intangible) 
					Frame()
				}
			})
		})	
		// financial_assets
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/financial_assets',
				success: function(data) { 
					financial_assets = data.record 
					financial_assets = (isNaN(parseInt(financial_assets))) ? 0 : parseInt(financial_assets) 
					Frame()
				}
			})
		})
			
		// equity_method
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/equity_method',
				success: function(data) { 
					equity_method = data.record 
					equity_method = (isNaN(parseInt(equity_method))) ? 0 : parseInt(equity_method)
					Frame()
				}
			})
		})				 
		// biological
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/biological',
				success: function(data) { 
					biological = data.record 
					biological = (isNaN(parseInt(biological))) ? 0 : parseInt(biological) 
					Frame()
				}
			})
		})
			
		// tot_assets
		Frame(function(){
			tot_assets = cash + accounts_rec + inventories + prepaid_expenses + prop_plant_equip + intangible + financial_assets + equity_method + biological
			Frame(); 
		});
		
		// accounts_payable
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/accounts_payable',
				success: function(data) { 
					accounts_payable = data.record 
					accounts_payable = (isNaN(parseInt(accounts_payable))) ? 0 : parseInt(accounts_payable) 
					Frame() 
				}
			})
		})	
		// provisions
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/provisions',
				success: function(data) { 
					provisions = data.record 
					provisions = (isNaN(parseInt(provisions))) ? 0 : parseInt(provisions)
					Frame()
				}
			})
		})	 
		// financial_liab
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/financial_liab',
				success: function(data) { 
					financial_liab = data.record
					financial_liab = (isNaN(parseInt(financial_liab))) ? 0 : parseInt(financial_liab) 
					Frame()
				}
			})
		})
			
		// deferred_tax_liab_assets
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/deferred_tax_liab_assets',
				success: function(data) { 
					deferred_tax_liab_assets = data.record 
					deferred_tax_liab_assets = (isNaN(parseInt(deferred_tax_liab_assets))) ? 0 : parseInt(deferred_tax_liab_assets) 
					Frame()
				}
			})
		})
			
		// unearned_rev
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/unearned_rev',
				success: function(data) { 
					unearned_rev = data.record 
					unearned_rev = (isNaN(parseInt(unearned_rev))) ? 0 : parseInt(unearned_rev) 
					Frame()
				}
			})
		})
			
		// tot_liab
		Frame(function(){
			tot_liab = accounts_payable + provisions + financial_liab + deferred_tax_liab_assets + unearned_rev
			core = tot_assets - tot_liab
			$("#core").html('$' + core)
			Frame()
		})
			
	/* for interweb */
		Frame(function(){
			$.ajax({
				url: '/get_seo_data/' + $("#public_company_site").val() + '/google_page_rank',
				success: function(data) { 
					pr = data.record 
					pr = (isNaN(parseInt(pr))) ? 0 : parseInt(pr) 
					interweb = core + 68*Math.exp(1.6*pr)
					$("#interweb").html('$' + interweb)
					Frame()
				}
			})
		})
			
	/* for social */
		Frame(function(){
			$.ajax({
				url: '/get_fb_data/' + $("#public_company_fb").val(),
				success: function(data) { 
					fb_likes = data.likes 
					fb_likes = (isNaN(parseInt(fb_likes))) ? 0 : parseInt(fb_likes)
					Frame()
				}
			})
		})
			
		Frame(function(){
			$.ajax({
				url: '/get_seo_data/' + $("#public_company_site").val() + '/twitter_mentions',
				success: function(data) { 
					twitter_mentions = data.twitter_mentions 
					twitter_mentions = (isNaN(parseInt(twitter_mentions))) ? 0 : parseInt(twitter_mentions)
					social = interweb + fb_likes + .05*twitter_mentions
					$("#social").html('$' + social)
					Frame()
				}
			})
		})
			
	/* for network */
		Frame(function(){
			$.ajax({
				url: '/get_seo_data/' + $("#public_company_site").val() + '/facebook_shares',
				success: function(data) { 
					facebook_shares = data.facebook_shares.total_count 
					facebook_shares = (isNaN(parseInt(facebook_shares))) ? 0 : parseInt(facebook_shares)
					Frame()
				} // explain this in description
			})
		})
			
		Frame(function(){
			$.ajax({
				url: '/get_seo_data/' + $("#public_company_site").val() + '/linkedin_shares',
				success: function(data) { 
					linkedin_shares = data.linkedin_shares 
					linkedin_shares = (isNaN(parseInt(linkedin_shares))) ? 0 : parseInt(linkedin_shares)
					network = social + .01*facebook_shares + .01*linkedin_shares
					$("#network").html('$' + network)
					Frame()
				}
			})
		})
			
	/* for team */
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/team',
				success: function(data) { 
					team = data.record 
					team_valuation = network + evaluateGroup(team)
					$("#team").html('$' + team_valuation)
					Frame()
				} // explain this in description
			})
		})
			
	/* for investors */
		Frame(function(){
			$.ajax({
				url: '/get_company_record/' + $("#public_company_id").val() + '/investors',
				success: function(data) { 
					investors = data.record 
					investors_valuation = team_valuation + evaluateGroup(investors)
					$("#investor").html('$' + investors_valuation)
					Frame()
				} // explain this in description
			})
		})
			
	/* for final */
		Frame(function(){
			$.ajax({
				url: '/get_seo_data/' + $("#public_company_site").val() + '/semrush_competitors',
				success: function(data) { 
					if (data.semrush_competitors == 'n.a.') num_competitors = 0 
					else num_competitors = data.semrush_competitors.data.length 
					final_valuation = investors_valuation + num_competitors
					$("#final").html('<strong>$' + final_valuation + '</strong>')
				} // explain this in description
			})
		})
	Frame.init();
})