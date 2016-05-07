/*Source: http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/*/

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var eventController = require('./controllers/event');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

mongoose.connect('', function(){
	console.log('mongodb connected');
});

var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

//create router
var router = express.Router();

var port = process.env.PORT || 9000;

//set up ejs as a template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//endpoint handlers for /events
router.route('/events')
	.post(authController.isAuthenticated, eventController.postEvents)
	.get(eventController.getEvents);

//endpoint handlers for /events/:event_id
router.route('/events/:event_id')
	.get(eventController.getEvent)
	.put(authController.isAuthenticated, eventController.putEvent)
	.delete(authController.isAuthenticated, eventController.deleteEvent);

//endpoint handlers for /users
router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

//endpoint handlers for /users/:user_id
router.route('/users/:user_id')
	.get(authController.isAuthenticated, userController.getUser)
	.delete(authController.isAuthenticated, userController.deleteUser);

//register all routes with /api
app.use('/api', router);

app.use(function(req, res, next){
	var err = new Error('404 - Page Is Nowhere to be Found');
    res.status(404);
    next(err);
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('error', {error: err});
});

app.listen(port, function(){
	console.log('Server listening on', port)
});