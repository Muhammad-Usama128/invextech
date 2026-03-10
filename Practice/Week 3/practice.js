// Custom Map
const customMap = (arr, callback) => {
  let result = [];
  for (i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
};
console.log(customMap([1, 2, 3, 4, 5], (num) => num * 2));

// Custom Filter
const customFilter = (arr, callback) => {
  let result = [];
  for (i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
};
console.log(customFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0));

// Custom ForEach
const customForEach = (arr, callback) => {
  for (i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
};
customForEach([1, 2, 3, 4, 5], (num, i, arr) => console.log(num, i, arr));

// Fetch api for 3 retry attempts

async function retryApiFunction(retries = 3) {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error("Request Failed");
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.log("Retry attempt:", retries);
      return retryApiFunction(retries - 1);
    }
    throw new Error("Something went wrong");
  }
}

retryApiFunction()
  .then((data) => console.log(data))
  .catch((err) => console.log("Error Occurred", err));

// Group array of objects by a key (e.g., department)

const employees = [
  { name: "Ali", department: "IT" },
  { name: "Sara", department: "HR" },
  { name: "Ahmed", department: "IT" },
  { name: "Zara", department: "Finance" },
  { name: "Osman", department: "HR" },
];

const grouped = employees.reduce((acc, item) => {
  let groupKey = item["department"];
  if (!acc[groupKey]) {
    acc[groupKey] = [];
  }
  acc[groupKey].push(item);
  return acc;
}, {});

console.log(grouped);

// Deep clone an object (manual)

const deepCopy = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    let copy = [];
    for (i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  let copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
};

let object = {
  name: "Usama",
  age: 20,
  address: ["okara", "Government Colony"],
};
let copied = deepCopy(object);
copied.age = 25;
console.log(object, copied);

// Implement Promise.all() logic manually

const PromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    if (promises.length === 0) return Promise.resolve([]);
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((val) => {
          result[index] = val;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject("Error Occurred", err);
        });
    });
  });
};
const p1 = Promise.resolve(10);
const p2 = new Promise((res) => setTimeout(() => res(20), 1000));
const p3 = Promise.resolve(30);

let resolved = PromiseAll([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
