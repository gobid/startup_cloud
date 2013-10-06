$(document).ready(function() {

	function loadFBphoto(member_id, i) {
		var member_fbid
		$.ajax({
			url: '/get_user_record/' + member_id + '/fbid',
			success: function(data) {
				member_fbid = data.record
				$(".form-group[field='investor_image_gp'][number='" + i + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + member_fbid + "/picture?type=large'>")
			},
			async: false
		})
	}

	var num_fields = $("#create_new_investor").attr('index')
	for (var i = 0; i < num_fields; i++) {
		// image initialization 
		var investor_id = $("input[field='investor_name'][number='" + i + "']").attr('investor_id')
		loadFBphoto(investor_id, i)
		
		// success initialization for filled in fields		
		if ($(".form-group[field='investor_name_gp'][number='" + i + "']").attr('pending') == '1'){
			$(".form-group[field='investor_name_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='investor_contribution_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='investor_equity_gp'][number='" + i + "']").addClass('has-warning')
		}
		else {
			$(".form-group[field='investor_name_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='investor_contribution_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='investor_equity_gp'][number='" + i + "']").addClass('has-success')
		}
	}

	function showOverlayInv(investor_id, contribution, equity) {
		var doc_width = $(document).width()
		$(".overlay-message").css('width', doc_width)
		$(".overlay").show('slow')
		$(".contribution").html(contribution)
		$(".equity").html(equity)
		$(".company").html($("#company_name").val())
		$.ajax({
			url: '/get_user_by_id/' + investor_id,
			success: function(data) {
				$(".person").html(data.name)
			}
		})
		$(".overlay-message").show('slow')
		$("#cancel").click(function() {
			$('#check_notifications').hide()
			$(".overlay").hide()
			$(".overlay-message").hide()
		})
		$("#submit").click(function() {
			$.get('/notify/' + investor_id + '/' + encodeURIComponent(equity) + ' /null/' + encodeURIComponent(contribution) + ' /' + $('#company_id').val() + '/0/1', function(data){
				var response = data.response
				if (data.response == 'existing-contract-between-parties'){
					$('#check_notifications').show()
				}
				else {
					$.get('/add_pending_investor/' + $('#company_id').val() + '/' + investor_id + '/' + encodeURIComponent(contribution) + '/' + encodeURIComponent(equity), function(data){
						console.log('Load to db was performed: ', data)
						$(".overlay").hide()
						$(".overlay-message").hide()
						location.reload()
					})
				}
			})
		})
	}
	function insertInvestor(datum, obj) {
		obj.popover('hide')
		obj.attr('disabled', 'disabled') // disable the field from all further use.
		var investor_id = datum.id
		loadFBphoto(investor_id, obj[0].getAttribute('number'))
		$(".go[number='" + obj[0].getAttribute('number') + "']").attr('disabled', false)
		$("input[field='investor_name'][number='" + obj[0].getAttribute('number') + "']").attr('investor_id', investor_id)
		$(document).on("click", ".go[number='" + obj[0].getAttribute('number') + "']", function(){
			console.log('num: ', $(this).attr('number'))
			var investor_id = $("input[field='investor_name'][number='" + $(this).attr('number') + "']").attr('investor_id')
			var contribution = $("input[field='investor_contribution'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='investor_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayInv(investor_id, contribution, equity)
		})
	}
	function initInvestorTypeahead() {
		$('input.investor-typeahead')
		.typeahead({
			name: 'investors',
			remote: 'https://startupcloud.org/find_user/%QUERY.json', 
			template: "<span id = '{{id}}'>{{value}}</span>",
			engine: Hogan
		})
		.on('typeahead:opened', function(){
			$(this).popover('show')
		})
		.on('typeahead:selected', function(e, datum){
			insertInvestor(datum, $(this))
		})
		.on('typeahead:autocompleted', function(e, datum){
			insertInvestor(datum, $(this))
		})
	}
	$(document).on('click', '#create_new_investor', function(){
		var index = this.getAttribute('index')
		$('.investor_list').append("<div class='row'><div class='col-xs-3'><div class = 'form-group' field='investor_image_gp' number='" + index + "'><img src='data:image/png;base64,' data-src='holder.js/125x125' alt='Generic placeholder image' field = 'investor_image' number='" + index + "' class='img-rounded'></div></div><div class='col-xs-9'><div class = 'form-group' field = 'investor_name_gp' number = '" + index + "'><input placeholder='Investor name' field='investor_name' number='" + index + "' class='form-control investor-typeahead', data-placement='right', data-container = 'body', data-content='Please select an investor from the autocomplete options.', data-trigger = 'manual'></div><div class='row'><div class='col-xs-6'><div class='input-group' field = 'investor_contribution_gp' number = '" + index + "'><span class='input-group-addon'>$</span><input type='text' placeholder='contribution' field='investor_contribution' number='" + index + "' class='form-control'></div></div><div class='col-xs-6'><div class = 'row'><div class = 'col-xs-7'><div class='input-group' field = 'investor_equity_gp' number = '" + index + "'><input type='text' placeholder='equity' field='investor_equity' number='" + index + "' class='form-control'><span class='input-group-addon'>%</span></div></div><div class = 'col-xs-5'><button class = 'btn btn-default pull-right go' number = '" + index + "'>Go!</button></div></div></div></div></div></div><br>")
		$('#create_new_investor').attr('index', parseInt($('#create_new_investor').attr('index')) + 1) // increment index
		initInvestorTypeahead()
		Holder.run({
			images: $("img[field='investor_image'][number='" + index + "']")[0]
		})
	})
	initInvestorTypeahead()
	// now init investor names
	var investors = $("input[field='investor_name']") // this only applies to preloaded (already set) investor_name fields
	for (var investor_cnt = 0; investor_cnt < investors.length; investor_cnt++) {
		var id = investors[investor_cnt].getAttribute('investor_id')
		$.ajax({
			url: '/get_user_by_id/' + id,
			success: function(data) {
				investors[investor_cnt].value = data.name
			},
			async: false
		})
		$(".go[number='" + investor_cnt + "']").click(function(){
			var investor_id = $("input[field='investor_name'][number='" + $(this).attr('number') + "']").attr('investor_id')
			var contribution = $("input[field='investor_contribution'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='investor_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayInv(investor_id, contribution, equity)
		})
	}

})