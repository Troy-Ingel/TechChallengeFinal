var express = require('express')
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_9pk3cb2k:e00cfbbg2i3boo1fagtg6ksmtt@ds257495.mlab.com:57495/heroku_9pk3cb2k";

router.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("guides").insertOne(req.body, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted", res);
			db.close();
		});
	});
})

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