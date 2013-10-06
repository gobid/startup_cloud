$(document).ready(function() {

	var typingTimer
	var doneTypingInterval = 500

	if ($("#company_id").length == 0) { // no company selected.
		$(".first_create_warning").hover(function(){
			$(this).popover('toggle')
		})
	}

	$('#company_image').hover(function(){
		$('#company_image').popover('toggle')
	})

	$('#create_company').hover(function(){
		$('#create_company').popover('toggle')
	})

	if ($('#company_title').val() != '') $('#company_title_gp').addClass('has-success')
	$('#company_title').keyup(function(){
		typingTimer = setTimeout(doneTyping_company_title, doneTypingInterval);
	})
	$('#company_title').focusout(function(){
		typingTimer = setTimeout(doneTyping_company_title, doneTypingInterval);
		$('#company_title').popover('hide')
	})
	$('#company_title').keydown(function(){
		$('#company_title_gp').removeClass('has-success')
		$('#company_title_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#company_title').focusin(function(){
		if ($("#company_id").length != 0) {
			$('#company_title_gp').removeClass('has-success')
			$('#company_title_gp').addClass('has-warning')
		}
	})
	$('#company_title').popover('show')
	$('#company_title').keypress(function(){
		$('#company_title').popover('hide')
	})
	function doneTyping_company_title() {
		var val = $('#company_title').val()
		// save in db		
		if ($("#company_id").length != 0) { // if company in database already and is a param passed to jade
			$.get('/save_company_record/' + $('#company_id').val() + '/name/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#company_title_gp').removeClass('has-warning')
				if (val != '') $('#company_title_gp').addClass('has-success')
			});
		}
	}

	if ($('#slogan').val() != '') $('#slogan_gp').addClass('has-success')
	$('#slogan').keyup(function(){
		typingTimer = setTimeout(doneTyping_slogan, doneTypingInterval);
	})
	$('#slogan').focusout(function(){
		typingTimer = setTimeout(doneTyping_slogan, doneTypingInterval);
		$('#slogan').popover('hide')
	})
	$('#slogan').keydown(function(){
		$('#slogan_gp').removeClass('has-success')
		$('#slogan_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#slogan').focusin(function(){
		$('#slogan').popover('show')
		if ($("#company_id").length != 0) {
			$('#slogan_gp').removeClass('has-success')
			$('#slogan_gp').addClass('has-warning')
		}
	})
	$('#slogan').keypress(function(){
		$('#slogan').popover('hide')
	})
	function doneTyping_slogan(){
		var val = $('#slogan').val()
		// save in db
		if ($("#company_id").length != 0) {
			$.get('/save_company_record/' + $('#company_id').val() + '/slogan/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#slogan_gp').removeClass('has-warning')
				if (val != '') $('#slogan_gp').addClass('has-success')
			});
		}
	}

	if ($('#description').val() != '') $('#description_gp').addClass('has-success')
	$('#description').keyup(function(){
		typingTimer = setTimeout(doneTyping_description, doneTypingInterval);
	})
	$('#description').focusout(function(){
		typingTimer = setTimeout(doneTyping_description, doneTypingInterval);
		$('#description').popover('hide')
	})
	$('#description').keydown(function(){
		$('#description_gp').removeClass('has-success')
		$('#description_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})	
	$('#description').focusin(function(){
		$('#description').popover('show')
		if ($("#company_id").length != 0) {
			$('#description_gp').removeClass('has-success')
			$('#description_gp').addClass('has-warning')
		}
	})
	$('#description').keypress(function(){
		$('#description').popover('hide')
	})
	function doneTyping_description(){
		var val = $('#description').val()
		// save in db
		if ($("#company_id").length != 0) {
			$.get('/save_company_record/' + $('#company_id').val() + '/description/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#description_gp').removeClass('has-warning')
				if (val != '') $('#description_gp').addClass('has-success')
			});
		}
	}

	if ($('#website').val() != '') $('#website_gp').addClass('has-success')
	$('#website').keyup(function(){
		typingTimer = setTimeout(doneTyping_website, doneTypingInterval);
	})
	$('#website').focusout(function(){
		typingTimer = setTimeout(doneTyping_website, doneTypingInterval);
		$('#website').popover('hide')
	})
	$('#website').keydown(function(){
		$('#website_gp').removeClass('has-success')
		$('#website_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#website').focusin(function(){
		$('#website').popover('show')
		if ($("#company_id").length != 0) {	
			$('#website_gp').removeClass('has-success')
			$('#website_gp').addClass('has-warning')
		}
	})
	$('#website').keypress(function(){
		$('#website').popover('hide')
	})
	function doneTyping_website(){
		var val = $('#website').val()
		// save in db
		if ($("#company_id").length != 0) {
			$.get('/save_company_record/' + $('#company_id').val() + '/website/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#website_gp').removeClass('has-warning')
				if (val != '') $('#website_gp').addClass('has-success')
			});
		}
	}

	if ($('#facebook').val() != '') {
		$('#facebook_gp').addClass('has-success')
		$('#company_image').html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + $("#facebook").val() + "/picture?type=large'>")
	}
	$('#facebook').keyup(function(){
		typingTimer = setTimeout(doneTyping_facebook, doneTypingInterval);
	})
	$('#facebook').focusout(function(){
		typingTimer = setTimeout(doneTyping_facebook, doneTypingInterval);
		$('#facebook').popover('hide')
	})
	$('#facebook').keydown(function(){
		$('#facebook_gp').removeClass('has-success')
		$('#facebook_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#facebook').focusin(function(){
		$('#facebook').popover('show')
		if ($("#company_id").length != 0) {
			$('#facebook_gp').removeClass('has-success')
			$('#facebook_gp').addClass('has-warning')
		}
	})
	$('#facebook').keypress(function(){
		$('#facebook').popover('hide')
	})
	function doneTyping_facebook(){
		var val = $('#facebook').val()
		// save in db
		if ($("#company_id").length != 0) {
			$.get('/save_company_record/' + $('#company_id').val() + '/fb_page/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#facebook_gp').removeClass('has-warning')
				if (val != '') $('#facebook_gp').addClass('has-success')
				$('#company_image').html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + $("#facebook").val() + "/picture?type=large'>")
			});
		}
	}

	if ($('#twitter').val() != '') $('#twitter_gp').addClass('has-success')
	$('#twitter').keyup(function(){
		typingTimer = setTimeout(doneTyping_twitter, doneTypingInterval);
	})
	$('#twitter').focusout(function(){
		typingTimer = setTimeout(doneTyping_twitter, doneTypingInterval);
		$('#twitter').popover('hide')
	})
	$('#twitter').keydown(function(){
		$('#twitter_gp').removeClass('has-success')
		$('#twitter_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#twitter').focusin(function(){
		$('#twitter').popover('show')
		if ($("#company_id").length != 0) {
			$('#twitter_gp').removeClass('has-success')
			$('#twitter_gp').addClass('has-warning')
		}
	})
	$('#twitter').keypress(function(){
		$('#twitter').popover('hide')
	})
	function doneTyping_twitter(){
		var val = $('#twitter').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/twitter/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#twitter_gp').removeClass('has-warning')
				if (val != '') $('#twitter_gp').addClass('has-success')
			});
		}
	}

	if ($('#blog').val() != '') $('#blog_gp').addClass('has-success')
	$('#blog').keyup(function(){
		typingTimer = setTimeout(doneTyping_blog, doneTypingInterval);
	})
	$('#blog').focusout(function(){
		typingTimer = setTimeout(doneTyping_blog, doneTypingInterval);
		$('#blog').popover('hide')
	})
	$('#blog').keydown(function(){
		$('#blog_gp').removeClass('has-success')
		$('#blog_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#blog').focusin(function(){
		$('#blog').popover('show')
		if ($("#company_id").length != 0) {
			$('#blog_gp').removeClass('has-success')
			$('#blog_gp').addClass('has-warning')
		}
	})
	$('#blog').keypress(function(){
		$('#blog').popover('hide')
	})
	function doneTyping_blog(){
		var val = $('#blog').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/blog/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#blog_gp').removeClass('has-warning')
				if (val != '') $('#blog_gp').addClass('has-success')
			});
		}	
	}

	if ($('#industry-value')) $("#industry option[value='" + $("#industry_value").val() + "']").prop('selected',true)
	if ($('#industry').val() != '' && $('#industry').val() != 'Select Industry') $('#industry_gp').addClass('has-success')
	$('#industry').change(function(){
		typingTimer = setTimeout(doneTyping_industry, doneTypingInterval);
		$('#industry').popover('hide')
	})
	$('#industry').focusin(function(){
		$('#industry').popover('show')
		if ($("#company_id").length != 0) {
			$('#industry_gp').removeClass('has-success')
			$('#industry_gp').addClass('has-warning')
		}
	})
	$('#industry').focusout(function(){
		typingTimer = setTimeout(doneTyping_industry, doneTypingInterval);
		$('#industry').popover('hide')
	})
	function doneTyping_industry(){
		var val = $('#industry').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/category/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#industry_gp').removeClass('has-warning')
				if (val != '') $('#industry_gp').addClass('has-success')
			});
		}
	}

	if ($('#phone').val() != '') $('#phone_gp').addClass('has-success')
	$('#phone').keyup(function(){
		typingTimer = setTimeout(doneTyping_phone, doneTypingInterval);
	})
	$('#phone').focusout(function(){
		typingTimer = setTimeout(doneTyping_phone, doneTypingInterval);
		$('#phone').popover('hide')
	})
	$('#phone').keydown(function(){
		$('#phone_gp').removeClass('has-success')
		$('#phone_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})	
	$('#phone').focusin(function(){
		$('#phone').popover('show')
		if ($("#company_id").length != 0) {
			$('#phone_gp').removeClass('has-success')
			$('#phone_gp').addClass('has-warning')
		}
	})
	$('#phone').keypress(function(){
		$('#phone').popover('hide')
	})
	function doneTyping_phone(){
		var val = $('#phone').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/phone/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#phone_gp').removeClass('has-warning')
				if (val != '') $('#phone_gp').addClass('has-success')
			});
		}
	}

	if ($('#email').val() != '') $('#email_gp').addClass('has-success')
	$('#email').keyup(function(){
		typingTimer = setTimeout(doneTyping_email, doneTypingInterval);
	})
	$('#email').focusout(function(){
		typingTimer = setTimeout(doneTyping_email, doneTypingInterval);
		$('#email').popover('hide')
	})
	$('#email').keydown(function(){
		$('#email_gp').removeClass('has-success')
		$('#email_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#email').focusin(function(){
		$('#email').popover('show')
		if ($("#company_id").length != 0) {
			$('#email_gp').removeClass('has-success')
			$('#email_gp').addClass('has-warning')
		}
	})
	$('#email').keypress(function(){
		$('#email').popover('hide')
	})
	function doneTyping_email(){
		var val = $('#email').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/email/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#email_gp').removeClass('has-warning')
				if (val != '') $('#email_gp').addClass('has-success')
			});
		}
	}

	if ($('#founded').val() != '') $('#founded_gp').addClass('has-success')
	$('#founded').keyup(function(){
		typingTimer = setTimeout(doneTyping_founded, doneTypingInterval);
	})
	$('#founded').focusout(function(){
		typingTimer = setTimeout(doneTyping_founded, doneTypingInterval);
		$('#founded').popover('hide')
	})
	$('#founded').keydown(function(){
		$('#founded_gp').removeClass('has-success')
		$('#founded_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#founded').focusin(function(){
		$('#founded').popover('show')
		if ($("#company_id").length != 0) {
			$('#founded_gp').removeClass('has-success')
			$('#founded_gp').addClass('has-warning')
		}
	})
	$('#founded').keypress(function(){
		$('#founded').popover('hide')
	})
	function doneTyping_founded(){
		var val = $('#founded').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/founded/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#founded_gp').removeClass('has-warning')
				if (val != '') $('#founded_gp').addClass('has-success')
			});
		}
	}

	if ($('#address').val() != '') $('#address_gp').addClass('has-success')
	$('#address').keyup(function(){
		typingTimer = setTimeout(doneTyping_address, doneTypingInterval);
	})
	$('#address').focusout(function(){
		typingTimer = setTimeout(doneTyping_address, doneTypingInterval);
		$('#address').popover('hide')
	})
	$('#address').keydown(function(){
		$('#address_gp').removeClass('has-success')
		$('#address_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#address').focusin(function(){
		$('#address').popover('show')
		if ($("#company_id").length != 0) {
			$('#address_gp').removeClass('has-success')
			$('#address_gp').addClass('has-warning')
		}
	})
	$('#address').keypress(function(){
		$('#address').popover('hide')
	})
	function doneTyping_address(){
		var val = $('#address').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/address/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#address_gp').removeClass('has-warning')
				if (val != '') $('#address_gp').addClass('has-success')
			});
		}
	}

	if ($('#city').val() != '') $('#city_gp').addClass('has-success')
	$('#city').keyup(function(){
		typingTimer = setTimeout(doneTyping_city, doneTypingInterval);
	})
	$('#city').focusout(function(){
		typingTimer = setTimeout(doneTyping_city, doneTypingInterval);
		$('#city').popover('hide')
	})
	$('#city').keydown(function(){
		$('#city_gp').removeClass('has-success')
		$('#city_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#city').focusin(function(){
		$('#city').popover('show')
		if ($("#company_id").length != 0) {
			$('#city_gp').removeClass('has-success')
			$('#city_gp').addClass('has-warning')
		}
	})
	$('#city').keypress(function(){
		$('#city').popover('hide')
	})
	function doneTyping_city(){
		var val = $('#city').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/city/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#city_gp').removeClass('has-warning')
				if (val != '') $('#city_gp').addClass('has-success')
			});
		}
	}

	if ($('#state').val() != '') $('#state_gp').addClass('has-success')
	$('#state').keyup(function(){
		typingTimer = setTimeout(doneTyping_state, doneTypingInterval);
	})
	$('#state').focusout(function(){
		typingTimer = setTimeout(doneTyping_state, doneTypingInterval);
		$('#state').popover('hide')
	})
	$('#state').keydown(function(){
		$('#state_gp').removeClass('has-success')
		$('#state_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#state').focusin(function(){
		$('#state').popover('show')
		if ($("#company_id").length != 0) {
			$('#state_gp').removeClass('has-success')
			$('#state_gp').addClass('has-warning')
		}
	})
	$('#state').keypress(function(){
		$('#state').popover('hide')
	})
	function doneTyping_state(){
		var val = $('#state').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/state/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#state_gp').removeClass('has-warning')
				if (val != '') $('#state_gp').addClass('has-success')
			});
		}
	}

	if ($('#country').val() != '') $('#country_gp').addClass('has-success')
	$('#country').keyup(function(){
		typingTimer = setTimeout(doneTyping_country, doneTypingInterval);
	})
	$('#country').focusout(function(){
		typingTimer = setTimeout(doneTyping_country, doneTypingInterval);
		$('#country').popover('hide')
	})
	$('#country').keydown(function(){
		$('#country_gp').removeClass('has-success')
		$('#country_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#country').focusin(function(){
		$('#country').popover('show')
		if ($("#company_id").length != 0) {
			$('#country_gp').removeClass('has-success')
			$('#country_gp').addClass('has-warning')
		}
	})
	$('#country').keypress(function(){
		$('#country').popover('hide')
	})
	function doneTyping_country(){
		var val = $('#country').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/country/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#country_gp').removeClass('has-warning')
				if (val != '') $('#country_gp').addClass('has-success')
			});
		}
	}

	if ($('#zip').val() != '') $('#zip_gp').addClass('has-success')
	$('#zip').keyup(function(){
		typingTimer = setTimeout(doneTyping_zip, doneTypingInterval);
	})
	$('#zip').focusout(function(){
		typingTimer = setTimeout(doneTyping_zip, doneTypingInterval);
		$('#zip').popover('hide')
	})
	$('#zip').keydown(function(){
		$('#zip_gp').removeClass('has-success')
		$('#zip_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#zip').focusin(function(){
		$('#zip').popover('show')
		if ($("#company_id").length != 0) {
			$('#zip_gp').removeClass('has-success')
			$('#zip_gp').addClass('has-warning')
		}
	})
	$('#zip').keypress(function(){
		$('#zip').popover('hide')
	})
	function doneTyping_zip(){
		var val = $('#zip').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/zip/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#zip_gp').removeClass('has-warning')
				if (val != '') $('#zip_gp').addClass('has-success')
			});
		}
	}

	if ($('#company_video').val() != '') $('#company_video_gp').addClass('has-success')
	$('#company_video').keyup(function(){
		typingTimer = setTimeout(doneTyping_company_video, doneTypingInterval);
	})
	$('#company_video').focusout(function(){
		typingTimer = setTimeout(doneTyping_company_video, doneTypingInterval);
		$('#company_video').popover('hide')
	})
	$('#company_video').keydown(function(){
		$('#company_video_gp').removeClass('has-success')
		$('#company_video_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#company_video').focusin(function(){
		$('#company_video').popover('show')
		if ($("#company_id").length != 0) {
			$('#company_video_gp').removeClass('has-success')
			$('#company_video_gp').addClass('has-warning')
		}
	})
	$('#company_video').keypress(function(){
		$('#company_video').popover('hide')
	})
	function doneTyping_company_video(){
		var val = $('#company_video').val()
		// save in db
		if ($("#company_id").length != 0) {	
			$.get('/save_company_record/' + $('#company_id').val() + '/video/0/' + val + ' /', function(data) {
				$('.result').html(data);
				console.log('Load to db was performed.')
				$('#company_video_gp').removeClass('has-warning')
				if (val != '') $('#company_video_gp').addClass('has-success')
			});
		}
	}

	$('#create_company').click(function(){
		if ($('#company_title').val().trim() == '' || $('#industry').val().trim() == '' ||
			$('#email').val().trim() == '' || $('#founded').val().trim() == '' || $('#country').val().trim() == '') {
			$('#missingfields').show()
		}
		else {
			var query = "/create_company/"
			query += encodeURIComponent($('#company_title').val() + ' ') + '/'
			query += encodeURIComponent($('#slogan').val() + ' ') + '/'
			query += encodeURIComponent($('#description').val() + ' ') + '/'
			query += encodeURIComponent($('#website').val() + ' ') + '/'
			query += encodeURIComponent($('#facebook').val() + ' ') + '/'
			query += encodeURIComponent($('#twitter').val() + ' ') + '/'
			query += encodeURIComponent($('#blog').val() + ' ') + '/'
			query += encodeURIComponent($('#industry').val() + ' ') + '/'
			query += encodeURIComponent($('#phone').val() + ' ') + '/'
			query += encodeURIComponent($('#email').val() + ' ') + '/'
			query += encodeURIComponent($('#founded').val() + ' ') + '/'
			query += encodeURIComponent($('#address').val() + ' ') + '/'
			query += encodeURIComponent($('#city').val() + ' ') + '/'
			query += encodeURIComponent($('#state').val() + ' ') + '/'
			query += encodeURIComponent($('#country').val() + ' ') + '/'
			query += encodeURIComponent($('#zip').val() + ' ') + '/'
			query += encodeURIComponent($('#company_video').val() + ' ')
			console.log('query is ', query)
			$.get(query, function(data) {
				$('.result').html(data);
				console.log('Load was performed.');
				var new_company_id = data.company_id
				location.replace('/entrepreneur/company/' + new_company_id)
			});
		}
	})
})