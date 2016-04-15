var mongoose = require('mongoose');

mongoose.connect('mongodb://events:events@ds021010.mlab.com:21010/events', function(){
	console.log('mongodb connected');
});

module.exports = mongoose;