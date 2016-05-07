var mongoose = require('mongoose');

//define schema for an event
var EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
	address: { street: { type: String, required: true },
			 city: {type: String, required: true },
			 state: {type: String, required: true },
		     zip: {type: Number, required: true } 
	},
	date: {type: Date, required: true},
	url: { type: String },
	description: { type: String },
	owner_id: { type: String, required: true }
});

//export Event model
module.exports = mongoose.model('Event', EventSchema);