var express = require('express');
var seniorCenterRouter = require('./routes/seniorCenters');
var geocodeRouter = require('./routes/geocode');

const port = process.env.PORT || 8080;

express()
	.use(express.static('public'))
	.use('/centers', seniorCenterRouter)
	.use('/geocode', geocodeRouter)
	.listen(port);