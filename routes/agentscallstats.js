var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var  headers =  {
             'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
             'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
             'kibo-client-id': 'cd89f71715f2014725163952'     
          }
/* GET home page. */
router.get('/agentscallstats', function(req, res, next) {

   var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/agentcallstats',
          rejectUnauthorized : false,
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info);
            res.render('agentscallstats',{myinfo:info});

          }
      else
        {
          data = null;
          console.log(error);
          //res.render('groups',data);
        
        }
     }
 
    request(options, callback);

 });
 
 
 //write data in csv
 router.get('/agentscallstats/downloadcsv', function(req, res, next) {

   var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/agentcallstats',
          rejectUnauthorized : false,
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info);
            var val = info[0];
            var keys=[];
            for(j in val){
                  var sub_key = j;
                  var sub_val = val.j;
                  if(sub_key == '_id')
                        {
                          
                          var valc = info[0]._id;
                          for(k in valc)
                          {
                            var sub_sub_key = k;
                            var sub_sub_val = valc.k;
                           // console.log(sub_sub_key);
                            keys.push(sub_key+'.'+sub_sub_key);
                          }
                        }
                  else
                  {
                  keys.push(sub_key);
                  }
                  console.log(keys);
            }
            json2csv({ data: info, fields: keys }, function(err, csv) {
                if (err) {
                    console.log(err);
                }

              res.set({
                  'Content-Disposition': 'attachment; filename=agentscallstats.csv',
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
