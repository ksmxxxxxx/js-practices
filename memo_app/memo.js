import minimist from 'minimist'
import readline from 'readline'
import fs from 'fs'
//process.argv.slice(2);
//console.log(process.argv[2]);
//console.log(process.argv[3]);
const argv = minimist(process.argv.slice(2))

const file = 'memo.json'
const charset = 'utf8'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', line => {
  const obj = { body: `${line}` }
  const hoge = JSON.stringify(obj, null, '\t')
  //console.log(hoge + `,` + `\n`);

  fs.open(file, 'a', err => {
    if (err) throw err

    fs.appendFile(file, hoge + `,` + `\n`, charset, err => {
      if (err) throw err
    })
  })
})

// fs.open(file, "a", (err) => {
//   if (err) throw err;
//   fs.appendFile(file, hoge, charset, (err) => {
//     if (err) throw err;
//   });
// });
// function MemoObj() {
//   return {
//     body: "",
//   };
// }
//
// const memoItem = new MemoObj();
// rl.on("line", (text) => {
//   memoItem.body += text.split(/\n|\r\n/g);
// });
// fs.open(file, "a", (err) => {
//   if (err) throw err;
//   rl.on("line", (line) => {
//     fs.appendFile(file, line, charset, (err) =>{if (err) throw err;});
//   });
// });
