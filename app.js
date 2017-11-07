var express = require('express');

const port = process.env.PORT || 8080;

express()
	.use(express.static('public'))
	.listen(port);