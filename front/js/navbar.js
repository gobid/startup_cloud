$(document).ready(function() {
	$("#logout").hover(function(){
		$("#logout").popover('toggle')
	})
	$("#logout").click(function(){
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected' || response.status === 'not_authorized') {
				FB.logout(function(response) { 
					console.log(response)
					console.log('Person is now logged out of fb') 
					location.replace('/logout')
				})
			} 
			else location.replace('/logout')		
		})
	})
		
	$("#edesk").hover(function(){
		$("#edesk").popover('toggle')
	})
	function searchRedirect(data, obj) {
		if (data.type == 'user') window.location.replace('/profile/' + data.id)
		else window.location.replace('/company/' + data.id)
	}
	function initSearch() {
		$('input.search-typeahead')
		.typeahead({
			name: 'search-results',
			remote: 'https://startupcloud.org/find_user_or_company/%QUERY.json', 
			template: "<span id = '{{id}}'>{{value}}</span>",
			engine: Hogan
		})
		.on('typeahead:selected', function(e, datum){
			searchRedirect(datum, $(this))
		})
		.on('typeahead:autocompleted', function(e, datum){
			searchRedirect(datum, $(this))
		})
	}
	initSearch()
		$(document).on('click', ".approval", function(){
		var query = $(this).attr('query')
		$.get(query, function(data){
			console.log('performed confirmation query')
			location.reload()
		})
	})
	function prepareNotification(company_name, from_name, equity, job, contribution, to, type) {
		if (to == 0 && type == 0) return company_name + " has added you as their " + job + " for " + equity + "% equity."
		else if (to == 0 && type == 1) return company_name + " has added you an investor with a $" + contribution + " contribution for " + equity + "% equity."
		else if (to == 1 && type == 0) return from_name + " has added him/herself as " + job + " of your company " + company_name + " for " + equity + "% equity."
		else return from_name + " has added him/herself as an investor in your company " + company_name + " with a $" + contribution + " contribution for " + equity + "% equity." 
	}
	function prepareAcceptButton(company_id, to_id, from_id, notification_id, to, type) {
		var query
		if (type == 0) {
			if (to == 0) query = '/confirm-equity-partnership/' + notification_id
			else query = '/confirm-equity-partnership/' + notification_id
		}
		else {
			if (to == 0) query = '/confirm-investment/' + notification_id
			else query = '/confirm-investment/' + notification_id
		}
		var button = "<input class = 'btn btn-default approval' query = '" + query + "' value = 'Approve'/>"
		return button
	}
	function prepareRejectButton(company_id, to_id, from_id, notification_id, to, type) {
		var query
		if (type == 0) {
			if (to == 0) query = '/delete-pending-equity-partnership/' + notification_id
			else query = '/delete-pending-equity-partnership/' + notification_id
		}
		else {
			if (to == 0) query = '/delete-pending-investment/' + notification_id
			else query = '/delete-pending-investment/' + notification_id
		}
		var button = "<input class = 'btn btn-default approval' query = '" + query + "' value = 'Reject'/>"
		return button
	}
	$(".notifications").html('<center><b>NOTIFICATIONS</b></center><hr>')
	if ($('#member_id').length > 0) { // if user logged in
		$.get('/load-notifications', function(data){
			var result = data.result
			for (index in result) {
				var company_id = result[index].company_id
				var from_id = result[index].from_id
				var equity = result[index].equity
				var job = result[index].job
				var contribution = result[index].contribution
				var to = result[index].to
				var to_id = result[index].to_id
				var type = result[index].type
				var notification_id = result[index]._id
				var company_name, from_name
				$.ajax({
					url: '/get_company_by_id/' + company_id,
					success: function(data) { 
						company_name = data.name
					},
					async: false 
				})
				$.ajax({
					url: '/get_user_by_id/' + from_id,
					success: function(data) { 
						from_name = data.name
					},
					async: false
				})
				var notification = prepareNotification(company_name, from_name, equity, job, contribution, to, type)
				var notifications_current = $(".notifications").html()
				var button = prepareAcceptButton(company_id, to_id, from_id, notification_id, to, type)
				var nbutton = prepareRejectButton(company_id, to_id, from_id, notification_id, to, type)
				$(".notifications").html(notifications_current + '<p>' + notification + '<p>' + button + nbutton + '<hr>')
			}
			$(".notifications").html($(".notifications").html() + '<center><p>No more notifications.</p></center><hr>')
		})
	}
	else {
		var notifications_current = $(".notifications").html()
		$(".notifications").html(notifications_current + '<center><p>No notifications.</p></center><hr>')
		$(".side-tab").hover(function(){
			$(this).popover('toggle')
		})
	}
})