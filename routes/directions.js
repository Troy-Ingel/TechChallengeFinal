// import modules
var express = require('express');
var router = express.Router();
const https = require('https');
var request = require('request');

const apiKey = 'AIzaSyDKWd6bBOs6KH10TcE5729ZTWeUdrIdyLI';

// endpoint for fetching transit directions 
router.get('/', function(req, res){

	const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
	const origin = req.query.origin;
	const destination = req.query.destination;
	const mode = req.query.mode;

	var url = baseUrl + '?origin=' + origin + '&destination=' + destination;
	url += '&key=' + apiKey;
	url += '&mode=' + mode;

	https.get(url, (httpRes) => {
		let data = '';
		httpRes.on('data', (chunk)=> data += chunk);
		httpRes.on('end', ()=>{
			res.json(JSON.parse(data));
		});
	}).on('error', (err) => {
		res.json(err);
	});
})
// endpoint for fetching the users geolocation
.get('/geocode', function(req, res){

	const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
	const latlng = req.query.latlng;
	var url = baseUrl + '?latlng=' + latlng;
	url += '&key=' + apiKey;

	console.log(url);

	https.get(url, (httpRes) => {
		let data = '';
		httpRes.on('data', (chunk)=> data += chunk);
		httpRes.on('end', ()=>{
			res.json(JSON.parse(data));
		});
	}).on('error', (err) => {
		res.json(err);
	});
})

.get('/locate', function(req, res){
	request.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDKWd6bBOs6KH10TcE5729ZTWeUdrIdyLI', function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;