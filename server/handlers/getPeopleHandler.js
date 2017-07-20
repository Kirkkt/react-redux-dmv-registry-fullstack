import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

const toPeopleObject = docs => {
  const result = {}
  docs.forEach(doc => result[doc.id] = {
    firstName: doc.firstName,
    lastName: doc.lastName,
  })
  return result
}

const handle = (requestData, callback) => {
  let dbToClose
  Database.getMongoClientPromise()
    .then(({db}) => {
      dbToClose = db;
      return db.collection("people").find({}).toArray();
    })
    .then(docs => {
      dbToClose.close();
      callback({
        people: toPeopleObject(docs),
        success: true,
      })
    })
    .catch(err => callback({
      error: {
        message: '' + err.message,
      },
      success: false,
    }))
}

export default handlerFactory(handle, "/getPeople", [])
