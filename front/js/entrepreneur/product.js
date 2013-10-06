$(document).ready(function() {

	var typingTimer
	var doneTypingInterval = 500

	$(document).on('mouseover', "img[field='product_image']", function(){
		$("img[field='product_image'][number = '" + this.getAttribute('number') + "']").popover('toggle')
	})
	$(document).on('mouseout', "img[field='product_image']", function(){
		$("img[field='product_image'][number = '" + this.getAttribute('number') + "']").popover('toggle')
	})

	var num_fields = $("#create_new_product").attr('index')
	for (var i = 0; i < num_fields; i++) {
		// image initialization 
		var fb_page = $("input[field='product_subtitle'][number='" + i + "']").val()
		if (fb_page != '') 
			$(".form-group[field='product_image_gp'][number='" + i + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + fb_page + "/picture?type=large'>")
		// success initialization for filled in fields
		if ($("input[field='product_name'][number='" + i + "']").val() != '') 
			$(".form-group[field='product_name_gp'][number='" + i + "']").addClass('has-success')
		
		if ($("input[field='product_subtitle'][number='" + i + "']").val() != '') 
			$(".input-group[field='product_subtitle_gp'][number='" + i + "']").addClass('has-success')
		
		if ($("textarea[field='product_description'][number='" + i + "']").val() != '') 
			$(".form-group[field='product_description_gp'][number='" + i + "']").addClass('has-success')
		
		if ($("input[field='product_video'][number='" + i + "']").val() != '') 
			$(".input-group[field='product_video_gp'][number='" + i + "']").addClass('has-success')
	}


	$(document).on('keyup', "input[field='product_name']", function(){
		typingTimer = setTimeout(doneTyping_product_name(this), doneTypingInterval);
	})
	$(document).on('focusout', "input[field='product_name']", function(){
		typingTimer = setTimeout(doneTyping_product_name(this), doneTypingInterval);
	})
	$(document).on('keydown', "input[field='product_name']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_name_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_name_gp'][number = '" + num + "']").addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$(document).on('focusin', "input[field='product_name']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_name_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_name_gp'][number = '" + num + "']").addClass('has-warning')
	})
	function doneTyping_product_name(obj){
		console.log('in donetyping')
		var num = obj.getAttribute('number')
		var val = obj.value
		$.get('/save_company_record/' + $('#company_id').val() + '/product_name/' + num + '/' + encodeURIComponent(obj.value) + ' /', function(data) {
			$('.result').html(data);
			console.log('Load to db was performed: ', data)
			$(".form-group[field = 'product_name_gp'][number = '" + num + "']").removeClass('has-warning')
			if (val != '') $(".form-group[field = 'product_name_gp'][number = '" + num + "']").addClass('has-success')
			console.log('val', val)
		});
	}

	$(document).on('keyup', "input[field='product_subtitle']", function(){
		typingTimer = setTimeout(doneTyping_product_subtitle(this), doneTypingInterval);
	})
	$(document).on('focusout', "input[field='product_subtitle']", function(){
		typingTimer = setTimeout(doneTyping_product_subtitle(this), doneTypingInterval);
	})
	$(document).on('keydown', "input[field='product_subtitle']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_subtitle_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_subtitle_gp'][number = '" + num + "']").addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$(document).on('focusin', "input[field='product_subtitle']", function(){
		var num = this.getAttribute('number')
		$(".input-group[field = 'product_subtitle_gp'][number = '" + num + "']").removeClass('has-success')
		$(".input-group[field = 'product_subtitle_gp'][number = '" + num + "']").addClass('has-warning')
	})
	function doneTyping_product_subtitle(obj){
		var num = obj.getAttribute('number')
		var val = obj.value
		$.get('/save_company_record/' + $('#company_id').val() + '/product_subtitle/' + obj.getAttribute('number') + '/' + encodeURIComponent(obj.value) + ' /', function(data) {
			$('.result').html(data);
			console.log('Load to db was performed: ', data)
			$(".input-group[field = 'product_subtitle_gp'][number = '" + num + "']").removeClass('has-warning')
			if (val != '') { 
				$(".input-group[field = 'product_subtitle_gp'][number = '" + num + "']").addClass('has-success')
				$(".form-group[field='product_image_gp'][number='" + num + "']").html("<img class = 'img-rounded' style = 'width:125px;' src = 'https://graph.facebook.com/" + val + "/picture?type=large'>")
			}
		});
	}

	$(document).on('keyup', "textarea[field='product_description']", function(){
		typingTimer = setTimeout(doneTyping_product_description(this), doneTypingInterval);
	})
	$(document).on('focusout', "textarea[field='product_description']", function(){
		typingTimer = setTimeout(doneTyping_product_description(this), doneTypingInterval);
	})
	$(document).on('keydown', "textarea[field='product_description']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_description_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_description_gp'][number = '" + num + "']").addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$(document).on('focusin', "textarea[field='product_description']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_description_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_description_gp'][number = '" + num + "']").addClass('has-warning')
	})
	function doneTyping_product_description(obj){
		var num = obj.getAttribute('number')
		var val = obj.value
		$.get('/save_company_record/' + $('#company_id').val() + '/product_description/' + obj.getAttribute('number') + '/' + encodeURIComponent(obj.value) + ' /', function(data) {
			$('.result').html(data);
			console.log('Load to db was performed: ', data)
			$(".form-group[field = 'product_description_gp'][number = '" + num + "']").removeClass('has-warning')
			if (val != '') $(".form-group[field = 'product_description_gp'][number = '" + num + "']").addClass('has-success')
		});
	}

	$(document).on('keyup', "input[field='product_video']", function(){
		typingTimer = setTimeout(doneTyping_product_video(this), doneTypingInterval);
	})
	$(document).on('focusout', "input[field='product_video']", function(){
		typingTimer = setTimeout(doneTyping_product_video(this), doneTypingInterval);
	})
	$(document).on('keydown', "input[field='product_video']", function(){
		var num = this.getAttribute('number')
		$(".form-group[field = 'product_video_gp'][number = '" + num + "']").removeClass('has-success')
		$(".form-group[field = 'product_video_gp'][number = '" + num + "']").addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$(document).on('focusin', "input[field='product_video']", function(){
		var num = this.getAttribute('number')
		$(".input-group[field = 'product_video_gp'][number = '" + num + "']").removeClass('has-success')
		$(".input-group[field = 'product_video_gp'][number = '" + num + "']").addClass('has-warning')
	})
	function doneTyping_product_video(obj){
		var num = obj.getAttribute('number')
		var val = obj.value
		$.get('/save_company_record/' + $('#company_id').val() + '/product_video/' + obj.getAttribute('number') + '/' + encodeURIComponent(obj.value) + ' /', function(data) {
			$('.result').html(data);
			console.log('Load to db was performed: ', data) 
			$(".input-group[field = 'product_video_gp'][number = '" + num + "']").removeClass('has-warning')
			if (val != '') $(".input-group[field = 'product_video_gp'][number = '" + num + "']").addClass('has-success')
		});
	}

	$(document).on('click', '#create_new_product', function(){
		var index = this.getAttribute('index')
		var new_html = "<div class='row'><div class='col-xs-3'><div class = 'form-group' field = 'product_image_gp' number = '" + index + "'><img src='data:image/png;base64,' data-src='holder.js/125x100' alt='Generic placeholder image' field='product_image' number='" + index + "' class='img-rounded' data-placement='left' data-container = 'body' data-content='For a product image, simply fill out your facebook page information below and we will load your facebook page profile picture.' data-trigger = 'manual'></div></div><div class='col-xs-9'><div class = 'form-group' field = 'product_name_gp' number = '" + index + "'><input placeholder='Product name' field='product_name' number='" + index + "' class='form-control input-lg'></div><div class = 'input-group' field = 'product_subtitle_gp' number = '" + index + "'><span class = 'input-group-addon'>https://facebook.com/</span><input placeholder='product facebook page' field='product_subtitle' number='" + index + "' class='form-control'></div></div></div><br><div class='row'><div class='col-xs-12'><div class = 'form-group' field = 'product_description_gp' number = '" + index + "'><textarea rows='3' placeholder='Description' field='product_description' number='" + index + "' class='form-control'></textarea></div><div class='input-group' field = 'product_video_gp' number = '" + index + "'><span class='input-group-addon'>http://youtube.com/</span><input type='text' placeholder='product video' field='product_video' number='" + index + "' class='form-control'></div></div></div><br>"
		$('.product_list').append(new_html)
		$('#create_new_product').attr('index', parseInt($('#create_new_product').attr('index')) + 1) // increment index
		Holder.run({
			images: $("img[field='product_image'][number='" + index + "']")[0]
		})
	})

})
