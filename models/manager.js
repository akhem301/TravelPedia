var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// manager Schema
var ManagerSchema = mongoose.Schema({
	mID: {
		type: String,
		index:true
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	}
});

var Manager = module.exports = mongoose.model('Manager', ManagerSchema);

// module.exports.createManager = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback);
// 	    });
// 	});
// }

module.exports.getManagerByMID = function(username, callback){
	// console.log('in db');
	var query = {mID: username};
	Manager.findOne(query, callback);
	// console.log(query);
}

module.exports.getManagerById = function(id, callback){
	Manager.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
