var express = require('express')
var router = express.Router();

var request = require('request');
var fs = require('fs');

router.get('/', function(req, res){
	//return all places with activities
})

router.get('/centers', function (req, res){
	request.get('https://data.ct.gov/resource/4pk7-jdkg.json', function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;