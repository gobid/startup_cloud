$(document).ready(function() {

	var typingTimer
	var doneTypingInterval = 500


	if ($('#cash').val() != '') $('#cash_gp').addClass('has-success')
	$('#cash').keyup(function(){
		typingTimer = setTimeout(doneTyping_cash, doneTypingInterval);
	})
	$('#cash').focusout(function(){
		typingTimer = setTimeout(doneTyping_cash, doneTypingInterval);
	})
	$('#cash').keydown(function(){
		$('#cash_gp').removeClass('has-success')
		$('#cash_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})
	$('#cash').focusin(function(){
		$('#cash_gp').removeClass('has-success')
		$('#cash_gp').addClass('has-warning')
	})
	function doneTyping_cash(){
		$.get('/save_financial_record/' + $('#company_id').val() + '/cash/' + encodeURIComponent($('#cash').val()) + ' /', function(data) {
			$('#cash_gp').removeClass('has-warning')
			$('#cash_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#accounts_rec').val() != '') $('#accounts_rec_gp').addClass('has-success')
	
	$('#accounts_rec').keyup(function(){
		typingTimer = setTimeout(doneTyping_accounts_rec, doneTypingInterval);
	})
	$('#accounts_rec').focusout(function(){
		typingTimer = setTimeout(doneTyping_accounts_rec, doneTypingInterval);
	})
	$('#accounts_rec').keydown(function(){
		$('#accounts_rec_gp').removeClass('has-success')
		$('#accounts_rec_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#accounts_rec').focusin(function(){
		$('#accounts_rec_gp').removeClass('has-success')
		$('#accounts_rec_gp').addClass('has-warning')
	})
	function doneTyping_accounts_rec(){
		$.get('/save_financial_record/' + $('#company_id').val() + '/accounts_rec/' + encodeURIComponent($('#accounts_rec').val()) + ' /', function(data) {
			$('#accounts_rec_gp').removeClass('has-warning')
			$('#accounts_rec_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#inventories').val() != '') $('#inventories_gp').addClass('has-success')

	$('#inventories').keyup(function(){
		typingTimer = setTimeout(doneTyping_inventories, doneTypingInterval);
	})
	$('#inventories').focusout(function(){
		typingTimer = setTimeout(doneTyping_inventories, doneTypingInterval);
	})
	$('#inventories').keydown(function(){
		$('#inventories_gp').removeClass('has-success')
		$('#inventories_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#inventories').focusin(function(){
		$('#inventories_gp').removeClass('has-success')
		$('#inventories_gp').addClass('has-warning')
	})
	function doneTyping_inventories(){
		$.get('/save_financial_record/' + $('#company_id').val() + '/inventories/' + encodeURIComponent($('#inventories').val()) + ' /', function(data) {
			$('#inventories_gp').removeClass('has-warning')
			$('#inventories_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#prepaid_expenses').val() != '') $('#prepaid_expenses_gp').addClass('has-success')

	$('#prepaid_expenses').keyup(function(){
		typingTimer = setTimeout(doneTyping_prepaid_expenses, doneTypingInterval);
	})
	$('#prepaid_expenses').focusout(function(){
		typingTimer = setTimeout(doneTyping_prepaid_expenses, doneTypingInterval);
	})
	$('#prepaid_expenses').keydown(function(){
		$('#prepaid_expenses_gp').removeClass('has-success')
		$('#prepaid_expenses_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#prepaid_expenses').focusin(function(){
		$('#prepaid_expenses_gp').removeClass('has-success')
		$('#prepaid_expenses_gp').addClass('has-warning')
	})
	function doneTyping_prepaid_expenses(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/prepaid_expenses/' + encodeURIComponent($('#prepaid_expenses').val()) + ' /', function(data) {
			$('#prepaid_expenses_gp').removeClass('has-warning')
			$('#prepaid_expenses_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#prop_plant_equip').val() != '') $('#prop_plant_equip_gp').addClass('has-success')

	$('#prop_plant_equip').keyup(function(){
		typingTimer = setTimeout(doneTyping_prop_plant_equip, doneTypingInterval);
	})
	$('#prop_plant_equip').focusout(function(){
		typingTimer = setTimeout(doneTyping_prop_plant_equip, doneTypingInterval);
	})
	$('#prop_plant_equip').keydown(function(){
		$('#prop_plant_equip_gp').removeClass('has-success')
		$('#prop_plant_equip_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#prop_plant_equip').focusin(function(){
		$('#prop_plant_equip_gp').removeClass('has-success')
		$('#prop_plant_equip_gp').addClass('has-warning')
	})
	function doneTyping_prop_plant_equip(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/prop_plant_equip/' + encodeURIComponent($('#prop_plant_equip').val()) + ' /', function(data) {
			$('#prop_plant_equip_gp').removeClass('has-warning')
			$('#prop_plant_equip_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#intangible').val() != '') $('#intangible_gp').addClass('has-success')

	$('#intangible').keyup(function(){
		typingTimer = setTimeout(doneTyping_intangible, doneTypingInterval);
	})
	$('#intangible').focusout(function(){
		typingTimer = setTimeout(doneTyping_intangible, doneTypingInterval);
	})
	$('#intangible').keydown(function(){
		$('#intangible_gp').removeClass('has-success')
		$('#intangible_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#intangible').focusin(function(){
		$('#intangible_gp').removeClass('has-success')
		$('#intangible_gp').addClass('has-warning')
	})
	function doneTyping_intangible(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/intangible/' + encodeURIComponent($('#intangible').val()) + ' /', function(data) {
			$('#intangible_gp').removeClass('has-warning')
			$('#intangible_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#financial_assets').val() != '') $('#financial_assets_gp').addClass('has-success')

	$('#financial_assets').keyup(function(){
		typingTimer = setTimeout(doneTyping_financial_assets, doneTypingInterval);
	})
	$('#financial_assets').focusout(function(){
		typingTimer = setTimeout(doneTyping_financial_assets, doneTypingInterval);
	})
	$('#financial_assets').keydown(function(){
		$('#financial_assets_gp').removeClass('has-success')
		$('#financial_assets_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#financial_assets').focusin(function(){
		$('#financial_assets_gp').removeClass('has-success')
		$('#financial_assets_gp').addClass('has-warning')
	})
	function doneTyping_financial_assets(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/financial_assets/' + encodeURIComponent($('#financial_assets').val()) + ' /', function(data) {
			$('#financial_assets_gp').removeClass('has-warning')
			$('#financial_assets_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#equity_method').val() != '') $('#equity_method_gp').addClass('has-success')

	$('#equity_method').keyup(function(){
		typingTimer = setTimeout(doneTyping_equity_method, doneTypingInterval);
	})
	$('#equity_method').focusout(function(){
		typingTimer = setTimeout(doneTyping_equity_method, doneTypingInterval);
	})
	$('#equity_method').keydown(function(){
		$('#equity_method_gp').removeClass('has-success')
		$('#equity_method_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#equity_method').focusin(function(){
		$('#equity_method_gp').removeClass('has-success')
		$('#equity_method_gp').addClass('has-warning')
	})
	function doneTyping_equity_method(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/equity_method/' + encodeURIComponent($('#equity_method').val()) + ' /', function(data) {
			$('#equity_method_gp').removeClass('has-warning')
			$('#equity_method_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#biological').val() != '') $('#biological_gp').addClass('has-success')

	$('#biological').keyup(function(){
		typingTimer = setTimeout(doneTyping_biological, doneTypingInterval);
	})
	$('#biological').focusout(function(){
		typingTimer = setTimeout(doneTyping_biological, doneTypingInterval);
	})
	$('#biological').keydown(function(){
		$('#biological_gp').removeClass('has-success')
		$('#biological_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#biological').focusin(function(){
		$('#biological_gp').removeClass('has-success')
		$('#biological_gp').addClass('has-warning')
	})
	function doneTyping_biological(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/biological/' + encodeURIComponent($('#biological').val()) + ' /', function(data) {
			$('#biological_gp').removeClass('has-warning')
			$('#biological_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#accounts_payable').val() != '') $('#accounts_payable_gp').addClass('has-success')

	$('#accounts_payable').keyup(function(){
		typingTimer = setTimeout(doneTyping_accounts_payable, doneTypingInterval);
	})
	$('#accounts_payable').focusout(function(){
		typingTimer = setTimeout(doneTyping_accounts_payable, doneTypingInterval);
	})
	$('#accounts_payable').keydown(function(){
		$('#accounts_payable_gp').removeClass('has-success')
		$('#accounts_payable_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#accounts_payable').focusin(function(){
		$('#accounts_payable_gp').removeClass('has-success')
		$('#accounts_payable_gp').addClass('has-warning')
	})
	function doneTyping_accounts_payable(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/accounts_payable/' + encodeURIComponent($('#accounts_payable').val()) + ' /', function(data) {
			$('#accounts_payable_gp').removeClass('has-warning')
			$('#accounts_payable_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#provisions').val() != '') $('#provisions_gp').addClass('has-success')

	$('#provisions').keyup(function(){
		typingTimer = setTimeout(doneTyping_provisions, doneTypingInterval);
	})
	$('#provisions').focusout(function(){
		typingTimer = setTimeout(doneTyping_provisions, doneTypingInterval);
	})
	$('#provisions').keydown(function(){
		$('#provisions_gp').removeClass('has-success')
		$('#provisions_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#provisions').focusin(function(){
		$('#provisions_gp').removeClass('has-success')
		$('#provisions_gp').addClass('has-warning')
	})
	function doneTyping_provisions(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/provisions/' + encodeURIComponent($('#provisions').val()) + ' /', function(data) {
			$('#provisions_gp').removeClass('has-warning')
			$('#provisions_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#financial_liab').val() != '') $('#financial_liab_gp').addClass('has-success')

	$('#financial_liab').keyup(function(){
		typingTimer = setTimeout(doneTyping_financial_liab, doneTypingInterval);
	})
	$('#financial_liab').focusout(function(){
		typingTimer = setTimeout(doneTyping_financial_liab, doneTypingInterval);
	})
	$('#financial_liab').keydown(function(){
		$('#financial_liab_gp').removeClass('has-success')
		$('#financial_liab_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#financial_liab').focusin(function(){
		$('#financial_liab_gp').removeClass('has-success')
		$('#financial_liab_gp').addClass('has-warning')
	})
	function doneTyping_financial_liab(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/financial_liab/' + encodeURIComponent($('#financial_liab').val()) + ' /', function(data) {
			$('#financial_liab_gp').removeClass('has-warning')
			$('#financial_liab_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#deferred_tax_liab_assets').val() != '') $('#deferred_tax_liab_assets_gp').addClass('has-success')

	$('#deferred_tax_liab_assets').keyup(function(){
		typingTimer = setTimeout(doneTyping_deferred_tax_liab_assets, doneTypingInterval);
	})
	$('#deferred_tax_liab_assets').focusout(function(){
		typingTimer = setTimeout(doneTyping_deferred_tax_liab_assets, doneTypingInterval);
	})
	$('#deferred_tax_liab_assets').keydown(function(){
		$('#deferred_tax_liab_assets_gp').removeClass('has-success')
		$('#deferred_tax_liab_assets_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#deferred_tax_liab_assets').focusin(function(){
		$('#deferred_tax_liab_assets_gp').removeClass('has-success')
		$('#deferred_tax_liab_assets_gp').addClass('has-warning')
	})
	function doneTyping_deferred_tax_liab_assets(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/deferred_tax_liab_assets/' + encodeURIComponent($('#deferred_tax_liab_assets').val()) + ' /', function(data) {
			$('#deferred_tax_liab_assets_gp').removeClass('has-warning')
			$('#deferred_tax_liab_assets_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	
	if ($('#unearned_rev').val() != '') $('#unearned_rev_gp').addClass('has-success')

	$('#unearned_rev').keyup(function(){
		typingTimer = setTimeout(doneTyping_unearned_rev, doneTypingInterval);
	})
	$('#unearned_rev').focusout(function(){
		typingTimer = setTimeout(doneTyping_unearned_rev, doneTypingInterval);
	})
	$('#unearned_rev').keydown(function(){
		$('#unearned_rev_gp').removeClass('has-success')
		$('#unearned_rev_gp').addClass('has-warning')
		clearTimeout(typingTimer);
	})

	$('#unearned_rev').focusin(function(){
		$('#unearned_rev_gp').removeClass('has-success')
		$('#unearned_rev_gp').addClass('has-warning')
	})
	function doneTyping_unearned_rev(){
		// save in db			
		$.get('/save_financial_record/' + $('#company_id').val() + '/unearned_rev/' + encodeURIComponent($('#unearned_rev').val()) + ' /', function(data) {
			$('#unearned_rev_gp').removeClass('has-warning')
			$('#unearned_rev_gp').addClass('has-success')
			console.log('Load to db was performed: ', data)
		})
		$("#assets").html(computeAssetSum())
		$("#liab").html(computeLiabSum())
	}
	function computeAssetSum() {
		var cash = !isNaN(parseInt($("#cash").val())) ? parseInt($("#cash").val()) : 0
		var accounts_rec = !isNaN(parseInt($("#accounts_rec").val())) ? parseInt($("#accounts_rec").val()) : 0
		var prepaid_expenses = !isNaN(parseInt($("#prepaid_expenses").val())) ? parseInt($("#prepaid_expenses").val()) : 0
		var prop_plant_equip = !isNaN(parseInt($("#prop_plant_equip").val())) ? parseInt($("#prop_plant_equip").val()) : 0
		var intangible = !isNaN(parseInt($("#intangible").val())) ? parseInt($("#intangible").val()) : 0
		var financial_assets = !isNaN(parseInt($("#financial_assets").val())) ? parseInt($("#financial_assets").val()) : 0
		var equity_method = !isNaN(parseInt($("#equity_method").val())) ? parseInt($("#equity_method").val()) : 0
		var biological = !isNaN(parseInt($("#biological").val())) ? parseInt($("#biological").val()) : 0
		var sum = cash + accounts_rec + prepaid_expenses + prop_plant_equip + intangible + financial_assets + equity_method + biological
		return sum
	}
	function computeLiabSum() {
		var accounts_payable = !isNaN(parseInt($("#accounts_payable").val())) ? parseInt($("#accounts_payable").val()) : 0
		var provisions = !isNaN(parseInt($("#provisions").val())) ? parseInt($("#provisions").val()) : 0
		var financial_liab = !isNaN(parseInt($("#financial_liab").val())) ? parseInt($("#financial_liab").val()) : 0
		var deferred_tax_liab_assets = !isNaN(parseInt($("#deferred_tax_liab_assets").val())) ? parseInt($("#deferred_tax_liab_assets").val()) : 0
		var unearned_rev = !isNaN(parseInt($("#unearned_rev").val())) ? parseInt($("#unearned_rev").val()) : 0
		var sum = accounts_payable + provisions + financial_liab + deferred_tax_liab_assets + unearned_rev
		return sum
	}
	if ($('#assets')) $("#assets").html(computeAssetSum())
	if ($('#liab')) $("#liab").html(computeLiabSum())

})