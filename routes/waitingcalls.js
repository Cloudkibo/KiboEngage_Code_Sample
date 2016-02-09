var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var headers;
   /************************************* Get waiting calls information ****************/
    
  /* Get agent information */
router.get('/waitingcalls', function(req, res, next) {
  headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } ;
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/waitingcalls',
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
      res.render('waitingcall',{mydata:info, waittime: function(requesttime) {
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
