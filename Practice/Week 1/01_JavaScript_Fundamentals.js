// Reverse a string

// let word = "Hello World";
// let reveredword = "";
// for (let i = word.length - 1; i >= 0; i--) {
//   reveredword += word[i];
// }
// console.log(reveredword);

// //Better Choice
// word = word.split("").reverse().join("");
// console.log(word);

//Modern JS One-liner
// const reversed = [..."Hello World"].reverse().join("");

//Count vowels in string

// let word = "Hello World";
// let vowelCount = 0;
// for (let i = 0; i < word.length; i++) {
//   if (
//     word[i] == "a" ||
//     word[i] == "A" ||
//     word[i] == "e" ||
//     word[i] == "E" ||
//     word[i] == "i" ||
//     word[i] == "I" ||
//     word[i] == "o" ||
//     word[i] == "O" ||
//     word[i] == "u" ||
//     word[i] == "U"
//   ) {
//     vowelCount++;
//   }
// }
// console.log(vowelCount);

//Better choice

// let word = "Hello World";
// let vowelCount = 0;
// const vowels = "aeiou";

// for (let char of word.toLowerCase()) {
//   if (vowels.includes(char)) {
//     vowelCount++;
//   }
// }
// console.log(vowelCount);

//Shortest Modern JS Version
// const word = "Hello World";
// const vowelCount = [...word.toLowerCase()].filter((c) =>
//   "aeiou".includes(c),
// ).length;

// console.log(vowelCount);

// Sum of positive numbers in array

// let x = [2, 3, 4, 5, 6, 87, 99, 100];
// let sum = 0;
// for (i = 0; i < x.length; i++) {
//   x[i] % 2 == 0 && (sum += x[i]);
// }
// console.log(sum);

// Better choice

// let x = [2, 3, 4, 5, 6, 87, 99, 100];
// let sum = 0;
// for (num of x) {
//   console.log(num);
//   if (num % 2 == 0) {
//     sum += num;
//   }
// }
// console.log(sum);

// Best choice

// let x = [2, 3, 4, 5, 6, 87, 99, 100];

// console.log(x.filter((num) => num > 0).reduce((a, b) => a + b, 0));

// Another Best Choice

// let x = [2, 3, 4, 5, 6, 87, 99, 100];
// const sum = x.reduce((acc, num) => (num % 2 === 0 ? acc + num : acc), 0);
// console.log(sum);

// Find the longest word in sentence

// let x = ["a", "abcd", "LONG Stringssssssss"];
// longWord = x[0];
// for (word of x) {
//   if (word.length > longWord.length) {
//     longWord = word;
//   }
// }
// console.log(longWord);

// Better Choice
// let x = ["a", "abcd", "LONG Stringssssssss"];
// console.log(x.reduce((a, b) => (a.length > b.length ? a : b)));

// Flatten nested array (1 level)

// let x = [1, 2, [3, 4, [5, 6]]];
// let flatten = x.reduce((a, b) => a.concat(b), []);
// console.log(flatten);

// Better way
// flatten = x.flat();
// console.log(flatten);

// Full Flatten

// let x = [1, 2, [3, 4, [5, 6]]];
// flatten = x.flat(infinity);
// console.log(flatten);

// let x = [1, 2, [3, 4, [5, 6]]];

// function flattenDeep(arr) {
//   return arr.reduce((acc, val) =>
//     acc.concat(Array.isArray(val) ? flattenDeep(val) : val)
//   , []);
// }

// console.log(flattenDeep(x));

// Filter odd/even numbers

// let x = [1,2,3,4,5,6,7,8,99,100]
// let odd = x.filter(num => num%2 === 0 )
// let even = x.filter(num => num%2 !== 0 )
// console.log(odd, even);

// Better Choice

// let x = [1,2,3,4,5,6,7,8,99,100]
// let odd = []
// let even = []
// x.forEach(num => num%2 == 0 ? even.push(num) : odd.push(num))
// console.log(odd, even);

// By using reduce

// let x = [1, 2, 3, 4, 5, 6, 7, 8, 99, 100];

// let { odd, even } = x.reduce(
//   (acc, num) => {
//     (num % 2 === 0 ? acc.even : acc.odd).push(num);
//     return acc;
//   },
//   { odd: [], even: [] },
// );

// console.log(odd, even);

// Find common elements in two arrays

// let x = ["Usama", "Huzaifa", "Shahzaib", "Nawaz"];
// let y = ["Usama", "Shahzaib", "Noman", "Mubashir"];
// let matched = x.filter((e) => y.includes(e));
// console.log(matched);

// Better Choice for large array

// let x = ["Usama", "Huzaifa", "Shahzaib", "Nawaz"];
// let y = ["Usama", "Shahzaib", "Noman", "Mubashir"];

// let ySet = new Set(y);

// let matched = x.filter((e) => ySet.has(e));

// console.log(matched);

// - Find Prime numbers in  array

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 99, 17, 33, 37];
// let prime = arr.filter((num) => {
//   if (num == 0 || num == 1) return false;
//   if (num == 2) return true;
//   if (num % 2 == 0) return false;
//   let limit = Math.floor(Math.sqrt(num));
//   for (i = 3; i <= limit; i += 2) {
//     if (num % i == 0) {
//       return false;
//     }
//   }
//   return true;
// });
// console.log(prime);

// Another choice

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 99, 17, 33, 37];
// let prime = [];
// arr.forEach((num) => {
//   if (num == 0 || num == 1) return;
//   if (num === 2) return prime.push(num);
//   if (num % 2 == 0) return;

//   let limit = Math.floor(Math.sqrt(num));
//   let isPrime = true;
//   for (i = 3; i <= limit; i += 2) {
//     if (num % i === 0) {
//       isPrime = false;
//       break;
//     }
//   }
//   if (isPrime) return prime.push(num);
// });
// console.log(prime);

// As a function

// const isPrime = (num) => {
//   if (num == 0 || num == 1) return false;
//   if (num === 2) return true;
//   if (num % 2 == 0) return false;

//   let limit = Math.floor(Math.sqrt(num));
//   for (i = 3; i <= limit; i += 2) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   if (isPrime) return true;
// };

// console.log(isPrime(55));
