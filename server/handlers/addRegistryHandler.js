import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

const handle = (requestData, callback) => {
  Database.getMongoClientPromise()
    .then(({db}) => {
      return Database.insertDocPromise({
        db,
        collection: "registry",
        doc: requestData,
      })
    })
    .then(({db}) => {
      db.close();
      callback({
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

export default handlerFactory(handle, "/addRegistry", ["vin", "id"])
