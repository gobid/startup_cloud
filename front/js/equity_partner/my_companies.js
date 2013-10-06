$(document).ready(function() {

	function loadFBphoto(member_id, i) {
		var member_fbid
		$.ajax({
			url: '/get_company_record/' + member_id + '/fb_page',
			success: function(data) {
				member_fbid = data.record
				$(".form-group[field='company_image_gp'][number='" + i + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + member_fbid + "/picture?type=large'>")
			},
			async: false
		})
	}

	var num_fields = $("#create_new_company").attr('index')
	for (var i = 0; i < num_fields; i++) {
		// image initialization 
		var company_id = $("input[field='company_name'][number='" + i + "']").attr('company_id')
		loadFBphoto(company_id, i)
		
		// success initialization for filled in fields		
		if ($(".form-group[field='company_name_gp'][number='" + i + "']").attr('pending') == '1'){	
			$(".form-group[field='company_name_gp'][number='" + i + "']").addClass('has-warning')
			$(".form-group[field='company_job_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='company_equity_gp'][number='" + i + "']").addClass('has-warning')
		}
		else {
			$(".form-group[field='company_name_gp'][number='" + i + "']").addClass('has-success')
			$(".form-group[field='company_job_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='company_equity_gp'][number='" + i + "']").addClass('has-success')
		}
	}

	function showOverlayEP(company_id, job, equity) {
		var doc_width = $(document).width()
		$(".overlay-message").css('width', doc_width)
		$(".overlay").show('slow')
		$(".job").html(job)
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
			$.get('/notify/' + owner_id + '/' + encodeURIComponent(equity) + ' /' + encodeURIComponent(job) + ' /null/' + company_id + '/1/0', function(data){
				var response = data.response
				if (data.response == 'existing-contract-between-parties'){
					$('#check_notifications').show()
				}
				else {
					$.get('/add_pending_member/' + company_id + '/' + $('#member_id').val() + '/' + encodeURIComponent(job) + '/' + encodeURIComponent(equity), function(data){
						console.log('Load to db was performed: ', data)
						$(".overlay").hide()
						$(".overlay-message").hide()
						location.reload()
					})
				}
			})
		})
	}
	function insertCompany(datum, obj) {
		obj.popover('hide')
		obj.attr('disabled', 'disabled') // disable the field from all further use.
		var company_id = datum.id
		loadFBphoto(company_id, obj[0].getAttribute('number'))
		$(".go[number='" + obj[0].getAttribute('number') + "']").attr('disabled', false)
		$("input[field='company_name'][number='" + obj[0].getAttribute('number') + "']").attr('company_id', company_id)
		$(document).on("click", ".go[number='" + obj[0].getAttribute('number') + "']", function(){
			console.log('num: ', $(this).attr('number'))
			var company_id = $("input[field='company_name'][number='" + $(this).attr('number') + "']").attr('company_id')
			var job = $("input[field='company_contribution'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='company_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayEP(company_id, job, equity)
		})
	}
	function initCompanyTypeahead() {
		$('input.company-typeahead')
		.typeahead({
			name: 'companies',
			remote: 'https://startupcloud.org/find_company/%QUERY.json', 
			template: "<span id = '{{id}}'>{{value}}</span>",
			engine: Hogan
		})
		.on('typeahead:opened', function(){
			$(this).popover('show')
		})
		.on('typeahead:selected', function(e, datum){
			insertCompany(datum, $(this))
		})
		.on('typeahead:autocompleted', function(e, datum){
			insertCompany(datum, $(this))
		})
	}
	$(document).on('click', '#create_new_company', function(){
		var index = this.getAttribute('index')
		$('.company_list').append("<div class='row'><div class='col-xs-3'><div class = 'form-group' field = 'company_image_gp' number = '" + index + "'><img src='data:image/png;base64,' data-src='holder.js/125x100' alt='Generic placeholder image' field = 'company_image' number='" + index + "' class='img-rounded'></div></div><div class='col-xs-9'><div class = 'form-group' field = 'company_name_gp' number = '" + index + "'><input placeholder='Company name' field='company_name' number='" + index + "' class='form-control company-typeahead'></div><div class='row'><div class='col-xs-6'><div class = 'form-group' field = 'company_job_gp' number = '" + index + "'><input type='text' placeholder='job' field='company_job' number='" + index + "' class='form-control'></div></div><div class='col-xs-6'><div class = 'row'><div class = 'col-xs-7'><div class='input-group' field = 'company_equity_gp' number = '" + index + "'><input type='text' placeholder='equity' field='company_equity' number='" + index + "' class='form-control'><span class='input-group-addon'>%</span></div></div><div class = 'col-xs-5'><button class = 'btn btn-default pull-right go' number = '" + index + "'>Go!</button></div></div></div></div></div><br>")
		$('#create_new_company').attr('index', parseInt($('#create_new_company').attr('index')) + 1) // increment index
		initCompanyTypeahead()
		Holder.run({
			images: $("img[field='company_image'][number='" + index + "']")[0]
		})
	})
	initCompanyTypeahead()
	// now init company names
	var companies = $("input[field='company_name']") // this only applies to preloaded (already set) investor_name fields
	for (var company_cnt = 0; company_cnt < companies.length; company_cnt++) {
		var id = companies[company_cnt].getAttribute('company_id')
		$.ajax({
			url: '/get_company_by_id/' + id,
			success: function(data) {
				companies[company_cnt].value = data.name
			},
			async: false
		})
		$(".go[number='" + company_cnt + "']").click(function(){
			var company_id = $("input[field='company_name'][number='" + $(this).attr('number') + "']").attr('company_id')
			var job = $("input[field='company_job'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='company_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlayEP(company_id, job, equity)
		})
	}

})
