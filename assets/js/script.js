const timerSpanElement = document.getElementById("timer");
const startQuizButtonElement = document.getElementById("start-btn");
const introContainer = document.getElementById("quiz-container");
const submitScoreBtn = document.getElementById("submit-score-btn");

let timerValue = 1;
let highScores = [];

//to remove or redefine
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

  const submitScoreBtn = document.createElement("button");
  submitScoreBtn.setAttribute("type", "submit");
  submitScoreBtn.setAttribute("id", "submit-score-btn");
  submitScoreBtn.setAttribute("class", "submit-score-btn");

  headingContainerDiv.textContent = "All done!";
  resultsContainerDiv.textContent = "Your final score is: ";
  submitScoreBtn.textContent = "Submit";
  // need to define final score
  finalScoreSpan.textContent = finalScore;

  submitScoreBtn.addEventListener("click", submitScore);

  quizContainerDiv.appendChild(headingContainerDiv);
  quizContainerDiv.appendChild(resultsContainerDiv);
  resultsContainerDiv.appendChild(finalScoreSpan);
  quizContainerDiv.appendChild(gameOverForm);
  gameOverForm.appendChild(initialsInput);
  gameOverForm.appendChild(submitScoreBtn);

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

// Log high scores to local storage
const storeUserScores = () => {
  // get info from initials input
  let initials = document.getElementById("initials-input").value;

  if (initials !== "") {
    const score = {
      Initials: initials,
      Score: finalScore,
    };
    highScores.push(score);
    console.log(highScores);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
  } else {
    alert("Please enter your initials to save your score.");
  }
};

//Retrieve high scores from local storage and load them into an array called highScoreArray
loadHighScores = () => {
  let highScoresArray = localStorage.getItem("highScores");
  if (highScoresArray) {
    highScores = JSON.parse(highScoresArray);
  } else {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
};

// Submit high scores
const submitScore = (event) => {
  event.preventDefault();
  console.log("This works yay");
  storeUserScores();
  // displayHighScores();
};

const displayHighScores = () => {
  // navigate to highscores page
  location.href = "../../high-scores.html";
};

// Start quiz function
const startQuiz = () => {
  // construct quiz container
  const quizContainerDiv = constructQuizContainer();

  document.body.removeChild(introContainer);
  document.body.appendChild(quizContainerDiv);
  // start timer
  loadHighScores();
  startTimer();
};

startQuizButtonElement.addEventListener("click", startQuiz);
