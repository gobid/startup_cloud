$(document).ready(function() {

		// first fb stats
		$.get('/get_fb_data/' + encodeURIComponent($("#company_fb").val()), function(data){
			$('.fb_talking_about').html(data.talking_about_count)
			$('.fb_were_here').html(data.were_here_count)
			$('.fb_likes').html(data.likes)
		})
		// now graphs
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_daily_traffic_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.alexa_daily_traffic').html('<br>' + data.alexa_daily_traffic_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_daily_pageviews_percent_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.alexa_daily_pageviews_percent').html('<br>' + data.alexa_daily_pageviews_percent_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_daily_pageviews_peruser_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.alexa_daily_pageviews_peruser').html('<br>' + data.alexa_daily_pageviews_peruser_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_time_on_site_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.alexa_time_on_site').html('<br>' + data.alexa_time_on_site_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_bounce_rate_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.alexa_bounce_rate').html('<br>' + data.alexa_bounce_rate_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/semrush_search_traffic_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.semrush_search_traffic').html('<br>' + data.semrush_search_traffic_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/semrush_search_traffic_price_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.semrush_search_traffic_price').html('<br>' + data.semrush_search_traffic_price_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/semrush_search_adwords_traffic_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.semrush_search_adwords_traffic').html('<br>' + data.semrush_search_adwords_traffic_graph + '<br><br>')
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/semrush_search_adwords_traffic_price_graph', function(data){
			if (data == null) data = "<br><table class = 'table'><tr><td>No data for graph.</td></tr></table><br>"
			$('.semrush_search_adwords_traffic_price').html('<br>' + data.semrush_search_adwords_traffic_price_graph + '<br><br>')
		})
		// now for table
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_global', function(data){
			if (data == null) data = {alexa_global: 'n.a'}
			$('.alexa_global').html(data.alexa_global)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_monthly', function(data){
			if (data == null) data = {alexa_monthly: 'n.a'}
			$('.alexa_monthly').html(data.alexa_monthly)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_weekly', function(data){
			if (data == null) data = {alexa_weekly: 'n.a'}
			$('.alexa_weekly').html(data.alexa_weekly)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_daily', function(data){
			if (data == null) data = {alexa_daily: 'n.a'}
			$('.alexa_daily').html(data.alexa_daily)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_country', function(data){
			if (data == null) data = {alexa_country: 'n.a'}
			$('.alexa_country').html(data.alexa_country)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_backlink', function(data){
			if (data == null) data = {alexa_backlink: 'n.a'}
			$('.alexa_backlink').html(data.alexa_backlink)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/alexa_page_load_time', function(data){
			if (data == null) data = {alexa_page_load_time: 'n.a'}
			$('.alexa_page_load_time').html(data.alexa_page_load_time)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_page_rank', function(data){
			if (data == null) data = {google_page_rank: 'n.a'}
			if (isNaN(parseInt(data.google_page_rank))) data.google_page_rank = 'n.a.'
			$('.google_page_rank').html(data.google_page_rank)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_page_speed_score', function(data){
			if (data == null) data = {google_page_speed_score: 'n.a'}
			$('.google_page_speed_score').html(data.google_page_speed_score)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_site_index_total', function(data){
			if (data == null) data = {google_site_index_total: 'n.a'}
			$('.google_site_index_total').html(data.google_site_index_total)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_backlinks_total', function(data){
			if (data == null) data = {google_backlinks_total: 'n.a'}
			$('.google_backlinks_total').html(data.google_backlinks_total)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_search_results_total', function(data){
			if (data == null) data = {google_search_results_total: 'n.a'}
			$('.google_search_results_total').html(data.google_search_results_total)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/open_site_explorer_metric', function(data){
			if (data == null) data = {open_site_explorer_metric: 'n.a'}
			$('.open_site_explorer_metric').html(data.open_site_explorer_metric.totalInboundLinks)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/sistrix_visibility', function(data){
			if (data == null) data = {sistrix_visibility: 'n.a'}
			$('.sistrix_visibility').html(data.sistrix_visibility.replace(',', '.'))
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/google_plus_one', function(data){
			if (data == null) data = {google_plus_one: 'n.a'}
			$('.google_plus_one').html(data.google_plus_one)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/facebook_shares', function(data){
			if (data == null) data = {facebook_shares: 'n.a'}
			$('.facebook_shares').html(data.facebook_shares.total_count)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/twitter_mentions', function(data){
			if (data == null) data = {twitter_mentions: 'n.a'}
			$('.twitter_mentions').html(data.twitter_mentions)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/delicious_shares', function(data){
			if (data == null) data = {delicious_shares: 'n.a'}
			$('.delicious_shares').html(data.delicious_shares)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/digg_shares', function(data){
			if (data == null) data = {digg_shares: 'n.a'}
			$('.digg_shares').html(data.digg_shares)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/linkedin_shares', function(data){
			if (data == null) data = {linkedin_shares: 'n.a'}
			$('.linkedin_shares').html(data.linkedin_shares)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/pinterest_shares', function(data){
			if (data == null) data = {pinterest_shares: 'n.a'}
			$('.pinterest_shares').html(data.pinterest_shares)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/stumbleupon_shares', function(data){
			if (data == null) data = {stumbleupon_shares: 'n.a'}
			$('.stumbleupon_shares').html(data.stumbleupon_shares)
		})
		$.get('/get_seo_data/' + encodeURIComponent($("#company_site").val()) + '/vkontakte_shares', function(data){
			if (data == null) data = {vkontakte_shares: 'n.a'}
			$('.vkontakte_shares').html(data.vkontakte_shares)
		})

})