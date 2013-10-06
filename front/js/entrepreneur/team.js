$(document).ready(function() {

	function loadFBphoto(member_id, i) {
		var member_fbid
		$.ajax({
			url: '/get_user_record/' + member_id + '/fbid',
			success: function(data) {
				member_fbid = data.record
				$(".form-group[field='member_image_gp'][number='" + i + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + member_fbid + "/picture?type=large'>")
			},
			async: false
		})
	}

	var num_fields = $("#create_new_member").attr('index')
	for (var i = 0; i < num_fields; i++) {
		// image initialization 
		var member_id = $("input[field='member_name'][number='" + i + "']").attr('member_id')
		loadFBphoto(member_id, i)
		
		// success initialization for filled in fields		
		if ($(".form-group[field='member_name_gp'][number='" + i + "']").attr('pending') == '1'){
			$(".form-group[field='member_name_gp'][number='" + i + "']").addClass('has-warning')
			$(".form-group[field='member_job_gp'][number='" + i + "']").addClass('has-warning')
			$(".input-group[field='member_equity_gp'][number='" + i + "']").addClass('has-warning')
		}
		else {
			$(".form-group[field='member_name_gp'][number='" + i + "']").addClass('has-success')
			$(".form-group[field='member_job_gp'][number='" + i + "']").addClass('has-success')
			$(".input-group[field='member_equity_gp'][number='" + i + "']").addClass('has-success')
		}
	}

	function showOverlay(member_id, job, equity) {
		var doc_width = $(document).width()
		$(".overlay-message").css('width', doc_width)
		$(".overlay").show('slow')
		$(".job").html(job)
		$(".equity").html(equity)
		$(".company").html($("#company_name").val())
		$.ajax({
			url: '/get_user_by_id/' + member_id,
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
			$.get('/notify/' + member_id + '/' + encodeURIComponent(equity) + ' /' + encodeURIComponent(job) + ' /null/' + $('#company_id').val() + '/0/0', function(data){
				var response = data.response
				if (data.response == 'existing-contract-between-parties'){
					$('#check_notifications').show()
				}
				else {
					$.get('/add_pending_member/' + $('#company_id').val() + '/' + member_id + '/' + encodeURIComponent(job) + '/' + encodeURIComponent(equity), function(data){
						console.log('Load to db was performed: ', data)
						$(".overlay").hide()
						$(".overlay-message").hide()
						location.reload()
					})
				}
			})
		})
	}
	function insertMember(datum, obj) {
		obj.popover('hide')
		obj.attr('disabled', 'disabled') // disable the field from all further use.
		var member_id = datum.id
		loadFBphoto(member_id, obj[0].getAttribute('number'))
		$(".go[number='" + obj[0].getAttribute('number') + "']").attr('disabled', false)
		$("input[field='member_name'][number='" + obj[0].getAttribute('number') + "']").attr('member_id', member_id)
		$(document).on("click", ".go[number='" + obj[0].getAttribute('number') + "']", function(){
			var member_id = $("input[field='member_name'][number='" + $(this).attr('number') + "']").attr('member_id')
			var job = $("input[field='member_job'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='member_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlay(member_id, job, equity)
		})
	}
	function initUserTypeahead() {
		$('input.user-typeahead')
		.typeahead({
			name: 'users',
			remote: '/find_user/%QUERY.json', 
			template: "<span id = '{{id}}'>{{value}}</span>",
			engine: Hogan
		})
		.on('typeahead:opened', function(){
			$(this).popover('show')
		})
		.on('typeahead:selected', function(e, datum){
			insertMember(datum, $(this))
		})
		.on('typeahead:autocompleted', function(e, datum){
			insertMember(datum, $(this))
		})
	}
	$(document).on('click', '#create_new_member', function(){
		var index = this.getAttribute('index')
		$('.team_list').append("<div class='row'><div class='col-xs-3'><div class = 'form-group' field='member_image_gp' number='" + index + "'><img src='data:image/png;base64,' data-src='holder.js/125x125' alt='Generic placeholder image' field='member_image' number='" + index + "' class='img-rounded'></div></div><div class='col-xs-9'><div class = 'form-group' field = 'member_name_gp' number = '" + index + "'><input placeholder='Member name' field='member_name' number='" + index + "' class='form-control user-typeahead' , data-placement='right', data-container = 'body', data-content='Please select a team member from the autocomplete options.', data-trigger = 'manual'></div><div class='row'><div class='col-xs-6'><div class = 'form-group' field = 'member_job_gp' number = '" + index + "'><input type='text' placeholder='job' field='member_job' number='" + index + "' class='form-control'></div></div><div class='col-xs-6'><div class = 'row'><div class = 'col-xs-7'><div class='input-group' field = 'member_equity_gp' number = '" + index + "'><input type='text' placeholder='equity' field='member_equity' number='" + index + "' class='form-control'><span class='input-group-addon'>%</span></div></div><div class = 'col-xs-5'><button class = 'btn btn-default pull-right go' number = '" + index + "' disabled = 'true'>Go!</button></div></div></div></div></div></div><br>")
		$('#create_new_member').attr('index', parseInt($('#create_new_member').attr('index')) + 1) // increment index
		initUserTypeahead()
		Holder.run({
			images: $("img[field='member_image'][number='" + index + "']")[0]
		})
	})
	initUserTypeahead()
	// now init member names
	var members = $("input[field='member_name']") // this only applies to preloaded (already set) investor_name fields
	for (var member_cnt = 0; member_cnt < members.length; member_cnt++) {
		var id = members[member_cnt].getAttribute('member_id')
		$.ajax({
			url: '/get_user_by_id/' + id,
			success: function(data) {
				members[member_cnt].value = data.name
			},
			async: false
		})
		$(".go[number='" + member_cnt + "']").click(function(){
			var member_id = $("input[field='member_name'][number='" + $(this).attr('number') + "']").attr('member_id')
			var job = $("input[field='member_job'][number='" + $(this).attr('number') + "']").val()
			var equity = $("input[field='member_equity'][number='" + $(this).attr('number') + "']").val()
			showOverlay(member_id, job, equity)
		})
	}

})