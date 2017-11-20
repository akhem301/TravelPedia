var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var TourPacks = mongoose.Schema({
	tourID: {
		type: String,
		index:true
	},
	name:{
		type: String,
		index:true
	},
	source:{
		type: String,
		index:true
	},
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
	},
	maxpeople:{
		type: Number,
		index:true
	},
	counter:{
		type: Number,
		index:true
	},
	lockstatus:{
		type: Boolean,
		index:true
	},
	image:{
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
// remove tour

module.exports.removeTour = function(cityname,days,budget,theme, callback){
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
	Tour.deleteOne(query, callback);
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

module.exports.getTourByStatus = function(lockstatus, callback){
	var query = {lockstatus: lockstatus};
	Tour.find(query, callback);
}

module.exports.getTourByID = function(ID, callback){
	var query = {ID: tourID};
	Tour.find(query, callback);
}
