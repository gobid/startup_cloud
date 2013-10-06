$(document).ready(function() {
	$.get('/get_user_record/' + $("#public_user_id").val() + '/equity_partnerships', function(data) {
		var partnerships = data.record
		var list = ''
		for (index in partnerships) {
			var name
			var id = partnerships[index].id
			$.ajax({
				url: '/get_company_by_id/' + id,
				success: function(data) { 
					name = data.name
				},
				async: false
			})
			list += "<a href = '/company/" + id + "'>" + name + "</a>&nbsp&nbsp"
		}
		var before = $('.companies_partnered').html()
		$('.companies_partnered').html(before + list)
	})	
})