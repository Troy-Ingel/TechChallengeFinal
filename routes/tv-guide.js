// import modules
var express = require('express')
var router = express.Router();
var request = require('request');
var fs = require('fs');

// constants
const url = 'http://mobilelistings.tvguide.com/Listingsweb/ws/rest/schedules/80001.null/start/1510698600/duration/120?ChannelFields=Name%2CFullName%2CNumber%2CSourceId&ScheduleFields=ProgramId%2CEndTime%2CStartTime%2CTitle%2CAiringAttrib%2CCatId&formattype=json&disableChannels=music%2Cppv%2C24hr;';

// endpoint for retrieving the current tv listings
router.get('/current', function (req, res){
	request.get(url, function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;