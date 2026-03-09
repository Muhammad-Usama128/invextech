let second = 0;
let minute = 0;
let hour = 0;
let timerInterval = null;
const showTimer = () => {
  const timer = document.getElementById("timer");
  timer.innerText = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};
document.getElementById("start").addEventListener("click", () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    second++;
    if (second === 60) {
      second = 0;
      minute++;
    } else if (minute === 60) {
      minute = 0;
      hour++;
    }
    showTimer();
  }, 1000);
});
document.getElementById("stop").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  second = 0;
  minute = 0;
  hour = 0;
  showTimer();
});
showTimer();
