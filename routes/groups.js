
var express = require('express');
var router = express.Router();
var needle = require('needle');
var https = require('https');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');
var headers;      
  
/*************************** Get groups information *********************************/

router.get('/groups', function(req, res, next) {
    headers =  {
              'kibo-app-id': req.session.kiboappid ,
              'kibo-app-secret': req.session.kiboappsecret,
              'kibo-client-id': req.session.kiboclientid,
              'content-type' : 'application/x-www-form-urlencoded'
              
          } 
    var options = {
          url: 'https://api.kibosupport.com/api/departments',
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
            res.render('groups',{mydata:info});

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
    
    
    
/********* downloadcsv ********/    
  router.get('/groups/downloadcsv/', function(req, res, next) {
    res.set('Content-Type', 'application/octet-stream');
      var options = {
          url: 'https://api.kibosupport.com/api/departments',
          rejectUnauthorized : false,
          headers:headers
        };
      
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var keys = [];
            var key = 0;
            var val = info[0];
            for(j in val){
                  var sub_key = j;
                  var sub_val = val.j;
                  if(sub_key == 'createdby')
                        {
                          
                          var valc = info[0].createdby;
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
                   
                }
                console.log(keys);


           // var i =0;
              json2csv({ data: info, fields: keys }, function(err, csv) {
    if (err) {
        console.log(err);
    }

    res.set({
        'Content-Disposition': 'attachment; filename=groups.csv',
        'Content-Type': 'text/csv'
    });
    res.send(csv);
});

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
module.exports = router;
