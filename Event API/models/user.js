var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define schema for an event
var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
	password: { type: String, required: true }
});

//before each user.save call
UserSchema.pre('save', function(callback){
	var user = this;

	//if passwaord was not modified do not do anything
	if(!user.isModified('password')) return callback();

	//else if password was modified hash it
	bcrypt.genSalt(5, function(err, salt){
		if(err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return callback(err);

			user.password = hash;
			callback();
		});
	});
});

//function to verify a password to authenticate calls to API
UserSchema.methods.verifyPassword = function(password, callback){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return callback(err);
		callback(null, isMatch);
	});
};

//export User model
module.exports = mongoose.model('User', UserSchema);