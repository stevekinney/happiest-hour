// var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
// var scrape = express();
var scrape = require('express')();
var http = require('http').Server(scrape);

scrape.get('/scrape', function(req, res) {
  url = 'http://www.milehighhappyhour.com/arvada/3-sons-italian-restaurant-bar/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var barName, location, time, drink, food, image, url;
      var json = {barName : "", location: "", time : "", drink: "", food: "", image : "", url : "" };

      $('.entry-content').filter(function(){
        var data = $(this);

        barName = data.children().first().text();

        json.barName = barName;
      })
    }
  })
})

console.log("ASDAERFSXC")

http.listen(3000, function(){
  console.log('listening on *:3000');
});

exports = module.exports = scrape;
