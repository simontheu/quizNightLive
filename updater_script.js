var socket = io();

socket.emit('getQuestions');

//Outgoing updates to index
function homeScore(scoreChange) { 
  socket.emit('homeScore',scoreChange);
}

<<<<<<< HEAD
=======
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

>>>>>>> 7dc2b32f69084c7558eb7dbde190788bd5f421bf
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
<<<<<<< HEAD
function sendNewQuestion(id) {
=======
function timeAdjust() {
>>>>>>> 7dc2b32f69084c7558eb7dbde190788bd5f421bf
  //Send the text box value
  var questionObject = {
    "QuestionID" : id,
    "AnswerA" : id,
    "AnswerB" : id,
    "AnswerC" : id,
    "AnswerD" : id
  }
  socket.emit("newQuestion", questionObject);
}

//Echos back to the updater

socket.on('timeAnnounce', function(msg){
  document.getElementById("clockTime").textContent =  msg;
});


function changeClockNames() {
  var leftName = document.getElementById("teamNameLeft").value;
  var rightName = document.getElementById("teamNameRight").value;
  document.getElementById("clock-team-left").textContent = leftName
  document.getElementById("clock-team-right").textContent = rightName
}


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
<<<<<<< HEAD



socket.on('getQuestions', function(msg) {
  //Startup generator
  var docelem = document.getElementById('main')
  console.log(msg.Rounds)

  msg.Rounds.forEach(element => {
    var newdiv = document.createElement('div');   //create a div
    docelem.appendChild(newdiv);
    newdiv.id = "round" + element.RoundNumber
    newdiv.textContent = "Round " + element.RoundNumber
    element.Questions.forEach(questionElement => {
      //questionElement.
      newinnerdiv = document.createElement('div');
      newinnerdiv.id = "round" + element.RoundNumber + "Q" + questionElement.QuestionNumber
      newinnerdiv.textContent = "Q" + questionElement.QuestionNumber + ": " + questionElement.Question
      cueButton = document.createElement("button");
      cueButton.textContent = "CUE"
      newdiv.appendChild(newinnerdiv);
      newdiv.appendChild(cueButton);
    });
                           //add an id
      
  });

                 //append to the doc.body

});
=======
*/
>>>>>>> 7dc2b32f69084c7558eb7dbde190788bd5f421bf
