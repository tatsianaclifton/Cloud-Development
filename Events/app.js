var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Event = require('./models/event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 9090;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/templates'));

app.get('/', function(req, res){
	res.sendfile('layouts/app.html');
	//res.sendFile(path.join(__dirname, '/layouts', 'events.html'));
})

//get one event
app.get('/api/events/:id', function (req, res, next){
	
	var id = req.params.id;
	console.log(id);

	Event.findOne({_id: id}, function (err, event){
		if(err) return next(err);
		res.json(event);
	});
});

//get all events
app.get('/api/events', function(req, res, next){

	Event.find(function(err, events){
		if(err) return next(err);
		res.json(events);
	});
});

//add an event
app.post('/api/events', function(req, res, next){

	var event = new Event({
		username: 'events',
		name: req.body.name,
		zip: req.body.zip,
		email: req.body.email,
		kind: req.body.kind,
		free: req.body.free,
		url: req.body.url
	})
	event.save(function(err, event){
		if(err) return next(err);
		res.json(event);
	})
});

//delete an event
app.delete('/api/events/:id', function(req, res, next){

	var id = req.params.id;

	//Event.findOne({_id: id}, function(err, events){
		//if(err) return next(err);
		//res.json(events);
	//});

	Event.remove({_id: id}, function(err, events){
		if(err) return next(err);
		res.json(events);
	});
});

//edit an event
app.put('/api/events/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);

    Event.update(
	  	{_id: id},
	    {name: req.body.name,
		zip: req.body.zip,
		email: req.body.email,
		kind: req.body.kind,
		free: req.body.free,
		url: req.body.url
		}, function (err, events) {
        res.json(events);
        });
});

app.listen(port, function(){
	console.log('Server listening on', port)
});