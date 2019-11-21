var express = require('express');
var etsuUtil = require('./etsuUtil.js');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));

app.get('/', async function(req, res, next) {

  //Perform in parallel
  const standingsPromise = etsuUtil.getStandings()
  const rosterPromise = etsuUtil.getRoster()
  const statsPromise = etsuUtil.getStatistics()
  const standingsRes = await standingsPromise;
  const rosterRes = await rosterPromise;
  const statsRes = await statsPromise;

  const data = {
    standings: standingsRes,
    roster: rosterRes,
    stats: statsRes
  }
  
  return res.render('index', {
    data
  })

});

var port = process.env.PORT || 8080;

app.listen(port);
console.log("App listening on port " + port);
