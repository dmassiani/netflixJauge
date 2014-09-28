
// on vérifie que du local existe
var aujourdhui = new Date();
var total = 0;

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

$(document).ready(function(){

	var elems = $('.js-switch');
	$.each(elems, function() {
		var switchery = new Switchery( this );
	});

	elems.on( 'change', function(e){
		if( this.checked === true ){
			total = $(this).data('jauge') + total;
		}else{
			total = total - $(this).data('jauge');
		}
		console.log(total.toFixed(1));
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

	for (var i = 0; i < emmaUnit; i++) {
	   $('#emma .jauge').prepend( '<div class="unit">unit</div>' );
	   if( i === emmaUnit-1 ){
	   		$('#emma .jauge').prepend( '<div class="unit h' + emmaDecimal + '">' + emmaDecimal + '</div>' );
	   }
	}

	// pour laura 
	var resultLaura = (Laura.jauge + "").split(".");
	var lauraUnit = parseInt(resultLaura[0]);
	var lauraDecimal = parseInt(resultLaura[1]);

	for (var i = 0; i < lauraUnit; i++) {
	   $('#laura .jauge').prepend( '<div class="unit">unit</div>' );
	   if( i === lauraUnit-1 ){
	   		$('#laura .jauge').prepend( '<div class="unit h' + lauraDecimal + '">' + lauraDecimal + '</div>' );
	   }
	}

});