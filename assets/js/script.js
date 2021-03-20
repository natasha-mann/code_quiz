const timerSpanElement = document.getElementById("timer");
const startQuizButtonElement = document.getElementById("start-btn");

let timerValue = 5;

// Timer function
const startTimer = () => {
  // define callback function for setInterval
  const timerTick = () => {
    // define timer value
    timerSpanElement.textContent = timerValue;
    // what happens every second
    timerValue -= 1;

    // what happens when no time is left?
    if (timerValue < 0) {
      clearInterval(timer);
      // construct end of quiz container

      // Remove quiz questions container

      // append end of quiz container

      alert("End of Quiz");
    }
  };
  const timer = setInterval(timerTick, 1000);
};

// Main quiz function
const startQuiz = () => {
  // remove intro container
  // construct quiz container
  // append first question element
  // declare time start value
  // start timer
  startTimer();
};

startQuizButtonElement.addEventListener("click", startQuiz);
