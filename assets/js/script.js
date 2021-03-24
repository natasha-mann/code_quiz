const timerSpanElement = document.getElementById("timer");
const startQuizButtonElement = document.getElementById("start-btn");
const introContainer = document.getElementById("quiz-container");
const submitScoreBtn = document.getElementById("submit-score-btn");

// timer starting value
let timerValue = 60;

// empty array to store high scores
let highScores = [];

// starting score
let score = 0;

// current question
let questionIndex = 0;

// Quiz question data
const questions = [
  {
    title: "Which of these is NOT a way to declare a variable in Javascript?",
    choices: ["const", "set", "let", "var"],
    answer: "set",
  },

  {
    title: "JavaScript variables are usually written in which type of case?",
    choices: ["lowercase", "UPPERCASE", "camelCase", "CapitalCase"],
    answer: "camelCase",
  },

  {
    title: "Object properties are made up of pairs of keys and _____?",
    choices: ["values", "properties", "variables", "arrays"],
    answer: "values",
  },

  {
    title:
      "What do we call the values received by a function when it is invoked?",
    choices: ["variables", "arguments", "parameters", "inputs"],
    answer: "arguments",
  },
  {
    title: "Which of the following is NOT a Javascript array method?",
    choices: [".join()", ".pop()", ".unshift()", ".combine()"],
    answer: ".combine()",
  },
];

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

// displays the questions on the screen
const displayQuestion = () => {
  const currentQuestion = questions[questionIndex];
  const questionsContainerDiv = document.getElementById("questions-div");
  if (questions.length > questionIndex) {
    questionsContainerDiv.textContent = currentQuestion.title;
    let choices = currentQuestion.choices;
    choices.forEach(createChoiceAndAppend);
  }
};

// create answer buttons as function to be used in foreach loop
const createChoiceAndAppend = (item, index) => {
  const answersDiv = document.getElementById("answers-div");
  const answerButton = document.createElement("button");
  answerButton.setAttribute("class", "answer-btn");
  answerButton.setAttribute("id", index);
  answerButton.setAttribute("data-answer", item);
  answerButton.textContent = item;

  answersDiv.appendChild(answerButton);
  answerButton.addEventListener("click", function () {
    const answer = this.getAttribute("data-answer");
    const button = this;
    checkAnswer(answer, button);
  });
};

// Check Answer + display next question
const checkAnswer = (answer, button) => {
  if (answer == questions[questionIndex].answer) {
    score += 5;
    button.setAttribute("class", "answer-btn correct-answer");
  } else {
    if (timerValue >= 10) {
      timerValue -= 10;
    }
    button.setAttribute("class", "answer-btn incorrect-answer");
  }
  const questionDelayTimerCallback = () => {
    if (questionIndex <= questions.length - 1) {
      questionIndex += 1;
      if (questionIndex < questions.length) {
        const answersDiv = document.getElementById("answers-div");
        answersDiv.innerHTML = "";
      }
      displayQuestion();
      clearInterval(answerTimer);
    } else {
      gameOver();
    }
  };
  const answerTimer = setTimeout(questionDelayTimerCallback, 1000);
};

// final score function
const calculateFinalScore = () => {
  const finalScore = score + timerValue;
  return finalScore;
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
  finalScoreSpan.textContent = calculateFinalScore();

  submitScoreBtn.addEventListener("click", submitScore);

  quizContainerDiv.appendChild(headingContainerDiv);
  quizContainerDiv.appendChild(resultsContainerDiv);
  resultsContainerDiv.appendChild(finalScoreSpan);
  quizContainerDiv.appendChild(gameOverForm);
  gameOverForm.appendChild(initialsInput);
  gameOverForm.appendChild(submitScoreBtn);

  return quizContainerDiv;
};

// Game over function
const gameOver = () => {
  const gameOverContainer = constructGameOverContainer();
  const quizContainerDiv = document.getElementById("quiz-container");
  document.body.removeChild(quizContainerDiv);
  timerSpanElement.remove();
  document.body.appendChild(gameOverContainer);
};

// Timer function
const startTimer = () => {
  // define callback function for setInterval
  const timerTick = () => {
    timerSpanElement.textContent = timerValue;
    if (timerValue > 0) {
      timerValue -= 1;
    }
    // if no time is left  or all questions are answered, game ends
    if (timerValue === 0 || questionIndex > questions.length - 1) {
      clearInterval(timerInterval);
      gameOver();
    }
  };
  const timerInterval = setInterval(timerTick, 1000);
};

// Log high scores to local storage
const storeUserScores = () => {
  // get info from initials input
  let initials = document.getElementById("initials-input").value;
  const finalScore = calculateFinalScore();
  console.log(finalScore);
  if (initials !== "") {
    const userFinalScore = {
      Initials: initials,
      Score: finalScore,
    };
    highScores.push(userFinalScore);
    console.log(highScores);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "./high-scores.html";
  } else {
    alert("Please enter your initials to save your score.");
  }
};

// Retrieve high scores from local storage and load them into an array called highScoreArray
const loadHighScores = () => {
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
  storeUserScores();
};

// Start quiz function
const startQuiz = () => {
  document.body.removeChild(introContainer);
  const quizContainerDiv = constructQuizContainer();
  document.body.appendChild(quizContainerDiv);

  loadHighScores();
  displayQuestion();
  timerSpanElement.textContent = timerValue;
  startTimer();
};

startQuizButtonElement.addEventListener("click", startQuiz);
