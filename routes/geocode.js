// import modules
var express = require('express')
var router = express.Router()
var request = require('request');
// constants
const apiKey = 'AIzaSyDKWd6bBOs6KH10TcE5729ZTWeUdrIdyLI';

// endpoint is used to locate the users geocode
router.get('/', function (req, res){
	const address = req.query.address;
	const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + apiKey;
	request.get(url, function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;