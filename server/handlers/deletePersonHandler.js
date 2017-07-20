import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

const handle = (requestData, callback) => {
  Database.getMongoClientPromise()
    .then(({db}) => {
      return Database.deleteManyPromise({
        db,
        collection: "people",
        pattern: {id: requestData.id},
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

export default handlerFactory(handle, "/deletePerson", ["id"])
