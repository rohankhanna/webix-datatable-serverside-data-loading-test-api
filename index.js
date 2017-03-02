var express = require('express');
var cors = require('cors');
var app = express();
var data = require('./data');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
app.use(cors());
var mongoUrl = 'mongodb://localhost:27017/test';


app.get('/',function(req,res) {
  var paramsObj = req.query;
  if( Object.keys(paramsObj).length === 0 ) {
    paramsObj = {
      start : 0,
      count : 5
    };
  }
  mongoConnect({},function(data2){
    // debugger;
    data = data2;
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
  
});

function mongoConnect(queryJSON, callback) {
  // debugger;
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    findData(db, queryJSON, function( data3 ) {
        db.close();
        callback(data3);
    });
    
  });
}

function findData(db, queryJSON, callback) {
   var cursor = db.collection('documents').find(queryJSON);//queryJSON
   var set = [];
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        //  console.dir(doc);
        delete doc._id;
        set.push(doc);
      } else {
        // debugger;
        callback(set);
      }
   });
}

app.listen(3001);