const students = [
  { name: "Ali", scores: [80, 90, 70], active: true },
  { name: "Sara", scores: [85, 95, 100], active: false },
  { name: "Omar", scores: [60, 75, 80], active: true },
  { name: "Lina", scores: [90, 85, 95], active: true },
];

// Filter only active students
let activeStudent = students.filter((student) => student.active === true);
// Calculate average score for each active student (use reduce)
activeStudent = activeStudent.map((student) => {
  let average =
    student.scores.reduce((acc, b) => acc + b, 0) / student.scores.length;
  return { ...student, average };
});
// Sort students by average score descending
activeStudent.sort((a, b) => b.average - a.average);
// Create an array of strings in the format:
// "Name: <name>, Avg Score: <average>" using template literals
let arr = activeStudent.map(
  (student) => `Name: ${student.name}, Avg Score: ${student.average}`,
);
// Print the final array
console.log(arr);
