var express = require('express');
var router = express.Router();

var Tour = require('../models/tour');

router.get('/', function(req, res){
	res.render('removetours', {layout : false});
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
router.post('/', function(req, res){

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
		res.render('tours',{
			errors:errors
		});
    }
    else{

        Tour.removeTour(destination,days,budget,theme, function(err,tour){
			if(err) throw err;
				//  console.log(tour);
	        	if(!tour){
					// console.log('tours not found');
	        		return done(null, false, {message: 'No tours available'});
	        	}
				// req.flash('error_msg' , 'No tours available');
				console.log(tour);

				// req.flash('error_msg');
                req.flash('success_msg', 'Tour has been removed');
                res.redirect('/removetours');
		});
    }

});

module.exports = router;
