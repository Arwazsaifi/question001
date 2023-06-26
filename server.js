const http=require("http");
const hostname="127.0.0.1";
const port=8000;
const server = http.createServer( function(req, res) {
    res.end("Hello arwaz..");
  });
server.listen(port)
{
  console.log(`server running at http://${hostname}:${port}/`);
}
