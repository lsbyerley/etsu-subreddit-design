var request      = require('request');
var cheerio      = require('cheerio');
var fs           = require('fs');

exports.getStandings = function(req, callback) {
    
    var url = 'http://www.soconsports.com/standings/Standings.dbml?&DB_OEM_ID=4000&SPID=1798';
    request(url, function(error, response, html){
        if(!error){
        
            var $ = cheerio.load(html),
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
            //res.render('index', {standings: standings, hello:'hellotesting'});
        
        } else {
            console.log(error);
        }
    });
    
}

exports.getRoster = function(req, callback) {
    
    var url = 'http://www.etsubucs.com/mbasketball/roster/';
    request(url, function(error, response, html){
        if(!error){
        
            var $ = cheerio.load(html),
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
                
        } else {
            console.log(error);
        }
    });
}