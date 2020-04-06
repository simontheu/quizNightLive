var express = require('express');
var router = express.Router();
var User = require('../models/user');
var render = require("../render");

var commonHeader = { 'Content-Type': 'html' };


// GET route for reading data
router.get('/1', function (req, res, next) {
  res.writeHead(200, commonHeader);
      render.view("header", {}, res);
      var printThis = req.session.username ;
      console.log(">>");
      console.log(printThis);
      console.log(req.session.userId);
      console.log("<<");

      if (req.session.userId) {
        render.view("video", {}, res);
        render.view("questions", {}, res);
        render.view("logout", {}, res);
      
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
      render.view("header", {}, res);
      var printThis = req.session.username ;
      console.log(">>");
      console.log(printThis);
      console.log("<<");
      render.view("login_status", {"badges": 1}, res);
      res.end();
      //return res.sendFile(path.join(__dirname + '/index.html'));
});

/*
router.get('/index', function(req, res){
  res.sendFile(path.join(__dirname + '../index.html'));
});
*/
//POST route for updating data
router.post('/1', function (req, res, next) {
  // confirm that user typed same password twice
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

    req.session.destroy(function (err) {
      req.session = null;
      console.log("should of destroyed it now." + req.session)
      if (err) {
        return next(err);
      } else {
        return res.redirect('/1');
      }
    });
  }
});

module.exports = router;