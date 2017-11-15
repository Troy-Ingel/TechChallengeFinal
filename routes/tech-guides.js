// import modules
var express = require('express')
var router = express.Router();
// connect to deployed database
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://heroku_9pk3cb2k:e00cfbbg2i3boo1fagtg6ksmtt@ds257495.mlab.com:57495/heroku_9pk3cb2k";

// endpoint for posting a new guide
router.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("guides").insertOne(req.body, function(err, res) {
			if (err) throw err;
			console.log("guide saved to database");
			db.close();
		});
	});
})

// endpoint for retrieving all of the stored guides
.get('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("guides").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		});
	});
});

module.exports = router;