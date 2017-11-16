// import modules
var express = require('express')
var router = express.Router();
// connect to deployed database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_9pk3cb2k:e00cfbbg2i3boo1fagtg6ksmtt@ds257495.mlab.com:57495/heroku_9pk3cb2k";

// endpoint to create the activities collection in the database
router.get('/create', function(req, res){
	db.createCollection("activities", function(err, res) {
		if (err) throw err;
		console.log("Activities Collection created!");
		db.close();
		res.end();
	});
})
// endpoint to post a new activity in the database
.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("activities").insertOne(req.body, function(err, res) {
			if (err) throw err;
			console.log("New activity inserted", res);
			db.close();
		});
	});
})
// endpoint to find all of the activities in the database
.get('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("activities").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		});
	});

});

module.exports = router;