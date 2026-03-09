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

// Fetch api for 3 failed attempts

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
