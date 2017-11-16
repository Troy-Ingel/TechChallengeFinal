// import modules
var express = require('express')
var router = express.Router();
// connect to deployed database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_9pk3cb2k:e00cfbbg2i3boo1fagtg6ksmtt@ds257495.mlab.com:57495/heroku_9pk3cb2k";

// endpoint to create the calendar collection in the database
router.get('/create', function(req, res){
	db.createCollection("calendar", function(err, res) {
		if (err) throw err;
		console.log("Calendar collection created!");
		db.close();
		res.end();
	});
})
// endpoint to post a new calendar reminder to the database
.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("calendar").insertOne(req.body, function(err, res) {
			if (err) throw err;
			console.log("calendar reminder inserted", res);
			db.close();
		});
	});
})
// endpoint to find all of the calendar reminders in the database
.get('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("calendar").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		});
	});

});

module.exports = router;