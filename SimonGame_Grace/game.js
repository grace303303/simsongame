//Create a new pattern//
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//start the game//
$(document).keypress(function() {
  if (!started) {
    //$("h1").text("Level " + level);
    newSequence();
    started = true;
  }
});

//When buttons are clicked triggers a function//
$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id; //or: $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  });

//Random choose color//
function newSequence() {
  userClickedPattern = [];
  level ++;
  $("h1").text("Level " + level);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors [randomNumber];
  gamePattern.push(randomChosenColor);
  var chosenButton = $("#" + randomChosenColor);
  chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


//Play sounds function//
function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

//Animation pressed//
function animatePress(currentColor) {
var pressedButton = $("#" + currentColor).addClass("pressed");
setTimeout(function() {
      pressedButton.removeClass("pressed");
  }, 100);
}

//Check answer//


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

  if (userClickedPattern.length === gamePattern.length){
     setTimeout(function() {newSequence(); }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass(".game-over");
    setTimeout(function() {$("body").removeClass(".game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//to start over//
function startOver() {
   started = false;
   gamePattern = [];
   //userClickedPattern = [];
   level = 0;
}
