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
router.get('/groupcallstats', function(req, res, next) {

   var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/deptcallstats',
          rejectUnauthorized : false,
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
            console.log(info.length)
            console.log(info.gotDeptCalls);
            console.log(info.deptNames);
            res.render('groupcallstats',{deptcalls:info.gotDeptCalls,deptNames:info.deptNames});

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

 
 
 //write in csv
 
 router.get('/groupcallstats/downloadcsv', function(req, res, next) {

   var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/deptcallstats',
          rejectUnauthorized : false,
          headers:headers
        };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data =[];
            var i =0;
           // console.log(info.length)
          //  console.log(info);
            var val = info.gotDeptCalls[0];
            var keys = [];
            for(j in val){
                  var sub_key = j;
                  var sub_val = val.j;
                  console.log(sub_key);
                  if(sub_key == '_id')
                        {
                          
                          var valc = info.gotDeptCalls[0]._id;
                          for(k in valc)
                          {
                            
                            var sub_sub_key = k;
                            var sub_sub_val = valc.k;
                            keys.push(sub_key + '.' + sub_sub_key);
                          }
                        }
                  else
                      {
                        keys.push(sub_key);
                      
                      }
            }
                           
            console.log(keys);
            json2csv({ data: info.gotDeptCalls, fields: keys }, function(err, csv) {
                if (err) {
                    console.log(err);
                }

              res.set({
                  'Content-Disposition': 'attachment; filename=groupcallstats.csv',
                  'Content-Type': 'text/csv'
              });
            res.send(csv);
           
          });
      }
      else
        {
          data = null;
          console.log(error);
          res.send('could not fetch data.');
        
        }
     }
 
    request(options, callback);

 });
 
module.exports = router;
