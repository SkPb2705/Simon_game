var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressCount = 0;
var level = 1;
var buttonPressCount = 0;

//randomly select  a color button and show animation and sound respectively for that button.
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}


// if user click any button before pressing any key display alert message to "Please press any key to start the game'
$(".btn").click(function() {
  if (keyPressCount == 0) {
    alert("Please press any key to start the game");
  } else {
    buttonPressCount++;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if (level == buttonPressCount) {
      checkAnswer();
    }
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var pressedBtn = $("#" + currentColour);
  pressedBtn.addClass("pressed");
  setTimeout(function() {
    pressedBtn.removeClass('pressed');
  }, 100);
}

//only when user keypress any key for the first time ,changes h1 to level 1  and start the game.
$(document).keypress(function() {

  if (keyPressCount == 0) {
    $("#level-title").html("Level - " + level);
    nextSequence();
    keyPressCount++;
  }

});

function checkAnswer() {
  if (gamePattern.toString() == userClickedPattern.toString()) {
    level++;
    userClickedPattern = [];
    buttonPressCount = 0;
    setTimeout(function() {
      $("#level-title").html("Level - " + level);
      nextSequence();
    }, 500);
  } else {
    resetGame();
  }
}

function resetGame() {

  $("body").addClass("game-over");
  $(".container").css("visibility", "hidden");
  $("#level-title").css("visibility", "hidden");
  $("span").addClass("gameOverVisibilitiy");


  setTimeout(function() {
 $("body").removeClass('game-over');
   $("span").removeClass("gameOverVisibilitiy");
   $(".container").css("visibility", "visible");
 $("#level-title").css("visibility", "visible");
}, 2000);
  var soundGameOver = new Audio("sounds/wrong.mp3");
  soundGameOver.play();


  $("#level-title").html("Press A Key to Start");
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  buttonPressCount = 0;
  keyPressCount = 0;


}
