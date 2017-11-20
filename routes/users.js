var express = require('express');
var router = express.Router();
var passportU = require('passport');
var LocalstrategyU = require('passport-local').Strategy;

var User = require('../models/user');
var Manager = require('../models/manager');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// User Login
router.get('/login', function(req, res){
	res.render('login');
});

// // Manager Login
// router.get('/login1', function(req, res){
// 	console.log(req.body.name);
// 	res.render('manager_login' , {layout:'manager_layout.handlebars'});
// });

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');

	}
});

passportU.use(new LocalstrategyU(
	{
   usernameField: 'mID',
   passwordField: 'password',
   passReqToCallback: true

 	},
  function(req, username, password, done) {
	//   console.log(req.body);
	  if(req.body.username)
	  {
		   User.getUserByUsername(username, function(err, user){
			   console.log('in user');
		   	if(err) throw err;
		   	if(!user){
		   		return done(null, false, {message: 'Unknown User'});
		   	}
			   	User.comparePassword(password, user.password, function(err, isMatch){
			   		if(err) throw err;
			   		if(isMatch){
			   			return done(null, user);
			   		} else {
			   			return done(null, false, {message: 'Invalid password'});
			   		}

			   	});
			});
	   }
	   else
	   {
		   Manager.getManagerByMID(username, function(err, manager){
			 //  console.log(manager.password);
			 if(err) throw err;
			 if(!manager){
				 return done(null,false,{message: 'Unknown Manager'});
			 }

			 if(password == manager.password){
				 return done(null, manager);
			 } else {
				 return done(null, false, {message: 'Invalid password'});
			 }
	 		});
	   }
}));

passportU.serializeUser(function(manager, done) {
  done(null, manager.id);
});

passportU.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passportU.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.render('/');
  });

  router.post('/login1',
    passportU.authenticate('local', {successRedirect:'/managers/login1', failureRedirect:'/managers/login1',failureFlash: true}),
    function(req, res) {
      res.render('/');
    });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
