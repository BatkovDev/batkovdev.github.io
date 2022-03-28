var clicks = 0;
var GAME_STATE = 0; // 0 - waiting, 1-start, 2-end
$(".started").hide();
$(".end").hide();
$(".fail").hide();
$(".wating").show();

$(".start_game").click(function (event){
	start();
});
$("#map").click(function (event) {
	if(GAME_STATE == 1 && GAME_STATE !== 2){
	clicks++;
	$("#clicks").text(clicks+" clicks");
	var distance = getDistance(event, target);

	var distanceHint = getDistanceHint(distance);
	$("#distance").text(distanceHint);
	if(clicks >= 60){
		stop();
	}
}
});

var stop = function () {
	$(".waiting").hide();
	$(".started").hide();
	clicks = 0;
	GAME_STATE = 2;
	$(".end").hide();
	$(".fail").show();
}
var win = function () {
	alert("Клад найден! Сделано кликов: " + clicks);
	$(".waiting").hide();
	clicks = 0;
	GAME_STATE = 0;
	$(".started").hide();
	$(".fail").hide();
	$(".end").show();
}
var start = function () {
	clicks = 0;
	GAME_STATE = 1;
	$(".waiting").hide();
	$(".started").show();
	$(".fail").hide();
	$(".end").hide();
}

if (distance < 15 && GAME_STATE == 1 && GAME_STATE !== 2) {
	win();
}
var width = 300;
var height = 300;

var getRandomNumber = function (size) {
return Math.floor(Math.random() * size);
}

var target = {
	x: getRandomNumber(width),
	y: getRandomNumber(height)
}

var getDistance = function (event, target) {
	var diffX = event.offsetX - target.x;
	var diffY = event.offsetY - target.y;
	return Math.sqrt((diffX * diffX) + (diffY * diffY));
};


var getDistanceHint = function (distance) {
	var sadist = "";
	if(clicks >= 30)
		sadist =" (Кликов до клада: "+ Math.round(distance) +")";

	if (distance < 20) {
	return "Обожжешься!";
	} else if (distance < 40) {
	return "Очень горячо"+sadist;
	} else if (distance < 80) {
	return "Горячо"+sadist;
	} else if (distance < 140) {
	return "Тепло"+sadist;
	} else if (distance < 210) {
	return "Холодно"+sadist;
	} else if (distance < 260) {
	return "Очень холодно"+sadist;
	} else {
	return "Замерзнешь!"+sadist;
	}
};
