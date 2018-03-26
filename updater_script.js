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