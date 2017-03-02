var express = require('express');
var cors = require('cors');
var app = express();

app.get('/',function(req,res) {
    res.send({});
});
app.listen(3002);