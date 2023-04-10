import http from "http";
import fs from "fs/promises";
import path from "path";
import { URL } from "url";

// const port = process.env.PORT || 12345;
const port = process.env.PORT || 54321;

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url as string, `http://${req.headers.host}`);
  // const reqPath = reqUrl.pathname;
  const reqPath = reqUrl.pathname === "/" ? "/hello.html" : reqUrl.pathname;

  const filePath = path.join(
    __dirname.replace(/\/out$/, ""),
    "public",
    reqPath
  );
  // console.log("filePath ", req.url);
  try {
    const file = await fs.readFile(filePath);
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
    res.write(file);
    res.end();
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    // console.log("filePath: " + filePath);
    res.end();
  }
});

server.on("listening", () => {
  console.log("start listening!");
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});

console.log("run server.js");
