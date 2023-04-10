import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

// const port = process.env.PORT || 12345;
const port = process.env.PORT || 54321;

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url as string, `http://${req.headers.host}`);
  // const reqPath = reqUrl.pathname;
  const reqPath = reqUrl.pathname === "/" ? "/hello.html" : reqUrl.pathname;

  var filePath = path.join(__dirname.replace(/\/out$/, ""), "public", reqPath);
  // console.log("filePath ", req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found\n");
      // console.log("filePath: " + filePath);
      res.end();
    } else {
      let contentType = "text/plain";
      const extname = path.extname(filePath);
      // console.log("exname: " + extname);
      switch (extname) {
        case ".html":
          contentType = "text/html";
          break;
        case ".jpg":
          contentType = "image/jpeg";
          // res.setHeader("Content-Type", "image/jpeg");
          // console.log(contentType);
          break;
        case ".json":
          contentType = "text/json";
          break;
        case ".ico":
          contentType = "image/x-icon";
          break;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    }
  });
});

server.on("listening", () => {
  console.log("start listening!");
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
