var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var TourPacks = mongoose.Schema({
	destination: {
		type: String,
		index:true
	},
	days:    {
		type: Number,
        index:true
	},
	budget:	 {
		type: Number,
        index:true
	},
	theme:   {
		type: String,
        index:true
	}
});

var Tour = module.exports = mongoose.model('Tour', TourPacks);

module.exports.createTour = function(newTour, callback){
	    newTour.save(callback);
}
// Tour.insertOne({ destination: 'Goa', days: '4', budget: '10000', theme: 'vacation'});
module.exports.getTourByTour = function(cityname,days,budget,theme, callback){
	var query = {};
	if(cityname)
		query = {destination : cityname};
	if(days)
		query = {days : days};
	if(budget)
		query = {budget : budget};
	if(theme)
		query = {theme : theme};
	//var query = {destination : cityname , days:days , budget:budget , theme:theme};
	Tour.find(query, callback);
	console.log(query);
}

module.exports.getTourByDestination = function(cityname, callback){
	var query = {destination : cityname};
	Tour.find(query, callback);
	// console.log(query);
}

module.exports.getTourByDays = function(days, callback){
	var query = {days : days};
	Tour.find(query, callback);
	// console.log(query);
}

module.exports.getTourByTheme = function(theme, callback){
	var query = {theme: theme};
	Tour.find(query, callback);
}

module.exports.getTourByBudget = function(budget, callback){
	var query = {budget: budget};
	Tour.find(query, callback);
}
