var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var headers;        
   /************************************* Get abandoned calls information ****************/
 
router.get('/abandonedcalls', function(req, res, next) {
  
   
  headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          };
    var options = {
          url: 'https://api.kibosupport.com/api/visitorcalls/abandonedcalls',
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
             res.render('abandonedcalls',{mydata:info});
               }
          
      else
        {
        //  data = null;
          err = 'Authentication failed';
          console.log(err);
          res.render('index',{autherr:err});
        
        }
     }
 
    request(options, callback);

    });
     
module.exports = router;
