var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var TourPacks = mongoose.Schema({

	tourname: {
		type: String,
		index:true
	},
	source: {
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
	capacity: {
		type: Number,
		index:true
	},
	tourit: {
		type: String,
		index:true
	},
	staff: {
		type: String,
		index:true
	},
	counter: {
		type: Number,
		index:true
	},
	status: {
		type: Number,
		index:true
	},
	theme:   {
		type: String,
        index:true
	},
	url: {
		type: String,
		index:true
	}
});

var Tour = module.exports = mongoose.model('Tour', TourPacks);

module.exports.createTour = function(newTour, callback){
	    newTour.save(callback);
}
// Tour.insertOne({ destination: 'Goa', days: '4', budget: '10000', theme: 'vacation'});

//Tour by ID
module.exports.getTourById = function(id, callback){
	Tour.findById(id, callback);
}

//Get tour by search
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
	//console.log(query);
}

module.exports.getAllTours = function(callback){
	var query = {};

	Tour.find(query, callback);
	// console.log(query);
}

// remove tour
// module.exports.removeTour = function(cityname,days,budget,theme, callback){
// 	var query = {};
// 	if(cityname)
// 		query = {destination : cityname};
// 	if(days)
// 		query = {days : days};
// 	if(budget)
// 		query = {budget : budget};
// 	if(theme)
// 		query = {theme : theme};
// 	//var query = {destination : cityname , days:days , budget:budget , theme:theme};
// 	Tour.deleteOne(query, callback);
// 	// console.log(query);
// }

//get tour by id
module.exports.getTourById = function(id, callback){
	Tour.findById(id, callback);
}

// get tour by name
module.exports.getTourByName = function(name, callback){
	var query = {tourname : name};
	Tour.find(query, callback);
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

// Updating the tours
module.exports.updateTourByIti = function(id,iti, callback){
	var query = {_id: id};
	var newval = {tourit: iti}
	Tour.updateOne(query, newval ,callback);
}

module.exports.updateTourByCounter = function(id,cnt, callback){
	var query = {_id: id};
	var newval = {counter: cnt}
	Tour.updateOne(query, newval ,callback);
}
