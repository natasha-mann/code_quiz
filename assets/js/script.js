import {
  javascriptQuestions,
  htmlQuestions,
  cssQuestions,
} from "../../utils/questions.js";

// Global Variables
// dynamically build timer?
let timerValue = 60;

let score = 0;

let questionIndex = 0;

let questions;

// Construct quiz questions container
const constructQuizContainer = (questions) => {
  const quizContainerDiv = `
  <h2 class="card-header py-3 text-center timer">Time left: <span id="timer">0</span></h2>
  <div class="card-body">
    <p class="card-text py-3 text-center" id="questions-div"></p>
    <div class="d-grid gap-2 col-6 mx-auto py-3 answers-div" id="answers-div"></div>
  </div>`;

  $("#main-container").append(quizContainerDiv);
  displayQuestion();
  $("#answers-div").click(checkAnswer);
};

// displays the questions on the screen
const displayQuestion = () => {
  const currentQuestion = questions[questionIndex];
  if (questions.length > questionIndex) {
    $("#questions-div").text(currentQuestion.title);
    const choices = currentQuestion.choices;
    choices.forEach(createChoiceAndAppend);
  }
};

// create answer buttons as function to be used in foreach loop
const createChoiceAndAppend = (item, index) => {
  $("#answers-div").append(`
<button class="btn btn-primary" type="button" id="${index}" data-answer="${item}">${item}</button>
`);
};

// Check Answer + display next question
const checkAnswer = (event) => {
  const chosenAnswer = event.target;
  const answer = $(chosenAnswer).data("answer");
  if (answer == questions[questionIndex].answer) {
    score += 5;
    if ($(chosenAnswer).is("button")) {
      $(chosenAnswer).removeClass("btn-primary");
      $(chosenAnswer).addClass("btn-success");
    }
  } else {
    if (timerValue >= 10) {
      timerValue -= 10;
    }
    if ($(chosenAnswer).is("button")) {
      $(chosenAnswer).removeClass("btn-primary");
      $(chosenAnswer).addClass("btn-danger");
    }
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
const calculateFinalScore = () => {
  const finalScore = score + timerValue;
  return finalScore;
};
// Construct Game OVer container
const constructGameOverContainer = () => {
  const finalScore = calculateFinalScore();

  const gameOver = `<h2 class="card-header py-3 text-center timer">Game Over!</h2>
  <div class="card-body">
    <p class="card-text py-3 text-center"> Your final score is: <span id="final-score">${finalScore}</span></p>
    <form id="game-over-form">
    <div class="mb-3">
      <input
        placeholder="Enter Initials"
        id="initials-input"
        class="form-control"
      ></input>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto py-3">
      <button type="submit" id="submit-score-btn" class="btn btn-primary">
        Submit
      </button>
      </div>
    </form>
  </div>`;

  $("#main-container").append(gameOver);
  $("#submit-score-btn").click(submitScore);
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
  if (initials) {
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

const selectQuestions = (javascriptQuestions, htmlQuestions, cssQuestions) => {
  const selectedOption = $("#questionsList").find(":selected").val();

  if (selectedOption === "javascript") {
    return javascriptQuestions;
  } else if (selectedOption === "html") {
    return htmlQuestions;
  } else if (selectedOption === "css") {
    return cssQuestions;
  }
};

// Start quiz function
const onSubmit = (event) => {
  event.preventDefault();

  questions = selectQuestions(javascriptQuestions, htmlQuestions, cssQuestions);

  if (questions) {
    $("#main-container").empty();
    constructQuizContainer(questions);

    $("#timer").text(timerValue);
    startTimer();
  } else {
    $("#start-btn").popover("show");
  }
};

$("#start-form").on("submit", onSubmit);
