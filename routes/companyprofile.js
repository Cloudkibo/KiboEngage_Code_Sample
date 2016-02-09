var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');

var headers ;       
  
    /************************************* Get Company information ****************/
    
  /* Get agent information */
router.get('/companyprofile', function(req, res, next) {
  headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } ;
    var options = {
          url: 'https://api.kibosupport.com/api/companyprofiles/fetch',
          rejectUnauthorized : false,
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length);
            console.log(info);
      res.render('companyprofile',{mydata:info});
               }
          
      else
        {
        //  data = null;
          console.log(error);
          res.send('could not fetch data.');
        
        }
     }
 
    request(options, callback);

    });  
  // write companyprofile in csv
  /********* download contact list in csv ********/    
  router.post('/companyprofile/downloadcsv', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
    var info = JSON.parse(req.body.dd);//data.msg;
    console.log(info);
    var keys = [];
    var key = 0;
    
    var val = info;
    for(j in val){
          var sub_key = j;
          var sub_val = val.j;
          keys.push(sub_key);
          }
         console.log(keys);
     json2csv({ data: info, fields: keys }, function(err, csv) {
        if (err) {
            console.log(err);
        }

      res.set({
          'Content-Disposition': 'attachment; filename=companyprofile.csv',
          'Content-Type': 'text/csv'
      });
    res.send(csv);
    });

  });  
module.exports = router;
