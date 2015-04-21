var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scrape = express();
// var scrape = require('express')();
// var http = require('http').Server(scrape);

scrape.get('/scrape', function(req, res) {
  url = 'http://www.milehighhappyhour.com/arvada/3-sons-italian-restaurant-bar/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var barName, location, dTime, drink, food, image, url;
      var json = {barName : "", dTime :"", local: "", time : "", drink: "", food: "", image : "", url : "" };

      $('.entry-content').filter(function(){
        var data = $(this);

        barName = data.children().first().text();
        local = data.children().last().children().text();
        dTime = data.children().last().children().text();
        drink = data.children().last().children().text();
        food = data.children().last().children().text();
        image = data.children().last().children().text();
        url = data.children().last().children().text();

        json.barName = barName;
        json.local = local;
        json.dTime = dTime;
        json.drink = drink;
        json.food = food;
        json.image = image;
        json.url = url;
      })

      $('p').filter(function(){
        var data = $(this);

        local = data.text();

        json.local = local;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written - check your directory for the output.json');

      res.send('Check your console')
    });
  })
})

console.log("ASDAERFSXC")
scrape.listen('3000')

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

exports = module.exports = scrape;
