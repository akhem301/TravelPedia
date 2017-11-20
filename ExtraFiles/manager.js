var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// manager Schema
var ManagerSchema = mongoose.Schema({
	mID: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
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

module.exports.getManagerByID = function(mID, callback){
	var query = {mID: mID};
	Manager.findOne(query, callback);
}

//module.exports.getManagerById = function(id, callback){
//	Manager.findById(id, callback);
//}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
