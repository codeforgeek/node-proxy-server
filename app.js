var express  = require('express');
var app      = express();
var fs       = require("fs");
var morgan   = require("morgan");
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
app.use(morgan('combined',{stream: accessLogStream}));

var postingAPI = 'http://localhost:3001',
    realtimeAPI = 'http://localhost:3002',
    onemoreAPI = 'http://localhost:3003';

app.all("/app1/*", function(req, res) {
    console.log('redirecting to APP1');
    apiProxy.web(req, res, {target: postingAPI});
});

app.all("/app2/*", function(req, res) {
    console.log('redirecting to APP2');
    apiProxy.web(req, res, {target: realtimeAPI});
});

app.all("/app3/*", function(req, res) {
    console.log('redirecting to APP3');
    apiProxy.web(req, res, {target: realtimeAPI});
});

app.listen(3000);
