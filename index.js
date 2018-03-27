var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Timer = require('easytimer');

var timer = new Timer();

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/media/clock_static.png', function(req, res) {
    res.sendFile(__dirname + '/media/clock_static.png');
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
    socket.on('awayScore', function(msg){
      console.log('awayScore' +msg );  
      io.emit('awayScore',  msg);
    });
    socket.on('homeScore', function(msg){
        console.log('homeScore' +msg );
        io.emit('homeScore', msg);
    });
    socket.on('clockAnim', function(msg){
        console.log('clockAnim' +msg );
        io.emit('clockAnim', msg);
    });
    socket.on('clockTime', function(msg){
        console.log('clockTime' +msg );
        io.emit('clockTime', msg);
    });
    socket.on('timeAnnounce', function(msg){
        console.log('timeAnnounce' +msg );
        io.emit('timeAnnounce', msg);
    });
    socket.on('halfUpdate', function(msg){
        console.log('halfUpdate' +msg );
        io.emit('halfUpdate', msg);
    });
    socket.on('timeAdjust', function(msg){
        console.log('timeAdjust' +msg );
        io.emit('timeAdjust', msg);
    });
    socket.on('homeScoreUpdate', function(msg){
        console.log('homeScoreUpdate' +msg );
        io.emit('homeScoreUpdate', msg);
    });
    socket.on('awayScoreUpdate', function(msg){
        console.log('awayScoreUpdate' +msg );
        io.emit('awayScoreUpdate', msg);
    });
    console.log('connection received');
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});