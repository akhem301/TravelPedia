var express = require('express');
var router = express.Router();
var passportM = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Manager = require('../models/manager');
var Tour = require('../models/tour');

router.get('/login1', function(req, res){
	res.render('manager_login' , {layout:'manager_layout.handlebars'});
});

// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.redirect('/managers/login');
// 	}
// }

router.get('/edittours', function(req, res){
	//res.render('edittour' , {layout:'manager_layout.handlebars'});

    Tour.getAllTours(function(err,tour){
        if(err) throw err;
            //  console.log(tour);
            if(!tour){
                console.log('tours not found');
                return done(null, false, {message: 'No tours available'});
            }

            res.render('edittour', {tour : tour, layout:'manager_layout.handlebars'});
    });
});

// Set itinerary

router.get('/settouritin',function(req,res){

    Tour.getAllTours(function(err,tour){
        if(err) throw err;
            //  console.log(tour);
            if(!tour){
                console.log('tours not found');
                return done(null, false, {message: 'No tours available'});
            }
            //console.log(tour[0].tourname);
            res.render('settouritin', {tour : tour, layout:'manager_layout.handlebars'});
    });
});

router.post('/settouritin',function(req,res){
    var name = req.body.tourname;

    Tour.getTourByName(name,function(err,tour2) {
        if(err) throw err;
            if(!tour2){
                return done(null, false, {message: 'No tours available'});
            }
            // console.log(tour2[0].tourname);
            res.render('settouritin', {tour2 : tour2, layout:'manager_layout.handlebars'});
    });
});

router.post('/savechanges',function(req,res){

    var itinerary=req.body.itval;
    var idd =req.body.id; 
    //console.log(idd);

    Tour.updateTourByIti(idd,itinerary,function(err,tour){
        if(err) throw err;
            if(!tour){
                return done(null, false, {message: 'Tour not found!'});
            }

            Tour.getAllTours(function(err,tour){
                if(err) throw err;
                    //  console.log(tour);
                    if(!tour){
                        console.log('tours not found');
                        return done(null, false, {message: 'No tours available'});
                    }
                    //console.log(tour[0].tourname);
                    res.render('settouritin', {tour : tour, layout:'manager_layout.handlebars'});
        });
    });
});

// Authenticate Manager
passportM.use(new LocalStrategy(
 function(mID, password, done) {
   Manager.getManagerByMID(mID, function(err, manager){
	// console.log('up here');
   	if(err) throw err;
   	if(!manager){
   		return done(null,false,{message: 'Unknown Manager'});
   	}

	Manager.comparePassword(password, manager.password, function(err, isMatch){
		if(err) throw err;
		if(isMatch){
			return done(null, manager);
		} else {
			return done(null, false, {message: 'Invalid password'});
		}
	});
   });
  }));

passportM.serializeUser(function(manager, done) {
  done(null, manager.id);
});

passportM.deserializeUser(function(id, done) {
  Manager.getManagerById(id, function(err, manager) {
    done(err, manager);
  });
});


router.post('login1',
passportM.authenticate('local', {successRedirect:'/', failureRedirect:'/managers/login1',failureFlash: true}),
 function(req, res) {
	 console.log('in post');
	res.render('manager_login' , {layout: 'manager_layout.handlebars'});
});

module.exports = router;
