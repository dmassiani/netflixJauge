
// on vérifie que du local existe
var aujourdhui = new Date();

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

	var dateJauge = new Date(Laura.update);
	// var update = diffdate(dateJauge,aujourdhui);

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


	}else{
		console.log('no update');
		
	}

});