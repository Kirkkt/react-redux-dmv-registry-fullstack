import handlerFactory from "./handlerFactory"

const handleHello = (requestData, callback) => {
  console.log(requestData)
  callback({hello: "world"})
}

export default handlerFactory(handleHello, "/hello", ["a"])
