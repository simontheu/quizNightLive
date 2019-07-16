var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Timer = require('easytimer'); 
var questions = require('./teams.json');

//Database init
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


var timer = new Timer();

console.log(questions.away);

console.log("PRE Q");
io.emit('gotQuestions')
console.log("POST Q");

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/media/Scorebug.png', function(req, res) {
    res.sendFile(__dirname + '/media/Scorebug.png');
});

app.get('/media/HalfTime.png', function(req, res) {
    res.sendFile(__dirname + '/media/HalfTime.png');
});

<<<<<<< HEAD
app.get('/media/QuizNightLogo.png', function(req, res) {
    res.sendFile(__dirname + '/media/QuizNightLogo.png');
=======
app.get('/media/FullTime.png', function(req, res) {
    res.sendFile(__dirname + '/media/FullTime.png');
>>>>>>> 7dc2b32f69084c7558eb7dbde190788bd5f421bf
});

app.get('/media/LowerThird.png', function(req, res) {
    res.sendFile(__dirname + '/media/LowerThird.png');
});

app.get('/media/LowerThird.png', function(req, res) {
    res.sendFile(__dirname + '/media/LowerThird.png');
});

app.get('/index_script.js', function(req, res) {
    res.sendFile(__dirname + '/index_script.js');
});

app.get('/updater_script.js', function(req, res) {
    res.sendFile(__dirname + '/updater_script.js');
});

app.get('/node_modules/easytimer/dist/easytimer.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/easytimer/dist/easytimer.min.js');
});

io.on('connection', function(socket){
    socket.on('getQuestions', function(msg){
        console.log("socket.on")
        io.emit('getQuestions', questions);
    });
    socket.on('awayL3', function(msg){
        io.emit('awayL3', msg);
    });
    socket.on('answeredQuestion', function(msg){
        console.log(msg);
        io.emit('answeredQuestionReceived', {});
    })
    console.log('connection received');
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});