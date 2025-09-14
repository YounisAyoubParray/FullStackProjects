var buttonColours=['red','blue','green','yellow'];
var gamepattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
    level++;
    userClickedPattern=[];
    $('h1').text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$('.btn').click(function(e){
    var userselection=$(this).attr("id");
    userClickedPattern.push(userselection);
    pressed(userselection);
    var audio = new Audio('./sounds/'+userselection+'.mp3');
    audio.play();
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
    });

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}








function pressed(userselection){
$("."+userselection).addClass("pressed");
setTimeout(function(){
        $("."+userselection).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentlevel){
if(gamepattern[currentlevel]===userClickedPattern[currentlevel]){
    if (userClickedPattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
}else{
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);
    $('h1').text("Game Over, Press Any Key to Restart");
    
}
}


function startover(){
    level=0;
    gamepattern=[];
    started=false;
}