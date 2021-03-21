const timerSpanElement = document.getElementById("timer");
const startQuizButtonElement = document.getElementById("start-btn");
const introContainer = document.getElementById("quiz-container");

let timerValue = 1;
// to remove
const finalScore = 20;

// Construct quiz questions container
const constructQuizContainer = () => {
  const quizContainerDiv = document.createElement("main");
  quizContainerDiv.setAttribute("class", "quiz-container");
  quizContainerDiv.setAttribute("id", "quiz-container");

  const questionsContainerDiv = document.createElement("div");
  questionsContainerDiv.setAttribute("class", "questions-div");
  questionsContainerDiv.setAttribute("id", "questions-div");

  const answersDiv = document.createElement("div");
  answersDiv.setAttribute("class", "answers-div");
  answersDiv.setAttribute("id", "answers-div");

  quizContainerDiv.appendChild(questionsContainerDiv);
  quizContainerDiv.appendChild(answersDiv);

  return quizContainerDiv;
};

// Construct Game OVer container
const constructGameOverContainer = () => {
  const quizContainerDiv = document.createElement("main");
  quizContainerDiv.setAttribute("class", "quiz-container");
  quizContainerDiv.setAttribute("id", "quiz-container");

  const headingContainerDiv = document.createElement("div");
  headingContainerDiv.setAttribute("class", "results-heading-div");

  const resultsContainerDiv = document.createElement("div");
  resultsContainerDiv.setAttribute("class", "results-info");

  const finalScoreSpan = document.createElement("span");
  finalScoreSpan.setAttribute("id", "final-score");

  const gameOverForm = document.createElement("form");
  gameOverForm.setAttribute("id", "game-over-form");
  gameOverForm.setAttribute("class", "game-over-form");

  const initialsInput = document.createElement("input");
  initialsInput.setAttribute("placeholder", "Enter Initials");
  initialsInput.setAttribute("id", "initials-input");
  initialsInput.setAttribute("class", "initials-input");

  const initialsSubmitBtn = document.createElement("button");
  initialsSubmitBtn.setAttribute("type", "submit");
  initialsSubmitBtn.setAttribute("id", "initials-submit-btn");
  initialsSubmitBtn.setAttribute("class", "initials-submit-btn");

  headingContainerDiv.textContent = "All done!";
  resultsContainerDiv.textContent = "Your final score is: ";
  initialsSubmitBtn.textContent = "Submit";
  // need to define final score
  finalScoreSpan.textContent = finalScore;

  quizContainerDiv.appendChild(headingContainerDiv);
  quizContainerDiv.appendChild(resultsContainerDiv);
  resultsContainerDiv.appendChild(finalScoreSpan);
  quizContainerDiv.appendChild(gameOverForm);
  gameOverForm.appendChild(initialsInput);
  gameOverForm.appendChild(initialsSubmitBtn);

  return quizContainerDiv;
};

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
      const gameOverContainer = constructGameOverContainer();

      // Remove quiz questions container
      const quizContainerDiv = document.getElementById("quiz-container");
      document.body.removeChild(quizContainerDiv);

      // append end of quiz container
      document.body.appendChild(gameOverContainer);
    }
  };
  const timerInterval = setInterval(timerTick, 1000);
};

// Main quiz function
const startQuiz = () => {
  // construct quiz container
  const quizContainerDiv = constructQuizContainer();

  document.body.removeChild(introContainer);
  document.body.appendChild(quizContainerDiv);
  // start timer
  startTimer();
};

startQuizButtonElement.addEventListener("click", startQuiz);
