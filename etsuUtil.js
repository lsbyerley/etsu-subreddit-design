const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs');

exports.getStandings = function(req, callback) {

    var url = 'http://www.soconsports.com/standings/Standings.dbml?&DB_OEM_ID=4000&SPID=1798';
    axios.get(url).then((res) => {

      var $ = cheerio.load(res.data),
          standings = [];

      $('table.standings-table tr').each(function(i, el) {
        if (i > 2) {
          var tds = $(this).children();
          var standing = {
            "team": $(tds[0]).text().trim(),
            "conf_record": $(tds[1]).text().trim(),
            "overall_record": $(tds[6]).text().trim(),
            "streak": $(tds[11]).text().trim()
          }
          standings.push(standing);
        }
      })

      callback(null, standings);

    }).catch((err) => {
      console.error(err)
      callback(err, [])
    })

}

exports.getRoster = function(req, callback) {

    var url = 'http://www.etsubucs.com/mbasketball/roster/';
    axios.get(url).then((res) => {

      var $ = cheerio.load(res.data),
          roster = [],
          roster_tables = $('.table.roster'),
          roster_table = roster_tables[0];

      $(roster_table).find('tr').each(function(i, el) {
        if (i > 0) {
          var tds = $(this).children();
          var player = {
            "num": $(tds[0]).text().trim(),
            "name": $(tds[1]).text().trim(),
            "pos": $(tds[2]).text().trim(),
            "height": $(tds[3]).text().trim(),
            "year": $(tds[5]).text().trim()
          }
          roster.push(player);
        }
      })

      callback(null, roster);

    }).catch((err) => {
      console.error(err)
      callback(err, [])
    })

}

exports.getStatistics = function(req, callback) {

  const url = 'https://www.sports-reference.com/cbb/schools/east-tennessee-state/2018.html'
  axios.get(url).then((res) => {

    const $ = cheerio.load(res.data)
    const perGameStatsTable = $('table#per_game')
    let stats = []

    //console.log($(perGameStatsTable).find('tbody tr'))

    $(perGameStatsTable).find('tbody tr').each((i, el) => {
      const tds = $(el).children();
      const fullName = $(tds[1]).text();
      if (fullName === 'Andre Edwards') { return true }
      const split = fullName.split(' ');
      const name = split[0].charAt(0) + '. ' + split[1]
      const playerStats = {
        "name": name,
        "mpg": $(tds[4]).text(),
        "ppg": $(tds[25]).text(),
        "rpg": $(tds[19]).text(),
        "apg": $(tds[20]).text(),
        "spg": $(tds[21]).text(),
        "bpg": $(tds[22]).text(),
        "tpp": $(tds[13]).text()
      }
      stats.push(playerStats)
    })

    callback(null, stats)

  }).catch((err) => {

  })

}
