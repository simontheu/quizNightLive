//Initialise connecton to socket system
var socket = io();

console.log("TESTING");

var timer = new Timer();

timer.addEventListener('secondsUpdated', function (e) {
  console.log(timer.getTimeValues().toString());
  updateVisibleTime();
});

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

  socket.emit('awayScoreUpdate', scoreText);
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

  socket.emit('homeScoreUpdate', scoreText);

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
    timer.start();
  } else if (Number(msg) == 0){
    //Stop Clock
    timer.pause();//This is a better stop, than the stop that resets also.
  } else if (Number(msg) == 2){//Reset
    //Stop Clock
    timer.stop();
    updateVisibleTime();
  }
  
});

socket.on('halfUpdate', function(msg){
  //document.getElementById("clockScoreBackground").className = "rotateOut";
  if (Number(msg) == 1) {
    //Set 1st half
    document.getElementById("halfIndicator").textContent = "1st";
  } else {
    //Set 2nd half
    document.getElementById("halfIndicator").textContent = "2nd";
  } 
});

socket.on('timeAdjust', function(msg){
  //document.getElementById("clockScoreBackground").className = "rotateOut";
  if (Number(msg) == -1) {
    //Remove 1 sec
    timer.stop();
    timer.start({startValues: {seconds:200} });
  } else {
    //Set 2nd half
    document.getElementById("halfIndicator").textContent = "2nd";
  } 
});

function updateVisibleTime()
{
    var timeString = timer.getTimeValues().toString();
    timeString = timeString.substring(3,8);
    document.getElementById("clockTime").textContent =  timeString;
    socket.emit('timeAnnounce',timeString);
}

