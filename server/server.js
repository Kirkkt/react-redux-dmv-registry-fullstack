import express from "express"

import helloHandler from "./handlers/helloHandler"

const app = express()

app.get('/', function(req, res){
  res.send('Hello World');
});

app.post('/hello', helloHandler)

/* istanbul ignore next */
if (!module.parent) {
  app.listen(2379)
  console.log("Express started on port 2379")
}
