import express from "express"

import getPeopleHandler from "./handlers/getPeopleHandler"
import addPersonHandler from "./handlers/addPersonHandler"
import updatePersonHandler from "./handlers/updatePersonHandler"
import deletePersonHandler from "./handlers/deletePersonHandler"

import getCarsHandler from "./handlers/getCarsHandler"
import addCarHandler from "./handlers/addCarHandler"
import updateCarHandler from "./handlers/updateCarHandler"
import deleteCarHandler from "./handlers/deleteCarHandler"

import getRegistryHandler from "./handlers/getRegistryHandler"
import addRegistryHandler from "./handlers/addRegistryHandler"
import deleteRegistryHandler from "./handlers/deleteRegistryHandler"
import deletePersonFromRegistryHandler from "./handlers/deletePersonFromRegistryHandler"
import deleteCarFromRegistryHandler from "./handlers/deleteCarFromRegistryHandler"

const app = express()

app.get('/', function(req, res){
  res.send('Hello World');
});

app.post('/getPeople', getPeopleHandler)
app.post('/addPerson', addPersonHandler)
app.post('/updatePerson', updatePersonHandler)
app.post('/deletePerson', deletePersonHandler)

app.post('/getCars', getCarsHandler)
app.post('/addCar', addCarHandler)
app.post('/updateCar', updateCarHandler)
app.post('/deleteCar', deleteCarHandler)

app.post('/getRegistry', getRegistryHandler)
app.post('/addRegistry', addRegistryHandler)
app.post('/deleteRegistry', deleteRegistryHandler)
app.post('/deletePersonFromRegistry', deletePersonFromRegistryHandler)
app.post('/deleteCarFromRegistry', deleteCarFromRegistryHandler)

/* istanbul ignore next */
if (!module.parent) {
  app.listen(2379)
  console.log("Express started on port 2379")
}
