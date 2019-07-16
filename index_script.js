//Get a cookie for this quiz entry
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function getUniqueKey() {
  var uniqueKey = getCookie("uniqueKey");
  if (uniqueKey != "") {
    return uniqueKey
  } else {
    newKey = uuidv4()
    if (newKey != "" && newKey != null) {
      setCookie("uniqueKey", newKey, 365);
      return newKey
    }
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Initialise connecton to socket system
var socket = io();

socket.emit('getTeams',0);

var timer = new Timer();

timer.addEventListener('secondsUpdated', function (e) {
  updateVisibleTime();
});

socket.on('newQuestion', function(msg){
  console.log(msg)
  document.getElementById("question").textContent = "Q" + msg.QuestionNumber + ". " + msg.Question
  document.getElementById("answerA").textContent = msg.AnswerOptions.A
  document.getElementById("answerB").textContent = msg.AnswerOptions.B
  document.getElementById("answerC").textContent = msg.AnswerOptions.C
  document.getElementById("answerD").textContent = msg.AnswerOptions.D
  //socket.emit("lowerThirdScoreBackgroundAnnounce","/media/HalfTime.png")
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

socket.on('gotNewQuestion', function(msg){
  console.log("gotNewQuestion", msg);
  teams = msg;
});


function answer(answer) {
  var uniqueKey = getUniqueKey()
  stopTheClock()
  submitAnswer(answer, elapsedTime, uniqueKey)
  switch (answer) {
    case "A":
      var answerElement = document.getElementById("answerA");
      answerElement.style.backgroundColor = "#ff0000";
      break;
    case "B":
      var answerElement = document.getElementById("answerB");
      answerElement.style.backgroundColor = "#ff0000";
      break;
    case "C":
      var answerElement = document.getElementById("answerC");
      answerElement.style.backgroundColor = "#ff0000";
      break;
    case "D":
      var answerElement = document.getElementById("answerD");
      answerElement.style.backgroundColor = "#ff0000";
      break;
  }
}

function animateTimer() {
  startTime = Date.now();
  timer = setInterval(frame, 20);
}

function frame() {
  var questionLength = 30000;
  var progess = document.getElementById("progress");
  elapsedTime = questionLength - (Date.now() - startTime);
  
  updateTimerBar((elapsedTime/questionLength));

  if (elapsedTime < 1) {
    stopTheClock()
  }
}

function stopTheClock() {
  elapsedTime = 0;
  clearInterval(timer);
}

function updateTimerBar(fractionLeft) {
  var c = document.getElementById("timerBarCanvas");
  var ctx = c.getContext("2d");
  var fillWidth = c.width * fractionLeft;
  ctx.fillRect(0, 0, fillWidth, c.height);
  ctx.clearRect(fillWidth, 0, c.width, c.height);
}

function submitAnswer(answer, elapsedTime, uniqueKey) {
  var answerObject = {
    "answer":answer,
    "elapsedTime":elapsedTime,
    "userKey":uniqueKey,
    "questionID":"1",
  }
  console.log(answer)
  console.log(elapsedTime)
  console.log(uniqueKey)
  socket.emit('answeredQuestion',answerObject);
}