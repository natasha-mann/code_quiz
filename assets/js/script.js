const timerSpanElement = document.getElementById("timer");
const startQuizButtonElement = document.getElementById("start-btn");
const introContainer = document.getElementById("intro-container");

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
      clearInterval(timerInterval);
      // construct end of quiz container

      // Remove quiz questions container

      // append end of quiz container

      alert("End of Quiz");
    }
  };
  const timerInterval = setInterval(timerTick, 1000);
};

// Construct quiz questions container

const constructQuizContainer = () => {
  const quizContainerDivElement = document.createElement("main");
  quizContainerDivElement.setAttribute("class", "quiz-container");
  quizContainerDivElement.setAttribute("id", "quiz-container");

  const questionsContainerDiv = document.createElement("div");
  questionsContainerDiv.setAttribute("class", "questions-div");
  questionsContainerDiv.setAttribute("id", "questions-div");

  const quizQuestions = document.createElement("h2");
  quizQuestions.setAttribute("class", "quiz-questions");
  quizQuestions.setAttribute("id", "quiz-questions");

  const answersDiv = document.createElement("div");
  answersDiv.setAttribute("class", "answers-div");
  answersDiv.setAttribute("id", "answers-div");

  const answerButtonsDiv = document.createElement("div");
  answerButtonsDiv.setAttribute("class", "answer-buttons-div");
  answerButtonsDiv.setAttribute("id", "answer-buttons-div");

  return quizContainerDivElement;
};

// Main quiz function
const startQuiz = () => {
  // construct quiz container
  const quizContainerDivElement = constructQuizContainer();

  document.body.removeChild(introContainer);
  document.body.appendChild(quizContainerDivElement);
  // start timer
  startTimer();
};

startQuizButtonElement.addEventListener("click", startQuiz);
