var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
 
var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
 
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));








const server = require('http').Server(app);
var io = require('socket.io')(server);

var routes = require('./routes/router');
app.use('/', routes);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/media/QuizNightNoBKG.png', function(req, res) {
    res.sendFile(__dirname + '/media/QuizNightNoBKG.png');
});

app.get('/media/chalk.jpg', function(req, res) {
    res.sendFile(__dirname + '/media/chalk.jpg');
});

app.get('/node_modules/easytimer/dist/easytimer.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/easytimer/dist/easytimer.min.js');
});

var quizState = 0;



io.on('connection', function(socket){
    socket.emit('currentQuizState', quizState);
    console.log("Connected to socket io")

    socket.on('cueQuestion', function(msg){
        console.log("cueQuestion>>cueQuestionForQuestionPage")
        socket.broadcast.emit('newQuestion', msg);
    });

    socket.on('getQuestions', function(){
        console.log("sending gotQuestions")
        socket.emit('gotQuestions', questions);
    });

    socket.on('awayL3', function(msg){
        io.emit('awayL3', msg);
    });

    socket.on('answeredQuestion', function(msg){
        console.log(msg);
        io.emit('answeredQuestionReceived', {});
    });

    socket.on('test', function(msg){
        console.log("fk");
        io.emit('testEmitReceived', {});
    });

    console.log('connection received');
});

/*
io.on('connection', (socket) => {
  console.log('a user connected');
});
*/
app.get('/index_script.js', function(req, res) {
    res.sendFile(__dirname + '/index_script.js');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var express = require("express"); 
var bodyParser = require("body-parser"); 

var http = require('http').createServer(app);
var io = require('socket.io')(http);


var Timer = require('easytimer'); 
var questions = require('./teams.json');


const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
})



app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 


app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
    
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('sign_up_success'); 
}) 


var timer = new Timer();

console.log(questions.away);

console.log("PRE Q");
io.emit('gotQuestions')
console.log("POST Q");

app.get('/sign_up', function(req, res){
    res.sendFile(__dirname + '/sign_up.html');
});




/*
app.get('/sign_up_success', function(req, res){
    res.sendFile(__dirname + '/sign_up_success.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

/*
app.get('/media/Scorebug.png', function(req, res) {
    res.sendFile(__dirname + '/media/Scorebug.png');
});

app.get('/media/HalfTime.png', function(req, res) {
    res.sendFile(__dirname + '/media/HalfTime.png');
});
*/
/*

/*
app.get('/media/LowerThird.png', function(req, res) {
    res.sendFile(__dirname + '/media/LowerThird.png');
});
*/
/*





*/


app.get('/updater_script.js', function(req, res) {
    res.sendFile(__dirname + '/updater_script.js');
});


app.get('/fonts/vtcallskratchedupone-webfont.woff2', function(req, res) {
    res.sendFile(__dirname + '/fonts/vtcallskratchedupone-webfont.woff2');
});


// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

server.listen(3000);

