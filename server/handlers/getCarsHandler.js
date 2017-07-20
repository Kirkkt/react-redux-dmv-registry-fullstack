import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

const toCarsObject = docs => {
  const result = {}
  docs.forEach(doc => result[doc.vin] = {
    mileage: doc.mileage,
    make: doc.make,
    model: doc.model,
  })
  return result
}

const handle = (requestData, callback) => {
  let dbToClose
  Database.getMongoClientPromise()
    .then(({db}) => {
      dbToClose = db;
      return db.collection("cars").find({}).toArray();
    })
    .then(docs => {
      dbToClose.close();
      callback({
        cars: toCarsObject(docs),
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

export default handlerFactory(handle, "/getCars", [])
