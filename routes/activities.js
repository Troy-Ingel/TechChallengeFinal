var express = require('express')
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/finalChallenge";

router.get('/create', function(req, res){
	db.createCollection("activities", function(err, res) {
		if (err) throw err;
		console.log("Collection created!");
		db.close();
		res.end();
	});
})

router.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("activities").insertOne(req.body, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted", res);
			db.close();
		});
	});
})

router.get('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("activities").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		});
	});

})

module.exports = router;