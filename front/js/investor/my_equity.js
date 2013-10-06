$(document).ready(function() {

	function loadFBphoto(member_id, i) {
		var member_fbid
		$.ajax({
			url: '/get_company_record/' + member_id + '/fb_page',
			success: function(data) {
				member_fbid = data.record
				$(".form-group[field='investment_image_gp'][number='" + i + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + member_fbid + "/picture?type=large'>")
			},
			async: false
		})
	}

	var num_fields = $("#create_new_investment").attr('index')
	for (var i = 0; i < num_fields; i++) {
		// image initialization 
		var investment_id = $("input[field='investment_name'][number='" + i + "']").attr('investment_id')
		loadFBphoto(investment_id, i)
		
		// success initialization for filled in fields		
		if ($(".form-group[field='investment_name_gp'][number='" + i + "']").attr('pending') == '1'){
			$(".form-group[field='investment_name_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='investment_contribution_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='investment_equity_gp'][number='" + i + "']").addClass('has-warning')
		}
		else {
			$(".form-group[field='investment_name_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='investment_contribution_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='investment_equity_gp'][number='" + i + "']").addClass('has-success')
		}
	}

	function showOverlayID(company_id, contribution, equity) {
		var doc_width = $(document).width()
		$(".overlay-message").css('width', doc_width)
		$(".overlay").show('slow')
		$(".contribution").html(contribution)
		$(".equity").html(equity)
		$(".person").html($("#member_name").val())
		$.ajax({
			url: '/get_company_by_id/' + company_id,
			success: function(data) {
				$(".company").html(data.name)
			}
		})
		$(".overlay-message").show('slow')
		$("#cancel").click(function() {
			$('#check_notifications').hide()
			$(".overlay").hide()
			$(".overlay-message").hide()
		})
		var owner_id = null
		$.ajax({
			url: '/get_company_record/' + company_id + '/user',
			success: function(data) {
				owner_id = data.record
			},
			async: false
		})
		$("#submit").click(function() {
			$.get('/notify/' + owner_id + '/' + encodeURIComponent(equity) + ' /null/' + encodeURIComponent(contribution) + ' /' + company_id + '/1/1', function(data){
				var response = data.response
				if (data.response == 'existing-contract-between-parties'){
					$('#check_notifications').show()
				}
				else {
					$.get('/add_pending_investor/' + company_id + '/' + $("#member_id").val() + '/' + encodeURIComponent(contribution) + '/' + encodeURIComponent(equity), function(data){
						console.log('Load to db was performed: ', data)
						$(".overlay").hide()
						$(".overlay-message").hide() // load until inserted somehow
						location.reload()
					})
				}
			})
		})
	}
	function insertInvestment(datum, obj) {
		obj.popover('hide')
		obj.attr('disabled', 'disabled') // disable the field from all further use.
		var investment_id = datum.id
		loadFBphoto(investment_id, obj[0].getAttribute('number'))
		$(".go[number='" + obj[0].getAttribute('number') + "']").attr('disabled', false)
		$("input[field='investment_name'][number='" + obj[0].getAttribute('number') + "']").attr('investment_id', investment_id)
		$(document).on("click", ".go[number='" + obj[0].getAttribute('number') + "']", function(){
			var investment_id = $("input[field='investment_name'][number='" + $(this).attr('number') + "']").attr('investment_id')
			var contribution = $("input[field='investment_contribution'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='investment_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayID(investment_id, contribution, equity)
		})
	}
	function initInvestmentTypeahead() {
		$('input.investment-typeahead')
		.typeahead({
			name: 'investments',
			remote: 'https://startupcloud.org/find_company/%QUERY.json', 
			template: "<span id = '{{id}}'>{{value}}</span>",
			engine: Hogan
		})
		.on('typeahead:opened', function(){
			$(this).popover('show')
		})
		.on('typeahead:selected', function(e, datum){
			insertInvestment(datum, $(this))
		})
		.on('typeahead:autocompleted', function(e, datum){
			insertInvestment(datum, $(this))
		})
	}
	$(document).on('click', '#create_new_investment', function(){
		var index = this.getAttribute('index')
		$('.investment_list').append("<div class='row'><div class='col-xs-3'><div class = 'form-group' field='investment_image_gp' number='" + index + "'><img src='data:image/png;base64,' data-src='holder.js/125x125' alt='Generic placeholder image' field = 'investment_image' number='" + index + "' class='img-rounded'></div></div><div class='col-xs-9'><div field='form-group' field='investment_name_gp' number='" + index + "'><input placeholder='Company name' field='investment_name' number='" + index + "' class='form-control investment-typeahead' , data-placement='right', data-container = 'body', data-content='Please select a company from the autocomplete options.', data-trigger = 'manual'></div><br><div class='row'><div class='col-xs-6'><div class='input-group' field='investment_contribution_gp' number='" + index + "'><span class='input-group-addon'>$</span><input type='text' placeholder='contribution' field='investment_contribution' number='" + index + "' class='form-control'></div></div><div class='col-xs-6'><div class = 'row'><div class = 'col-xs-7'><div class='input-group' field='investment_equity_gp' number='" + index + "'><input type='text' placeholder='equity' field='investment_equity' number='" + index + "' class='form-control'><span class='input-group-addon'>%</span></div></div><div class = 'col-xs-5'><button class = 'btn btn-default pull-right go' number = '" + index + "'>Go!</button></div></div></div></div></div></div><br>")
		$('#create_new_investment').attr('index', parseInt($('#create_new_investment').attr('index')) + 1) // increment index
		initInvestmentTypeahead()
		Holder.run({
			images: $("img[field='investment_image'][number='" + index + "']")[0]
		})
	})
	initInvestmentTypeahead()
	// now init investment names
	var investments = $("input[field='investment_name']") // this only applies to preloaded (already set) investment_name fields
	for (var investment_cnt = 0; investment_cnt < investments.length; investment_cnt++) {
		var id = investments[investment_cnt].getAttribute('investment_id')
		$.ajax({
			url: '/get_company_by_id/' + id,
			success: function(data) {
				investments[investment_cnt].value = data.name
			},
			async: false
		})
		$(".go[number='" + investment_cnt + "']").click(function(){
			var investment_id = $("input[field='investment_name'][number='" + $(this).attr('number') + "']").attr('investment_id')
			var contribution = $("input[field='investment_contribution'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='investment_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayID(investment_id, contribution, equity)
		})
	}

})
