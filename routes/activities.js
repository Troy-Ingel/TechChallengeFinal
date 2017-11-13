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

router.get('/add', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		
		var myobj = { 
			name: "Jake Cyr", 
			lat: 41.2185485,
			lon: -73.1526622,
			activityName: 'Bingo',
			date: '11/13/2017',
			timeStart: 18,
			timeEnd: 19
		};

		db.collection("activities").insertOne(myobj, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
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