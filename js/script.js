$("#start").on("click", function(){
	$("#start").css("background-color", "#FFFF00");
	$(".screen").addClass("active");
	$("#restart").removeClass("unclickable");
	start();
});

$("#strict").on("click", function(){
	if(!strict) {
	  $("#strict").css("background-color", "#FFFF00");
	  strict = true;
	} else {
	  $("#strict").css("background-color", "#FFC400");
	  strict = false;
	}
	
});

$("#restart").on("click", function(){
	restart();
	$("#strict").css("background-color", "#FFC400");
	strict = false;
	stop = true;
});

var click = 0;
var level = 0;
var strict = false;
var player = [];
var sequence = [],
	play,
	stop = false;
var strict = false;
var effect1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var effect2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var effect3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var effect4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var error = new Audio("sounds/error.mp3");

function random(min, max) {
    return Math.floor((Math.random()*4)+1);
}

function restart(){
	click = 0;
	level = 0;
	player = [];
	sequence = [];
	start();
}
function b(){
	if (level < 10) {
		return "0"+level;
	} else {
		return level;
	}
}

function start() {
	stop = false;
	function p(){
	  a = random(1, 4);
	  sequence.push(a);
	  console.log(sequence);
	  animate(sequence);
	}
	level++
	$("#lcd").text(b);
	if(level == 20) {
	  $("#lcd").text("WINNER!");
	  setTimeout(function(){restart();}, 1000);
	} else {
	  p();
	}
}

function allowPlay() {
	if (play) {
	  for (var i = 1; i < 5; i++) {
        $("#"+i).removeClass("unclickable");
	  }
	} else {
	  for (var j = 1; j < 5; j++) {
        $("#"+j).addClass("unclickable");
	  }
	}
}

function clicked(objThis){
	click++;
	player.push(Number(objThis.id));
	console.log(player)
	if(player[player.length -1] !== sequence[player.length -1]) {
		console.log("Wrong!");
		$("#lcd").text("ERROR!");
		setTimeout(function(){$("#lcd").text(b);}, 500);
		if(strict) {
			error.play();
			restart();
		} else {

			error.play();
			click = 0;
			player = [];
			animate(sequence);
		}
	} else {
		var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound"+objThis.id+".mp3");
		audio.play();
	}
	
	if(click == sequence.length) {
		if(player.length == sequence.length){
			console.log("Match!");
			player = [];
			click = 0;
			play = false;
			allowPlay();
			start();
		} else {
			console.log("Try Again");
			player = [];
			click = 0;
			console.log()
		}
	}
}

function animate(sequence) {
	
	var i = 0;
	var int = setInterval(function() {
		playSound(sequence[i]);
		light(sequence[i]);
		i++;
		if (i >= sequence.length || stop) {
			clearInterval(int);
			play = true;
			allowPlay();
		}
	}, 800);
	
}

function light(color) {
	$("#"+ color).addClass('lit');
	window.setTimeout(function() {
		$("#"+ color).removeClass('lit');
		
	}, 300);
}
function playSound(num) {
	switch (num) {
		case 1:
		  effect1.play();
		  break;
		case 2:
		  effect2.play();
		  break;
		case 3:
		  effect3.play();
		  break;
		case 4:
		  effect4.play();
		  break;
	}
}