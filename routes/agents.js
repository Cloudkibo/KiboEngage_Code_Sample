var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var headers;        
  
/* Get agent information */
router.get('/agents', function(req, res, next) {
  headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } 
    var options = {
          url: 'https://api.kibosupport.com/api/users/allagents',
          rejectUnauthorized : false,
          headers:headers
        };
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.agents.length)
            console.log(info.agents);
            res.render('agents',{mydata:info.agents});

          }
      else
        {
          data = null;
          console.log(error);
        
        //  res.render('agents',data);
        
        }
     }
 
    request(options, callback);

    });
/********* downloadcsv ********/    
  router.get('/agents/downloadcsv/', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
      headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } ;
      var options = {
          url: 'https://api.kibosupport.com/api/users/allagents',
          rejectUnauthorized : false,
          headers:headers
        };
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var keys = [];
            
                  var key = 0;
                  var val = info.agents[0];
                  for(j in val){
                      var sub_key = j;
                      var sub_val = val.j;
                      
                      console.log(sub_key);
                      keys.push(sub_key);
  
                    }


           // var i =0;
              json2csv({ data: info.agents, fields: keys }, function(err, csv) {
    if (err) {
        console.log(err);
    }

    res.set({
        'Content-Disposition': 'attachment; filename=agents.csv',
        'Content-Type': 'text/csv'
    });
    res.send(csv);
});

          }
      else
        {
          data = null;
          console.log(error);
        
          res.send('Could not fetch data');
        
        }
     }
 
    request(options, callback);

  });    
module.exports = router;
