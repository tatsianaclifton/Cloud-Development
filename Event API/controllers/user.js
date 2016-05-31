var User = require('../models/user');
var Event = require('../models/event');

//get one user, end point /api/users:username
exports.getUser = function (req, res, next){
	
	var username = req.params.username;
	console.log(username);

	User.find({username: username}, function (err, user){
		if(err) return next(err);
		res.json(user);
	});
};

//get all users, end point /api/users
exports.getUsers = function(req, res, next){
	    User.find(function(err, users){
		if(err) return next(err);
		res.json(users);
	});
};


//add a user, end point /api/users
exports.postUsers = function(req, res, next){
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err){
		if(err) return next(err);

		res.json({message: "New user was added"});
	});
};

//delete a user, end point /api/users/:user_id
exports.deleteUser = function(req, res, next){

	var username = req.params.username;

	User.remove({'username': username}, function(err){
		if(err) return next(err);
		res.json({message: "User was removed"});
	});

	/*Event.remove({owner_id: id}, function(err, events){
		if(err) return next(err);
		res.json({message: "Events by this user were removed"});
	});*/
};

