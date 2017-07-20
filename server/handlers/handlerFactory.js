import querystring from 'querystring'

export default (processor, endPoint, requiredKeys) => {
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
