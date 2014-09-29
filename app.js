
// on vérifie que du local existe
var aujourdhui = new Date();
var total = 0;
var grandTotal = 0;
var enfant = $('#data').data('enfant');
var jaugeNouvelle;

if( simpleStorage.get("laura") === undefined ){
	simpleStorage.set("laura", {"jauge":0, "update": aujourdhui});
}
var Laura = simpleStorage.get('laura');

if( simpleStorage.get("emma") === undefined ){
	simpleStorage.set("emma", {"jauge":0, "update": aujourdhui});
}
var Emma = simpleStorage.get('emma');

function diffdate(d1,d2){
	var WNbJours = d2.getTime() - d1.getTime();
	return Math.ceil(WNbJours/(1000*60*60*24)) - 1;
}

function updateJauge(){

	simpleStorage.set( enfant , {"jauge": jaugeNouvelle.toFixed(1), "update": aujourdhui});
	Laura = simpleStorage.get('laura');
	Emma = simpleStorage.get('emma');

	var result = (jaugeNouvelle.toFixed(1) + "").split(".");
	var unit = parseInt(result[0]);
	var decimal = parseInt(result[1]);
	$('#'+enfant+' .jauge').empty();

	if( unit === 0 ){
		if( decimal === 0 ){
			$('#'+enfant).addClass('vide');
		}else{
			$('#'+enfant).removeClass('vide');
		}
	}else{
		$('#'+enfant).removeClass('vide');
	}

	for (var i = 0; i < unit; i++) {
	   $('#'+enfant+' .jauge').prepend( '<div class="unit"></div>' );
	   if( i === unit-1 && decimal ){
	   		$('#'+enfant).prepend( '<div class="unit h' + decimal + '"></div>' );
	   }
	}

}

$(document).ready(function(){

	var elems = $('.js-switch');
	$.each(elems, function() {
		var switchery = new Switchery( this, {color: '#ef3b6e'} );
	});

	elems.on( 'change', function(e){

		if( enfant === 'laura' ){
			var jaugeActuel = Laura.jauge;
		}else{
			var jaugeActuel = Emma.jauge;
		}

		if( this.checked === true ){
			jaugeNouvelle = parseFloat(jaugeActuel) + $(this).data('jauge');
		}else{
			jaugeNouvelle = parseFloat(jaugeActuel) - $(this).data('jauge');
		}

		jaugeNouvelle.toFixed(1);

		if( jaugeNouvelle > 10 )jaugeNouvelle = 10;

		updateJauge();
	});

	var dateJauge = new Date(Laura.update);

	if( dateJauge.getDay() != aujourdhui.getDay() ){
		// on supprime de la jauge le nombre de jours de diff
		var diff = diffdate( dateJauge,aujourdhui );

		if( 0 > ( Laura.jauge - diff )){
			// la jauge serait inférieur à 0 donc mise à zéro de la jauge
			simpleStorage.set("laura", {"jauge":0, "update": aujourdhui});
		}else{
			simpleStorage.set("laura", {"jauge": Laura.jauge - diff, "update": aujourdhui});		
		}
		Laura = simpleStorage.get('laura');

		if( 0 > ( Emma.jauge - diff )){
			// la jauge serait inférieur à 0 donc mise à zéro de la jauge
			simpleStorage.set("emma", {"jauge":0, "update": aujourdhui});
		}else{
			simpleStorage.set("emma", {"jauge": Emma.jauge - diff, "update": aujourdhui});		
		}
		Emma = simpleStorage.get('emma');


	}

	// on créé les jauges

	// pour emma 
	var resultEmma = (Emma.jauge + "").split(".");
	var emmaUnit = parseInt(resultEmma[0]);
	var emmaDecimal = parseInt(resultEmma[1]);
	if( emmaUnit === 0 ){
		$('#emma').addClass('vide');
	}else{
		$('#emma').removeClass('vide');
	}

	for (var i = 0; i < emmaUnit; i++) {
	   $('#emma .jauge').prepend( '<div class="unit"></div>' );
	   if( i === emmaUnit-1 && emmaDecimal ){
	   		$('#emma .jauge').prepend( '<div class="unit h' + emmaDecimal + '"></div>' );
	   }
	}

	// pour laura 
	var resultLaura = (Laura.jauge + "").split(".");
	var lauraUnit = parseInt(resultLaura[0]);
	var lauraDecimal = parseInt(resultLaura[1]);
	if( lauraUnit === 0 ){
		$('#laura').addClass('vide');
	}else{
		$('#laura').removeClass('vide');
	}

	for (var i = 0; i < lauraUnit; i++) {
	   $('#laura .jauge').prepend( '<div class="unit"></div>' );
	   if( i === lauraUnit-1 && lauraDecimal ){
	   		$('#laura .jauge').prepend( '<div class="unit h' + lauraDecimal + '"></div>' );
	   }
	}

});