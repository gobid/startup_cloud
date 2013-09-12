<?php
	require_once('vendor/seostats/seostats/SEOstats/bootstrap.php');
	use \SEOstats\Services as SEOstats;
	try {
		$url = "http://" . $argv[1];
		$name = $argv[2];
		$field = $argv[3];
		$seostats = new \SEOstats\SEOstats;
		if ($seostats->setUrl($url)) {
			$stats = null;
			if ($field == "alexa_global") $stats = array("alexa_global" => SEOstats\Alexa::getGlobalRank());
			if ($field == "alexa_monthly") $stats = array("alexa_monthly" => SEOstats\Alexa::getMonthlyRank());
			if ($field == "alexa_weekly") $stats = array("alexa_weekly" => SEOstats\Alexa::getWeeklyRank());
			if ($field == "alexa_daily") $stats = array("alexa_daily" => SEOstats\Alexa::getDailyRank());
			if ($field == "alexa_country") $stats = array("alexa_country" => SEOstats\Alexa::getCountryRank());
			if ($field == "alexa_backlink") $stats = array("alexa_backlink" => SEOstats\Alexa::getBacklinkCount());
			if ($field == "alexa_page_load_time") $stats = array("alexa_page_load_time" => SEOstats\Alexa::getPageLoadTime());
			if ($field == "alexa_daily_traffic_graph") $stats = array("alexa_daily_traffic_graph" => SEOstats\Alexa::getTrafficGraph(1, false, 500, 250));
			if ($field == "alexa_daily_pageviews_percent_graph") $stats = array("alexa_daily_pageviews_percent_graph" => SEOstats\Alexa::getTrafficGraph(2, false, 500, 250));
			if ($field == "alexa_daily_pageviews_peruser_graph") $stats = array("alexa_daily_pageviews_peruser_graph" => SEOstats\Alexa::getTrafficGraph(3, false, 500, 250));
			if ($field == "alexa_time_on_site_graph") $stats = array("alexa_time_on_site_graph" => SEOstats\Alexa::getTrafficGraph(4, false, 500, 250));
			if ($field == "alexa_bounce_rate_graph") $stats = array("alexa_bounce_rate_graph" => SEOstats\Alexa::getTrafficGraph(5, false, 500, 250));
			if ($field == "alexa_search_visits_graph") $stats = array("alexa_search_visits_graph" => SEOstats\Alexa::getTrafficGraph(6, 0, 500, 250));
			if ($field == "google_page_rank") $stats = array("google_page_rank" => SEOstats\Google::getPageRank());
			if ($field == "google_page_speed") $stats = array("google_page_speed" => SEOstats\Google::getPageSpeedAnalysis());
			if ($field == "google_page_speed_score") $stats = array("google_page_speed_score" => SEOstats\Google::getPagespeedScore());
			if ($field == "google_site_index_total") $stats = array("google_site_index_total" => SEOstats\Google::getSiteindexTotal());
			if ($field == "google_backlinks_total") $stats = array("google_backlinks_total" => SEOstats\Google::getBacklinksTotal());
			if ($field == "google_search_results_total") $stats = array("google_search_results_total" => SEOstats\Google::getSearchResultsTotal($name));
			if ($field == "google_serps") $stats = array("google_serps" => SEOstats\Google::getSerps($name));
			if ($field == "google_serps_url") $stats = array("google_serps_url" => SEOstats\Google::getSerps("site:" . $url, 20));
			if ($field == "google_serps_positions") $stats = array("google_serps_positions" => SEOstats\Google::getSerps('keyword', 10, $url));
			if ($field == "open_site_explorer_metric") $stats = array("open_site_explorer_metric" => SEOstats\OpenSiteExplorer::getPageMetrics());
			if ($field == "semrush_domain_rank") $stats = array("semrush_domain_rank" => SEOstats\SemRush::getDomainRank());
			if ($field == "semrush_domain_rank_history") $stats = array("semrush_domain_rank_history" => SEOstats\SemRush::getDomainRankHistory());
			if ($field == "semrush_competitors") $stats = array("semrush_competitors" => SEOstats\SemRush::getCompetitors());
			if ($field == "semrush_organic_keywords") $stats = array("semrush_organic_keywords" => SEOstats\SemRush::getOrganicKeywords());
			if ($field == "semrush_search_traffic_graph") $stats = array("semrush_search_traffic_graph" => SEOstats\SemRush::getDomainGraph(1));
			if ($field == "semrush_search_traffic_price_graph") $stats = array("semrush_search_traffic_price_graph" => SEOstats\SemRush::getDomainGraph(2));
			if ($field == "semrush_search_adwords_graph") $stats = array("semrush_search_adwords_graph" => SEOstats\SemRush::getDomainGraph());
			if ($field == "semrush_search_adwords_traffic_graph") $stats = array("semrush_search_adwords_traffic_graph" => SEOstats\SemRush::getDomainGraph());
			if ($field == "semrush_search_adwords_traffic_price_graph") $stats = array("semrush_search_adwords_traffic_price_graph" => SEOstats\SemRush::getDomainGraph());
			if ($field == "sistrix_visibility") $stats = array("sistrix_visibility" => SEOstats\Sistrix::getVisibilityIndex());
			if ($field == "google_plus_one") $stats = array("google_plus_one" => SEOstats\Social::getGooglePlusShares()); 
			if ($field == "facebook_shares") $stats = array("facebook_shares" => SEOstats\Social::getFacebookShares());
			if ($field == "twitter_mentions") $stats = array("twitter_mentions" => SEOstats\Social::getTwitterShares());
			if ($field == "delicious_shares") $stats = array("delicious_shares" => SEOstats\Social::getDeliciousShares());
			if ($field == "top_ten_delicious_tags") $stats = array("top_ten_delicious_tags" => SEOstats\Social::getDeliciousTopTags());
			if ($field == "digg_shares") $stats = array("digg_shares" => SEOstats\Social::getDiggShares());
			if ($field == "linkedin_shares") $stats = array("linkedin_shares" => SEOstats\Social::getLinkedInShares());
			if ($field == "pinterest_shares") $stats = array("pinterest_shares" => SEOstats\Social::getPinterestShares());
			if ($field == "stumbleupon_shares") $stats = array("stumbleupon_shares" => SEOstats\Social::getStumbleUponShares());
			if ($field == "vkontakte_shares") $stats = array("vkontakte_shares" => SEOstats\Social::getVKontakteShares());
			echo json_encode($stats) . "\n";
		}
	}
	catch (SEOstatsException $e) {
		die($e->getMessage());
	}
?>