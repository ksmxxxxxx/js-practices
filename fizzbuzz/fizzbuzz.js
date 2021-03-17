// 一番始めて書いてたもの
for (let i = 1; i < 101; i++) {
  console.log(i % 15 ? (i % 5 ? (i % 3 ? i : "Fizz") : "Buzz") : "FizzBuzz");
}

// イマドキっぽく(?)書いたもの
const num = [...Array(100).keys()].map((n) => ++n);
num.forEach((i) =>
  console.log(i % 15 ? (i % 5 ? (i % 3 ? i : "fizz") : "buzz") : "fizzbuzz")
);
// ()を減らした
num.forEach((i) =>
  console.log(i % 15 ? (i % 5 ? (i % 3 ? i : "fizz") : "buzz") : "fizzbuzz")
);
// よくわかってないreduceで遊んでみる
const fz = num.reduce((obj, i) => {
  const key = i % 15 ? (i % 5 ? (i % 3 ? i : "fizz") : "buzz") : "fizzbuzz";
  if (!key) return obj;
  obj[key] || (obj[key] = []);
  return { ...obj, [key]: [...obj[key], i] };
}, {});
console.log(fz["fizz"]);
console.log(fz["buzz"]);
console.log(fz["fizzbuzz"]);

// % node fizzbuzz.js
// for文///////////////////////////////////////////
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19
// Buzz
// Fizz
// 22
// 23
// Fizz
// Buzz
// 26
// Fizz
// 28
// 29
// FizzBuzz
// 31
// 32
// Fizz
// 34
// Buzz
// Fizz
// 37
// 38
// Fizz
// Buzz
// 41
// Fizz
// 43
// 44
// FizzBuzz
// 46
// 47
// Fizz
// 49
// Buzz
// Fizz
// 52
// 53
// Fizz
// Buzz
// 56
// Fizz
// 58
// 59
// FizzBuzz
// 61
// 62
// Fizz
// 64
// Buzz
// Fizz
// 67
// 68
// Fizz
// Buzz
// 71
// Fizz
// 73
// 74
// FizzBuzz
// 76
// 77
// Fizz
// 79
// Buzz
// Fizz
// 82
// 83
// Fizz
// Buzz
// 86
// Fizz
// 88
// 89
// FizzBuzz
// 91
// 92
// Fizz
// 94
// Buzz
// Fizz
// 97
// 98
// Fizz
// Buzz
// forEach文///////////////////////////////////////////
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// 16
// 17
// fizz
// 19
// buzz
// fizz
// 22
// 23
// fizz
// buzz
// 26
// fizz
// 28
// 29
// fizzbuzz
// 31
// 32
// fizz
// 34
// buzz
// fizz
// 37
// 38
// fizz
// buzz
// 41
// fizz
// 43
// 44
// fizzbuzz
// 46
// 47
// fizz
// 49
// buzz
// fizz
// 52
// 53
// fizz
// buzz
// 56
// fizz
// 58
// 59
// fizzbuzz
// 61
// 62
// fizz
// 64
// buzz
// fizz
// 67
// 68
// fizz
// buzz
// 71
// fizz
// 73
// 74
// fizzbuzz
// 76
// 77
// fizz
// 79
// buzz
// fizz
// 82
// 83
// fizz
// buzz
// 86
// fizz
// 88
// 89
// fizzbuzz
// 91
// 92
// fizz
// 94
// buzz
// fizz
// 97
// 98
// fizz
// buzz
//
// reduce文///////////////////////////////////////////
// [
//    3,  6,  9, 12, 18, 21, 24, 27,
//   33, 36, 39, 42, 48, 51, 54, 57,
//   63, 66, 69, 72, 78, 81, 84, 87,
//   93, 96, 99
// ]
// [
//    5,  10, 20, 25, 35, 40,
//   50,  55, 65, 70, 80, 85,
//   95, 100
// ]
// [ 15, 30, 45, 60, 75, 90 ]
// https://gyazo.com/bce36709883ffbf5a7f9f591a0a315f0
