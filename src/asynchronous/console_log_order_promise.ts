//"top" を表示
console.log("top"); // 1

//0ミリ秒後に "timeout" を表示
//このsetTimeoutは実行されるまでに少し時間がかかるため、その間に次の行の処理が先に進みます。
setTimeout(() => {
  console.log("timeout"); // 2
}, 0);

//"promise" を表示
//Promiseオブジェクトを生成し、その中でコンソールに"promise"を表示しています。setTimeoutのコールバック関数は、Promiseオブジェクトが完了するまで待機するため、resolve関数を呼び出すまで次の行の処理が進みません。
new Promise<void>((resolve) => {
  console.log("promise"); // 3

  setTimeout(() => {
    //Promiseオブジェクトが解決された後に "timeout-in-promise" を表示
    console.log("timeout-in-promise"); // 4
    resolve();
  });
  //そして、setTimeoutのコールバック関数が実行され、"timeout-in-promise"がコンソールに表示されます。同時に、resolve()が呼ばれ、Promiseオブジェクトが完了したことを示します。
}).then(() => {
  //Promiseオブジェクトが解決された後に "promise-then" を表示
  console.log("promise-then"); // 5
});

// "bottom" を表示
console.log("bottom"); // 6

//Promiseオブジェクトは非同期的に処理されるため、"promise"の表示や.then()の呼び出しは後回しになり、"timeout"はPromiseオブジェクトの完了を待たずに先に実行されたことがわかります。

// top
// timeout
// promise
// timeout-in-promise
// promise-then
// bottom

// ではない

//setTimeoutやPromiseは非同期処理のため、その処理が完了するまで次の処理を待たずに実行されます。

// top
// promise
// bottom
// timeout-in-promise
// promise-then
// timeout

//top
//promise
//bottom
//timeout
//timeout-in-promise
//promise-then
