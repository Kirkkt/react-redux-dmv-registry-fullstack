import express from "express"

import helloHandler from "./handlers/helloHandler"
import getPeopleHandler from "./handlers/getPeopleHandler"
import addPersonHandler from "./handlers/addPersonHandler"
import updatePersonHandler from "./handlers/updatePersonHandler"
import deletePersonHandler from "./handlers/deletePersonHandler"

const app = express()

app.get('/', function(req, res){
  res.send('Hello World');
});

app.post('/hello', helloHandler)
app.post('/getPeople', getPeopleHandler)
app.post('/addPerson', addPersonHandler)
app.post('/updatePerson', updatePersonHandler)
app.post('/deletePerson', deletePersonHandler)

/* istanbul ignore next */
if (!module.parent) {
  app.listen(2379)
  console.log("Express started on port 2379")
}
