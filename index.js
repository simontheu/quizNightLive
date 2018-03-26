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

app.get('/lib/easytimer/dist/easytimer.min.js', function(req, res) {
    res.sendFile(__dirname + '/lib/easytimer/dist/easytimer.min.js');
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
    console.log('connection received');
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});