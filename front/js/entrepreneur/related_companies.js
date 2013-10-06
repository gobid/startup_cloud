$(document).ready(function() {
	
	var url = $("#company_site").val()
	var name = $("#company_name").val()
	var query = '/get_seo_data/' + encodeURIComponent(url) + '/semrush_competitors'
	$.get(query, function(data){
		if (data == null || data.semrush_competitors == "n.a." || data.semrush_competitors.data.length == 0) 
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

})