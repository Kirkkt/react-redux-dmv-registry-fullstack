import express from "express"
import querystring from 'querystring'

const app = express()

app.get('/', function(req, res){
  res.send('Hello World');
});
  const getHandler = (processor, endPoint, requiredKeys) => {
    const handler = (request, response, next) => {
      const callback = result => response.send((result.error && result.error.statusCode) || 200, result);
      response.setHeader('access-control-allow-origin', '*');
      if (request.path !== endPoint) {
        next();
      } else {
        request.setEncoding('utf-8');
        let postData = '';
        request.addListener('data', postDataChunk => postData += postDataChunk);
        request.addListener('end', () => {
          const params = querystring.parse(postData);
          for (const i in requiredKeys) {
            if (!(requiredKeys[i] in params)) {
              callback({
                error: {
                  message: missingKeys.toString() + " shall not be blank",
                },
                success: false,
              })
            }
          }
          processor(params, callback)
        });
      }
    };
    return handler;
  }

app.post('/hello', getHandler((requestData, callback) => {
  console.log(requestData)
  callback({hello: "world"})
}, "/hello", "a"))

/* istanbul ignore next */
if (!module.parent) {
  app.listen(2379)
  console.log("Express started on port 2379")
}
