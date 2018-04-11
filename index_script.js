//Initialise connecton to socket system
var socket = io();

console.log("TESTING");

var timer = new Timer();

timer.addEventListener('secondsUpdated', function (e) {
  updateVisibleTime();
});

socket.on('awayScore', function(msg){
  scoreNum = Number(document.getElementById("awayScoreVal").textContent);
  scoreNum = scoreNum + Number(msg);
  if (scoreNum < 10) {
    scoreText = ' ' + String(scoreNum);
  } else {
    scoreText = String(scoreNum);
  }
  document.getElementById("awayScoreVal").textContent =  scoreText;
  document.getElementById("awayScoreLower3rdVal").textContent =  scoreText;

  socket.emit('awayScoreUpdate', scoreText);

});

socket.on('homeScore', function(msg){
  scoreNum = Number(document.getElementById("homeScoreVal").textContent);
  scoreNum = scoreNum + Number(msg);
  if (scoreNum < 10) {
    scoreText = ' ' + String(scoreNum);
  } else {
    scoreText = String(scoreNum);
  }
  document.getElementById("homeScoreVal").textContent =  scoreText;
  document.getElementById("homeScoreLower3rdVal").textContent =  scoreText;

  socket.emit('homeScoreUpdate', scoreText);

});

socket.on('clockAnim', function(msg){
  if (Number(msg) == 1) {
    document.getElementById("scoreClockDiv").className = "rotateIn";
    socket.emit('clockOnAirAnnounce',1);
  } else {
    document.getElementById("scoreClockDiv").className = "rotateOut";
    socket.emit('clockOnAirAnnounce',0);
  }
});

socket.on('lowerThirdScore', function(msg){
  if (Number(msg) == 1) {
    document.getElementById("lowerThirdScoreDiv").className = "lowerThirdScoreIn";
    socket.emit("lowerThirdScoreOnAirAnnounce", 1);
  } else {
    document.getElementById("lowerThirdScoreDiv").className = "lowerThirdScoreOut";
    socket.emit("lowerThirdScoreOnAirAnnounce", 0);
  }
  
});

socket.on('setLowerThirdScoreBackground', function(msg){
  console.log("test...");

  if (Number(msg) == 1) {
    document.getElementById("lowerThirdScoreBackground").src = "/media/half_time_lower_3rd.png";
    socket.emit("lowerThirdScoreBackgroundAnnounce","/media/half_time_lower_3rd.png")
  } else {
    document.getElementById("lowerThirdScoreBackground").src = "/media/full_time_lower_3rd.png";
    socket.emit("lowerThirdScoreBackgroundAnnounce","/media/full_time_lower_3rd.png")
  }
  
});

socket.on('clockTime', function(msg){
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
    socket.emit('halfAnnounce', "1st");
  } else {
    //Set 2nd half
    document.getElementById("halfIndicator").textContent = "2nd";
    socket.emit('halfAnnounce', "2nd");
  } 
});

socket.on('timeAdjust', function(msg){
  //document.getElementById("clockScoreBackground").className = "rotateOut";
  //process the hours to minutes problem here
  var minutesVal = Number(msg.substring(0,2));
  var secondsVal = Number(msg.substring(3,5));//01:34:67

  timer.stop();//Cant get it to work without this 
  timer.start ( {startValues: { minutes: minutesVal, seconds: secondsVal }} );

  
  updateVisibleTime();
});

function updateVisibleTime()
{
  var timeString;
  if (timer.getTimeValues().hours > 0) {
    console.log("oh shit");
    var minutes = String(timer.getTimeValues().minutes + (60 * timer.getTimeValues().hours)).padStart(2,"0");
    var seconds = String(timer.getTimeValues().seconds).padStart(2,"0");
    timeString = minutes + ":" + seconds;

  } else {
    timeString = timer.getTimeValues().toString().substring(3);
  }
  
  document.getElementById("clockTime").textContent =  timeString;
  socket.emit('timeAnnounce',timeString);
}
