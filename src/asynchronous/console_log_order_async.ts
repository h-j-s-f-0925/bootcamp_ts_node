//console.log("top");が実行されます。つまり、"top"という文字列が出力されます。
console.log("top"); // 1

//setTimeout()は、指定された時間が経過した後に、コールバック関数を実行する非同期処理を行います。ここでは、0秒後に"timeout"という文字列を出力するコールバック関数が登録されます。
//しかし、0秒という短い時間であるため、実行順序が保証されないため、"timeout"が出力されるまでには、他の処理が実行されることがあります。
//setTimeoutが0msで呼び出されているため、実行が遅れる可能性があります。このため、"timeout"の出力は、"promise"の出力よりも後になる場合があります。
setTimeout(() => {
  console.log("timeout"); // 2
}, 0);

//async関数は、非同期処理を行う関数であり、Promiseオブジェクトを返します。Promiseは、非同期処理が完了した後に値を返す
//この関数では、awaitを使用して、次に記述されるPromiseオブジェクトを完了するまで待機します。
const f = async (): Promise<void> => {
  //Promiseオブジェクトを生成して、コンソールに"promise"という文字列を出力します。そして、setTimeout()を使用して、0秒後に"timeout-in-promise"という文字列を出力し、resolve()を呼び出してPromiseオブジェクトを完了させます。
  await new Promise<void>((resolve) => {
    console.log("promise"); // 3
    setTimeout(() => {
      //この時点ではPromiseの処理がまだ完了していないため、 promise-then は表示されません。
      console.log("timeout-in-promise"); // 4
      // resolve(); によってPromiseの処理が完了し、 await が終了します。
      resolve();
    });
  });

  //Promiseオブジェクトが完了した後、次の行が実行されます。つまり、"promise-then"という文字列が出力されます。
  console.log("promise-then"); // 5
};

//f()を呼び出すと、非同期関数が実行されます。await new Promise()が実行されると、Promiseが実行され、その結果、"promise"と"timeout-in-promise"の文字列が順番に出力されます。Promiseが完了した後、"promise-then"という文字列が出力されます。
f();

console.log("bottom"); // 6

//top
//promise※
//botttom
//timeout-in-promise
// promise-then
//timeout
