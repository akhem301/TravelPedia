var express = require('express');
var router = express.Router();

var Tour = require('../models/tour');

router.get('/', function(req, res){
	res.render('searchtours');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

// Search Tours
router.post('/searchtours', function(req, res){

	// console.log("here");
	var destination = req.body.destination;
	var days = req.body.days;
	var budget = req.body.budget;
	var theme = req.body.theme;

	// Validation
	// req.checkBody('destination', '*required').notEmpty();
	// req.checkBody('days', '*required').notEmpty();
	// req.checkBody('budget', '*required').notEmpty();
	// req.checkBody('theme', '*required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('searchtours',{
			errors:errors
		});
	}
	else {
		Tour.getTourByTour(destination,days,budget,theme, function(err,tour){
			if(err) throw err;
				//  console.log(tour);
	        	if(!tour){
					// console.log('tours not found');
	        		return done(null, false, {message: 'No tours available'});
	        	}
				res.render('searchtours', {
				tour : tour
				});
		});
	}
});

router.post('/viewtours' , function(req,res){

		var idd = req.body.id;
		// console.log(idd);
		Tour.getTourById(idd, function(err,tournew){
			if(err) throw err;
	        	if(!tournew){
	        		return done(null, false, {message: 'No tours available'});
	        	}
				// console.log(tournew);
				res.render('tour', {tournew : tournew, layout:'layout.handlebars'});
		});

});

router.post('/buytour' , function(req,res){

		var idd = req.body.id;
		console.log(idd);
		Tour.getTourById(idd, function(err,tournew){
			if(err) throw err;
	        	if(!tournew){
	        		return done(null, false, {message: 'No tours available'});
	        	}
				// console.log(tournew);
				var c=tournew.counter;
				c= c+1;
				tournew.counter=c;

				Tour.updateTourByCounter(idd,c,function(err,tour){
			        if(err) throw err;
			            if(!tour){
			                return done(null, false, {message: 'Tour not found!'});
			            }
			    });

				res.render('tour', {tournew : tournew, layout:'layout.handlebars'});
		});

});

module.exports = router;
