import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

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
        people: docs,
        success: true
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
