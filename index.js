var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

// find the database url
// select set db, or local
reqlog.info('DB used', process.env.DB || 'production');

var app = apier({
	mongoUrl: nconf.get('databases')[process.env.DB || 'production'],
	access: nconf.get('access'),
	handleErrors: true
});

// matches
require('./v1/matches/all.js')(app);
require('./v1/matches/get.js')(app);

// matchDetails
require('./v1/matchDetails/get.js')(app);

var port = process.env.PORT || nconf.get('port');
http.createServer(app).listen(port, function() {
	reqlog.warn('server.start.success', 'On port ' + port);
});
