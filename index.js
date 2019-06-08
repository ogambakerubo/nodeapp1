/*
 * Primary file for API
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

 // Configure the server to respond to all requests with a string
const server = http.createServer((req,res) => {
  
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  
  //Get the query string as an object
  const queryStringObject = parsedUrl.query

  //Get the http method
  const method = req.method.toLowerCase();
  
  //Get the headers as an object
  const headers = req.headers;
  
  //Get payloads, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();
    
    // Send the response
    res.end("Hello World!\n");

    // Log the request/response
    console.log("Request received on path: \n" + trimmedPath + " with method: \n" + method + " and these query string parameters:\n", queryStringObject, "and these headers:\n", headers, "with this payload:\n", buffer);
  });
});

// Start the server and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is up and running now");
});

