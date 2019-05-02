var socket = io();

socket.emit('getTeams');

//Outgoing updates to index
function homeScore(scoreChange) { 
  socket.emit('homeScore',scoreChange);
}

function awayScore(scoreChange) {
  socket.emit('awayScore',scoreChange);
}

function clockAnim(direction) {
  var teamNameLeft = document.getElementById("teamNameLeft").value;
  var teamNameRight = document.getElementById("teamNameRight").value;
  


  socket.emit('clockAnim',{ direction: direction, nameLeft: teamNameLeft, nameRight: teamNameRight} );
}

function clockTime(action) {
  socket.emit('clockTime',action);
}

function halfUpdate(half) {
  socket.emit('halfUpdate',half);
}

function lowerThirdScore(direction) {
  var teamNameLeft = document.getElementById("teamNameLongLeft").value;
  var teamNameRight = document.getElementById("teamNameLongRight").value;
  

  var msg = {direction: direction, "teamNameLeft": teamNameLeft, "teamNameRight":teamNameRight }
  socket.emit('lowerThirdScore',msg);
}

function setLowerThirdScoreBackground(half) {
  socket.emit('setLowerThirdScoreBackground',half);
}

function homeL3(playerNumber) {
  if (playerNumber == 0) {
    var name = document.getElementById("name1text").value;
  } else {
    var name = document.getElementById("name2text").value;
  }
  console.log(name);
  socket.emit('homeL3',name);
}
/*
function awayL3(playerNumber) {
  socket.emit('awayL3',playerNumber);
}
*/
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
/*
socket.on('gotTeams', function(msg){
  console.log(msg.home);
  //Sort home player buttons
  var index = 1;
  msg.home.forEach(element => {
    var docElem = document.getElementById("homePlayer" + index);
    console.log( element.number);
    docElem.textContent = element.number;
    index++;
  });

  //Populate away player buttons
  index = 1;
  msg.away.forEach(element => {
    var docElem = document.getElementById("awayPlayer" + index);
    console.log( element.number);
    docElem.textContent = element.number;
    index++;
  });
});
*/