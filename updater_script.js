var socket = io();

function homeScore(scoreChange) {
  console.log("Home " + scoreChange);
  socket.emit('homeScore',scoreChange);
}

function awayScore(scoreChange) {
  console.log("Away " + scoreChange);
  socket.emit('awayScore',scoreChange);
}

function clockAnim(direction) {
  console.log("ClockAnim:" + direction);
  socket.emit('clockAnim',direction);
}

function clockTime(action) {
  console.log("clockTime:" + action);
  socket.emit('clockTime',action);
}

function halfUpdate(half) {
  console.log("halfUpdate:" + half);
  socket.emit('halfUpdate',half);
}

function timeAdjust(adjust) {
  socket.emit("timeAdjust", adjust);
}

socket.on('timeAnnounce', function(msg){
  console.log("Test");
  document.getElementById("clockTime").textContent =  msg;
});

socket.on('awayScoreUpdate', function(msg){
  document.getElementById("awayScoreVal").textContent =  msg;
});

socket.on('homeScoreUpdate', function(msg){
  document.getElementById("homeScoreVal").textContent =  msg;
});