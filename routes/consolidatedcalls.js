var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var  headers =  {
             'kibo-app-id' : '5wdqvvi8jyvfhxrxmu73dxun9za8x5u6n59',
             'kibo-app-secret': 'jcmhec567tllydwhhy2z692l79j8bkxmaa98do1bjer16cdu5h79xvx',
             'kibo-client-id': 'cd89f71715f2014725163952'     
          }
 /**************************** Get Consolidated calls ***********/
    
  
router.get('/consolidatedcalls', function(req, res, next) {
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/consolidatedcalls',
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
            res.render('consolidatedcalls',{mydata:info, elapsedtime: function(requesttime,picktime,status) {
                                                                                      if(status == 'waiting')
                                                                                      {
                                                                                            var then = moment(requesttime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now = moment();
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                         
                                                                                        
                                                                                      }
                                                                                      else
                                                                                      {
                                                                                            var then = moment(picktime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
                                                                                            var now = moment();
                                                                                            var diff = moment.duration(then.diff(now));
                                                                                            if (diff < 0) {
                                                                                                diff = Math.abs(diff);
                                                                                            }
                                                                                            var d = moment.utc(diff).format("HH:mm:ss:SSS");
                                                                                            console.log("Difference: " + d);
                                                                                            return d;
                                                                                      }
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
    
module.exports = router;
