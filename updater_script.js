var socket = io();


//Outgoing updates to index
function homeScore(scoreChange) { 
  socket.emit('homeScore',scoreChange);
}

function awayScore(scoreChange) {
  socket.emit('awayScore',scoreChange);
}

function clockAnim(direction) {
  socket.emit('clockAnim',direction);
}

function clockTime(action) {
  socket.emit('clockTime',action);
}

function halfUpdate(half) {
  socket.emit('halfUpdate',half);
}

function lowerThirdScore(direction) {
  socket.emit('lowerThirdScore',direction);
}

function setLowerThirdScoreBackground(half) {
  socket.emit('setLowerThirdScoreBackground',half);
}

function timeAdjust() {
  //Send the text box value
  var adjust = document.getElementById("timeAdjustText").value;
  socket.emit("timeAdjust", adjust);
}

//Echos back to the updater

socket.on('timeAnnounce', function(msg){
  document.getElementById("clockTime").textContent =  msg;
});

socket.on('halfAnnounce', function(msg){
  document.getElementById("halfIndicator").textContent =  msg;
});

socket.on('awayScoreUpdate', function(msg){
  document.getElementById("awayScoreVal").textContent =  msg;
});

socket.on('homeScoreUpdate', function(msg){
  document.getElementById("homeScoreVal").textContent =  msg;
});

socket.on('lowerThirdScoreBackgroundAnnounce', function(msg){
  document.getElementById("lowerThirdScoreBackground").src = msg;
});

socket.on('lowerThirdScoreOnAirAnnounce', function(msg){
  if (msg){
    document.getElementById("lowerThirdScoreBackground").style.backgroundColor = "#ff0000";
  } else {
    document.getElementById("lowerThirdScoreBackground").style.backgroundColor = null;
  }
  
});

socket.on('clockOnAirAnnounce', function(msg){
  if (msg){
    document.getElementById("clockScoreBackground").style.backgroundColor = "#ff0000";
  } else {
    document.getElementById("clockScoreBackground").style.backgroundColor = null;
  }
  
});