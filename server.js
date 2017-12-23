var http = require('http');
var path = require('path');
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var etsuUtil = require('./etsuUtil.js');
var async = require('async');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.get('/', function(req, res, next) {

  async.waterfall([
      function(callback) {

        var data = [];

          etsuUtil.getStandings(req, function(err, standings) {
            if(err)
        			console.error(err);

        			data.standings = standings;
        			callback(null, data);
          });

      },
      function(data, callback) {

          etsuUtil.getRoster(req,function(err, roster) {
            if(err)
        			console.error(err);

        			data.roster = roster;
        			callback(null, data);
          });

      }
  ], function (err, data) {
      if(err)
        console.error(err);

      res.render('index', {
        data: data
      });

  });

});

app.get('/cbb-betting', function(req, res, next) {
  etsuUtil.getCBBBetting(req, function(err, data) {
    res.render('cbb-betting', {
      data: data
    })
  })
})

var port = process.env.PORT || 8080;

app.listen(port);
console.log("App listening on port " + port);
