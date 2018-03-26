//Initialise connecton to socket system
var socket = io();

console.log("TESTING");

var timerInstance = new Timer();

socket.on('awayScore', function(msg){
  console.log("awayScore" + msg);
  scoreNum = Number(document.getElementById("awayScoreVal").textContent);
  scoreNum = scoreNum + Number(msg);
  if (scoreNum < 10) {
    scoreText = ' ' + String(scoreNum);
  } else {
    scoreText = String(scoreNum);
  }
  document.getElementById("awayScoreVal").textContent =  scoreText;

  //document.getElementById("clockScoreBackground").className = "rotateIn";
  //document.getElementById("clockScoreBackground").style.opacity = 1;
});

socket.on('homeScore', function(msg){
  console.log("homeScore" + msg);
  scoreNum = Number(document.getElementById("homeScoreVal").textContent);
  scoreNum = scoreNum + Number(msg);
  if (scoreNum < 10) {
    scoreText = ' ' + String(scoreNum);
  } else {
    scoreText = String(scoreNum);
  }
  document.getElementById("homeScoreVal").textContent =  scoreText;

  //document.getElementById("clockScoreBackground").className = "rotateOut";
  //document.getElementById("clockScoreBackground").style.opacity = 0;
});

socket.on('clockAnim', function(msg){
  //document.getElementById("clockScoreBackground").className = "rotateOut";
  if (Number(msg) == 1) {
    document.getElementById("scoreClockDiv").style.opacity = 1;
  } else {
    document.getElementById("scoreClockDiv").style.opacity = 0;
  }
  
});

socket.on('clockTime', function(msg){
  //document.getElementById("clockScoreBackground").className = "rotateOut";
  if (Number(msg) == 1) {
    //Start Clock

  } else {
    //Stop Clock
  }
  
});