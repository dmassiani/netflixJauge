
var aujourdhui = new Date();
var newJauge = '"' + aujourdhui.getYear() + ',' + aujourdhui.getMonth() + ',' + aujourdhui.getDay() + '"';

	if( simpleStorage.get("laura") === undefined ){
		simpleStorage.set("laura", {"jauge":0, "update": newJauge});
	}
	var Laura = simpleStorage.get('Laura');

	if( simpleStorage.get("emma") === undefined ){
		simpleStorage.set("emma", {"jauge":0, "update": newJauge});
	}
	var Emma = simpleStorage.get('Emma');


function diffdate(d1,d2){
	var WNbJours = d2.getTime() - d1.getTime();
	return Math.ceil(WNbJours/(1000*60*60*24)) - 1;
}

$(document).ready(function(){


	var dateJauge = new Date(Laura.update);
 
	alert(diffdate(dateJauge,aujourdhui));

})