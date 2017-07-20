var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(2379);
  console.log('Express started on port 2379');
}
