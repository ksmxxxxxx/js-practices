let moji = prompt("年齢は？");
let age = parseInt(moji);
if (age < 6) {
  console.log("幼児");
}

// +aの回答例
// 整数化しなくても良いのでは？
if (moji < 6) {
  console.log("幼児");
}
// アプリだったらfalseの挙動もないとだめなんじゃなかろうか？
moji < 6 ? console.log("幼児") : console.log("児童");
