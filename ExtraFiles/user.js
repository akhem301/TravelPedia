var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
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
	},
	streetAddress: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},	
	profilepic: {
		data: Buffer, 
		contentType: String
	}

});

var User = module.exports = mongoose.model('User', UserSchema);

app.use(multer({ dest: ‘./uploads/’,
	rename: function (fieldname, filename) {
	  return filename;
	},
   }));
app.post(‘/api/photo’,function(req,res){
	var newItem = new Item();
	newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
	newItem.img.contentType = ‘image/png’;
	newItem.save();
   });   

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
