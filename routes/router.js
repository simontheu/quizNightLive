var express = require('express');
var router = express.Router();
var User = require('../models/user');
var render = require("../render");

var commonHeader = { 'Content-Type': 'html' };


var bodyParser = require("body-parser"); 

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
/*
router.post('/3', urlencodedParser, function (req, res) { // login
  console.log(req.body);
  res.send('welcome, ' + req.body.username)
})
*/

// GET route for reading data
router.get('/1', function (req, res, next) {
  res.writeHead(200, commonHeader);
      if (req.session !== undefined && req.session.userId !== undefined) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }
      render.view("header", {}, res);
      //var printThis = req.session.username ;
      console.log(">>");
      //console.log(printThis);
      //console.log(req.session.userId);
      console.log("<<");

      if (loggedIn) {
        render.view("video", {}, res);
        render.view("questions", {}, res);
        render.view("logout", { username: req.session.username, teamname: req.session.teamname}, res);
      
      } else {
        //dont render video, render registration request
        render.view("login", {}, res);
        render.view("sign_up", {}, res);
      }
      //footer
      res.end();
      //return res.sendFile(path.join(__dirname + '/index.html'));
});


// GET route for reading data
router.get('/2', function (req, res, next) {
  res.writeHead(200, commonHeader);
      render.view("updater", {}, res);
      res.end();
      //return res.sendFile(path.join(__dirname + '/index.html'));
});

/*
router.get('/index', function(req, res){
  res.sendFile(path.join(__dirname + '../index.html'));
});
*/
//POST route for updating data
//router.post('/1', function (req, res, next) {
router.post('/1', urlencodedParser, function (req, res, next) { // login
  // confirm that user typed same password twice
  if (req.body !== undefined) {
    console.log(req.body);
  } else {
    console.log(req);
  }
  console.log(req.body.password);
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      teamname: req.body.teamname,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        req.session.username = user.username;
        console.log("test1");
        return res.redirect('/1');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        req.session.username = user.username;
        console.log("test2" + req.session.userId);
        return res.redirect('/1');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    
    //req.session = null;
    

    req.session.destroy(function (err) {
      res.clearCookie('connect.sid', { path: '/' });
      if (err) {
        return next(err);
      } else {
        console.log("this branch taken!")
        return res.redirect('/1');
      }
    });
    
  }
});

module.exports = router;