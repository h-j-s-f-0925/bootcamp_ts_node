import http from "node:http";

//サーバーを生成
const server = http.createServer();

// サーバーにリクエストがあった時に実行される処理を定義する
server.on("request", async (req, res) => {
  console.log("request url: ", req.url);
  // Content-Type is important for browsers.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

  // Content-Type はブラウザーに対して重要な情報であるため、設定する
  res.writeHead(200, { "content-type": "text/plain" });
  // レスポンスとして "hello!\n" を返す
  res.write("hello!\n");
  // レスポンスを終了する
  res.end();
});

// サーバーが起動した際に実行される処理を定義する
server.on("listening", () => {
  console.log("start listening!");
});


// サーバーを localhost:12345 で起動する
// Start listening 12345 port of localhost (127.0.0.1).
server.listen(12345, () => {
  console.log("listening on http://localhost:12345/");
});
console.log("run server.js");
