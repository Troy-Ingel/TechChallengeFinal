// import modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//constants
const port = process.env.PORT || 8080;

// Import the defined routes
var directionsRouter = require('./routes/directions');
var geocodeRouter = require('./routes/geocode');
var placesRouter = require('./routes/places');
var travelRouter = require('./routes/travel');
var activitiesRouter = require('./routes/activities');
var tvGuideRouter = require('./routes/tv-guide');
var techGuideRouter = require('./routes/tech-guides');

// set up express middleware
express()
.use(morgan('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(express.static('public'))
.use('/directions', directionsRouter)
.use('/geocode', geocodeRouter)
.use('/places', placesRouter)
.use('/travel', travelRouter)
.use('/activities', activitiesRouter)
.use('/tv-guide', tvGuideRouter)
.use('/tech-guides', techGuideRouter)
.listen(port, () => console.log('Sever running at localhost:' + port));