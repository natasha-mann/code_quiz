// Global Variables
let timerValue = 60;

let score = 0;

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
  const quizContainerDiv = `<main class="container" id="quiz-container">
    <div class="questions-div" id="questions-div"></div>
    <div class="answers-div" id="answers-div"></div>
  </main>`;

  $("#main-container").append(quizContainerDiv);
  displayQuestion();
  $("#answers-div").click(checkAnswer);
};

// displays the questions on the screen
const displayQuestion = () => {
  const currentQuestion = questions[questionIndex];
  if (questions.length > questionIndex) {
    $("#questions-div").text(currentQuestion.title);
    let choices = currentQuestion.choices;
    choices.forEach(createChoiceAndAppend);
  }
};

// create answer buttons as function to be used in foreach loop
const createChoiceAndAppend = (item, index) => {
  $("#answers-div").append(`
<button class="answer-btn" id="${index}" data-answer="${item}">${item}</button>
`);
};

// Check Answer + display next question
const checkAnswer = (event) => {
  const chosenAnswer = event.target;
  const answer = $(chosenAnswer).data("answer");
  if (answer == questions[questionIndex].answer) {
    score += 5;
    $(chosenAnswer).addClass("answer-btn correct-answer");
  } else {
    if (timerValue >= 10) {
      timerValue -= 10;
    }
    $(chosenAnswer).addClass("answer-btn incorrect-answer");
  }
  const questionDelayTimerCallback = () => {
    if (questionIndex <= questions.length - 1) {
      questionIndex += 1;
      if (questionIndex < questions.length) {
        $("#answers-div").empty();
      }
      displayQuestion();
      clearInterval(answerTimer);
    } else {
      gameOver();
    }
  };
  const answerTimer = setTimeout(questionDelayTimerCallback, 500);
};

// final score function
const calculateFinalScore = () => (finalScore = score + timerValue);

// Construct Game OVer container
const constructGameOverContainer = () => {
  const finalScore = calculateFinalScore();

  const gameOver = `<main class="container" id="game-over-container">
    <div class="results-heading-div">Game Over!</div>
    <div class="results-info">
      Your final score is: <span id="final-score">${finalScore}</span>
    </div>
    <form class="game-over-form" id="game-over-form">
      <input
        placeholder="Enter Initials"
        id="initials-input"
        class="initials-input"
      ></input>
      <button type="submit" id="submit-score-btn" class="submit-score-btn">
        Submit
      </button>
    </form>
  </main>`;

  $("#submit-score-btn").click(submitScore);

  $("#main-container").append(gameOver);
};

// Game over function
const gameOver = () => {
  $("#main-container").empty();
  $("#timer").remove();
  constructGameOverContainer();
};

// Timer function
const startTimer = () => {
  // define callback function for setInterval
  const timerTick = () => {
    $("#timer").text(timerValue);
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
  const initials = $("#initials-input").val();
  const finalScore = calculateFinalScore();
  if (initials !== "") {
    const userFinalScore = {
      initials: initials,
      score: finalScore,
    };
    const highScores = getHighScoresFromLocalStorage();
    highScores.push(userFinalScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "./high-scores.html";
  } else {
    alert("Please enter your initials to save your score.");
  }
};

// Get high scores from local storage
const getHighScoresFromLocalStorage = () => {
  const highScores = localStorage.getItem("highScores");
  if (highScores) {
    return JSON.parse(highScores);
  } else {
    return [];
  }
};

// Submit high scores
const submitScore = (event) => {
  event.preventDefault();
  storeUserScores();
};

// Start quiz function
const startQuiz = () => {
  $("#main-container").empty();
  constructQuizContainer();

  $("#timer").text(timerValue);
  startTimer();
};

$("#start-btn").click(startQuiz);
