var Event = require('../models/event');

//get one event, end point /api/events:event_id
exports.getEvent = function (req, res, next){
	
	var id = req.params.event_id;
	console.log(id);

	Event.find({_id: id}, function (err, event){
		if(err) return next(err);
		res.json(event);
	});
};

//get all events, end point /api/events
exports.getEvents =  function(req, res, next){

	Event.find(function(err, events){
		if(err) return next(err);
		res.json(events);
	});
};

//add an event, end point /api/events
exports.postEvents = function(req, res, next) {

	var event = new Event({
		username: 'events',
		name: req.body.name,
		address: { street: req.body.street,
			 city: req.body.city,
			 state: req.body.state,
		     zip: req.body.zip
	    },
		date: req.body.date,
		url: req.body.url,
		description: req.body.description,
		owner_id: req.user._id
	});
	event.save(function(err, event){
		if(err) return next(err);
		res.json(event);
	});
};

//delete an event, end point /api/events/:event_id
exports.deleteEvent = function(req, res, next){

	var id = req.params.event_id;

	Event.remove({owner_id: req.user._id, _id: id}, function(err, events){
		if(err) return next(err);
		res.json(events);
	});
};

//edit an event, end point /api/events/:event_id
exports.putEvent = function (req, res, next) {
    var id = req.params.event_id;
    console.log(id);

	if(req.body.name == ""){
		res.json({message: "Name cannot be empty value"});
	}
	else if(req.body.street == ""){
		res.json({message: "Street cannot be empty value"});
	}
	else if(req.body.city == ""){
		res.json({message: "City cannot be empty value"});
	}
	else if(req.body.state == ""){
		res.json({message: "State cannot be empty value"});
	}
	else if(req.body.zip == ""){
		res.json({message: "Street cannot be empty value"});
	}
	else if(req.body.date == ""){
		res.json({message: "Date cannot be empty value"});
	}
	else{
	    Event.update(
		  	{owner_id: req.user._id, _id: id},
		    {name: req.body.name,
			address: { street: req.body.street,
				 city: req.body.city,
				 state: req.body.state,
			     zip: req.body.zip
		    },
			date: req.body.date,
			url: req.body.url,
			description: req.body.description,
			}, function (err, events) {
	        res.json(events);
	        });
	}
};
