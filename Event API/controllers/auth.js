var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

//manage authentication for API endpoints
passport.use(new BasicStrategy(
	function(username, password, callback){
		User.findOne({username: username}, function(err, user){
			if(err) {return callback(err);}

			//if no user was found to match username
			if(!user) {return callback(null, false);}

			//user was found verify password
			user.verifyPassword(password, function(err, isMatch){
				if(err) {return callback(err);}

				//if password is wrong
				if(!isMatch) {return callback(null, false);}

				//on success
				return callback(null, user);
			});
		});
	}
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});