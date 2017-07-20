import handlerFactory from "./handlerFactory"
import Database from "../common/Database"

const toRegistryJson = docs => {
  const result = {}
  for (const i in docs) {
    const doc = docs[i]
    if (result[doc.id]) {
      result[doc.id].push(doc.vin)
    } else {
      result[doc.id] = [doc.vin]
    }
  }
  return result
}

const handle = (requestData, callback) => {
  let dbToClose
  Database.getMongoClientPromise()
    .then(({db}) => {
      dbToClose = db;
      return db.collection("registry").find({}).toArray();
    })
    .then(docs => {
      dbToClose.close();
      callback({
        registry: toRegistryJson(docs),
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

export default handlerFactory(handle, "/getRegistry", [])
