const countdownEl = document.getElementById("countdown");
const timerToggle = document.getElementById("timerToggle");
const timerRestart = document.getElementById("timerRestart");
let START_SECONDS = 60 * 60;
let timeLeft = START_SECONDS;
let timerId = null;
let timerRunning = true;

function updateTimerDisplay() {
  const m = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const s = (timeLeft % 60).toString().padStart(2, "0");
  countdownEl.textContent = `${m}:${s}`;
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      timerRunning = false;
      timerToggle.textContent = "Start";
    }
  }, 1000);
  timerRunning = true;
  timerToggle.textContent = "Pause";
}

function pauseTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  timerRunning = false;
  timerToggle.textContent = "Start";
}

function restartTimer() {
  timeLeft = START_SECONDS;
  updateTimerDisplay();
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  startTimer();
}

timerToggle.addEventListener("click", () => {
  if (timerRunning) pauseTimer();
  else startTimer();
});
timerRestart.addEventListener("click", restartTimer);

updateTimerDisplay();
startTimer();
