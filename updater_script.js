var socket = io();

socket.emit('getQuestions');

//Outgoing updates to index
function homeScore(scoreChange) { 
  socket.emit('homeScore',scoreChange);
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
function sendNewQuestion(questionDictionary) {
  //Strip the answer off.
  delete questionDictionary["Answer"]
  socket.emit("newQuestion", questionDictionary);
}

//Echos back to the updater

socket.on('timeAnnounce', function(msg){
  document.getElementById("clockTime").textContent =  msg;
});


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
      cueButton.id = "round" + element.RoundNumber + "Q" + questionElement.QuestionNumber
      cueButton.addEventListener ("click", function() {
        console.log(questionElement);
        sendNewQuestion(questionElement)
      });
      
      cueButton.textContent = "CUE"
      newdiv.appendChild(newinnerdiv);
      newdiv.appendChild(cueButton);
    });
                           //add an id
      
  });

                 //append to the doc.body

});
