var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var headers;
  /************************************* Get Completed calls info ***************************/
  /* Get agent information */
router.get('/completedcalls', function(req, res, next) {
  headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } 
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/completedcalls',
          rejectUnauthorized : false,
          headers:headers
        };
  
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var data = [];
            var dpt;
            var i =0;
            console.log(info.length)
            res.render('completedcalls',{mydata:info, duration: function(picktime,endtime) {
                                                                                            var then = moment(endtime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now =  moment(picktime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                } 
                                }
                      );
          }
          
      else
        {
        //  data = null;
          console.log(error);
        
        
        }
     }
 
    request(options, callback);

    });
/********* downloadcsv ********/    
  router.get('/completedcalls/downloadcsv/', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
    headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } 
    console.log(headers);
      var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/',
          rejectUnauthorized : false,
          headers:headers
        };
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
           // console.log(info);
            var keys = [];
            
                  var key = 0;
                  var val = info[0];
                  for(j in val){
                      var sub_key = j;
                      var sub_val = val.j;
                      //console.log(sub_key);
                      keys.push(sub_key);
                    
                    }
                    console.log(keys);


           // var i =0;
              json2csv({ data: info, fields: keys }, function(err, csv) {
    if (err) {
        console.log(err);
    }

    res.set({
        'Content-Disposition': 'attachment; filename=visitorcalls.csv',
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
