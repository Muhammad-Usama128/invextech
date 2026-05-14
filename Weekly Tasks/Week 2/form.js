let time = document.querySelector(".time");
let timer;
let milliseconds = 0;
let second = 0;
let minute = 0;
let hour = 0;
let start = () => {
  if (!timer) {
    timer = setInterval(() => {
      if (milliseconds === 100) {
        second++;
        milliseconds = 0;
      } else {
        milliseconds++;
      }
      if (second === 60) {
        minute++;
        second = 0;
      }
      if (minute === 60) {
        hour++;
        minute = 0;
      }
      time.innerText = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
    }, 10);
  }
};
let stop = () => {
  clearInterval(timer);
  timer = null;
};
let reset = () => {
  stop();
  milliseconds = 0;
  second = 0;
  minute = 0;
  hour = 0;
  time.innerText = `00:00:00:00`;
};

// let debounce = (fn, delay) => {
//   let timer;
//   return function (...arg) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, arg);
//     }, delay);
//   };
// };
// document.querySelector("#input").addEventListener(
//   "input",
//   debounce((e) => {
//     document.querySelector("#inputText").innerText = e.target.value;
//   }, 500),
// );
