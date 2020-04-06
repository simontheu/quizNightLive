
var express = require("express"); 
var bodyParser = require("body-parser"); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Timer = require('easytimer'); 
var questions = require('./teams.json');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//Database init
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";

var app=express();

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
})

/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

/*
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
*/

var timer = new Timer();

console.log(questions.away);

console.log("PRE Q");
io.emit('gotQuestions')
console.log("POST Q");
/*
app.get('/',function(req,res){ 
    res.set({ 
        'Access-control-Allow-Origin': '*'
        }); 
    return res.redirect('index.html'); 
    }).listen(3000) 
*/
    // include routes
var routes = require('./routes/router');
app.use('/', routes);


/*
app.get('/sign_up', function(req, res){
    res.sendFile(__dirname + '/sign_up.html');
});
*/
app.get('/sign_up_success', function(req, res){
    res.sendFile(__dirname + '/sign_up_success.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});
/*
app.get('/media/Scorebug.png', function(req, res) {
    res.sendFile(__dirname + '/media/Scorebug.png');
});

app.get('/media/HalfTime.png', function(req, res) {
    res.sendFile(__dirname + '/media/HalfTime.png');
});
*/
app.get('/media/QuizNightNoBKG.png', function(req, res) {
    res.sendFile(__dirname + '/media/QuizNightNoBKG.png');
});
/*
app.get('/media/LowerThird.png', function(req, res) {
    res.sendFile(__dirname + '/media/LowerThird.png');
});
*/
app.get('/media/chalk.jpg', function(req, res) {
    res.sendFile(__dirname + '/media/chalk.jpg');
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

app.get('/fonts/vtcallskratchedupone-webfont.woff2', function(req, res) {
    res.sendFile(__dirname + '/fonts/vtcallskratchedupone-webfont.woff2');
});

io.on('connection', function(socket){
    socket.on('getQuestions', function(msg){
        console.log("socket.on")
        io.emit('getQuestions', questions);
    });
    socket.on('newQuestion', function(msg){
        console.log("newQuestion.on")
        io.emit('newQuestion', msg);
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

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

// listen on port 3000
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
  });

/*
http.listen(3000,function(){
    console.log('listening on *:3000');
});
*/