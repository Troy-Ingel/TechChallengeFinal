var express = require('express')
var router = express.Router();

var request = require('request');
var fs = require('fs');

router.get('/current', function (req, res){
	var time = Math.ceil((new Date()).getTime() / 1000);
	var url = 'http://mobilelistings.tvguide.com/Listingsweb/ws/rest/schedules/80001.null/start/' + time + '/duration/120?ChannelFields=Name%2CFullName%2CNumber%2CSourceId&ScheduleFields=ProgramId%2CEndTime%2CStartTime%2CTitle%2CAiringAttrib%2CCatId&formattype=json&disableChannels=music%2Cppv%2C24hr;';
	console.log(url);
	request.get(url, function(err, response, body){
		res.json(JSON.parse(body));
	});
});

module.exports = router;