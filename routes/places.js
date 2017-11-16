// import modules
var express = require('express')
var router = express.Router();
var request = require('request');
var fs = require('fs');

// endpoint for retrieving all of the senior centers in Connecticut
router.get('/centers', function (req, res){
	request.get('https://data.ct.gov/resource/4pk7-jdkg.json', function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;