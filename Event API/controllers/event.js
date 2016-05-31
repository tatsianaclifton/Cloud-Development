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

//get all events that has particular owner, end point /api/events/users/:owner_id
exports.getEventsUser = function (req, res, next){
	
	var owner_id = req.params.owner_id;
	console.log(owner_id);

	Event.find({'owner_id': owner_id}, function (err, events){
		if(err) return next(err);
		res.json(events);
	});
};

//get events by zip, end point /api/zip/:event_zip
exports.getEventZip = function (req, res, next){
	
	var zip = req.params.event_zip;
	console.log(zip);

	Event.find({'address.zip': zip}, function (err, event){
		if(err) return next(err);
		res.json(event);
	});
};

//get events by zip, end point /api/zip/:event_zip
exports.getEventName = function (req, res, next){
	
	var name = req.params.event_name;
	console.log(name);

	Event.find({'name': name}, function (err, event){
		if(err) return next(err);
		res.json(event);
	});
};

//get events by city, end point /api/city/:event_city
exports.getEventCity = function (req, res, next){
	
	var city = req.params.event_city;
	console.log(city);

	Event.find({'address.city': city}, function (err, event){
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
