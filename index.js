var express = require('express');
var cors = require('cors');
var app = express();
var data = require('./data');
app.use(cors());

app.get('/',function(req,res){
  var params = req.url.split('?')[1];
  var paramsObj = {};
  if( params === undefined) {
    paramsObj = {
      start : 0,
      count : 5
    };
  }
  else{
    params.split('&').forEach((param) => {
      paramsObj[param.split('=')[0]] = param.split('=')[1];
    });
  }
  console.log('paramsObj ' + JSON.stringify(paramsObj) );
  console.log('paramsObj.count ' + paramsObj.count);
  var sendData = data.slice( parseInt(paramsObj.start) , parseInt(paramsObj.start) + parseInt(paramsObj.count) + 1 );
  console.log('sendData.length ' + sendData.length);
  res.send({
    data:sendData,
    pos:paramsObj.start,
    total_count:data.length
  });
});

app.listen(3001);
