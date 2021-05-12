import {
  javascriptQuestions,
  htmlQuestions,
  cssQuestions,
} from "../../utils/questions.js";

// Global Variables
let timerValue;

let score = 0;

let questionIndex = 0;

let questions = [];

const setTimer = (questions) => {
  return (timerValue = questions.length * 10);
};

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

const displayQuestion = () => {
  const currentQuestion = questions[questionIndex];
  if (questions.length > questionIndex) {
    $("#questions-div").text(currentQuestion.title);
    const choices = currentQuestion.choices;

    const createChoiceAndAppend = (item, index) => {
      $("#answers-div").append(`
    <button class="btn btn-primary" type="button" id="${index}" data-answer="${item}">${item}</button>
    `);
    };

    choices.forEach(createChoiceAndAppend);
  }
};

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

      // if there are still questions left keep looping, else end the game
      if (questionIndex < questions.length) {
        $("#answers-div").empty();
      }
      displayQuestion();
      clearInterval(answerTimer);
    } else {
      gameOver();
    }
  };
  const answerTimer = setTimeout(questionDelayTimerCallback, 1000);
};

const calculateFinalScore = () => {
  const finalScore = score + timerValue;
  return finalScore;
};

const constructGameOverModal = (questions) => {
  const generateAnswerTable = (each) => {
    return `
    <li><span class="fw-bold">Question: </span><span class="fw-normal">${each.title}</span> </li>
    <p><span class="fw-bold">Answer: </span> <span class="fw-normal">${each.answer}</span></p>
    `;
  };
  const questionListItems = questions.map(generateAnswerTable);

  return `
  <div class="modal fade" tabindex="-1"  id="answersModal" aria-labelledby="answersModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center" id="answersModalLabel">Correct Answers</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ol>
            ${questionListItems.join("")}
          </ol>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
};

const constructGameOverContainer = () => {
  const finalScore = calculateFinalScore();
  const modal = constructGameOverModal(questions);

  const gameOver = `<h2 class="card-header py-3 text-center timer">Quiz Complete!</h2>
  <div class="card-body">
    <div class="d-grid gap-2 col-4 mx-auto py-3">
      <button id="correct-answers-btn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#answersModal" data-bs-whatever="@mdo">
        See correct answers
      </button>
      ${modal}
    </div>

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

  const showModal = () => {
    $("#answersModal").show();
  };

  $("#correct-answers-btn").click(showModal);

  $("#submit-score-btn").click(submitScore);
};

const gameOver = () => {
  $("#main-container").empty();
  $("#timer").remove();
  constructGameOverContainer();
};

const startTimer = () => {
  const timerTick = () => {
    $("#timer").text(timerValue);
    if (timerValue > 0) {
      timerValue -= 1;
    }

    // check if time has run out or if there are no questions left, then end game
    if (timerValue === 0 || questionIndex > questions.length - 1) {
      clearInterval(timerInterval);
      gameOver();
    }
  };
  const timerInterval = setInterval(timerTick, 1000);
};

const storeUserScores = () => {
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

const getHighScoresFromLocalStorage = () => {
  const highScores = localStorage.getItem("highScores");
  if (highScores) {
    return JSON.parse(highScores);
  } else {
    return [];
  }
};

const submitScore = (event) => {
  event.preventDefault();
  storeUserScores();
};

const selectQuestions = (javascriptQuestions, htmlQuestions, cssQuestions) => {
  const javascriptOption = $("#javascriptCheckbox");
  const htmlOption = $("#htmlCheckbox");
  const cssOption = $("#cssCheckbox");

  if (javascriptOption.is(":checked")) {
    questions.push(...javascriptQuestions);
  }

  if (htmlOption.is(":checked")) {
    questions.push(...htmlQuestions);
  }

  if (cssOption.is(":checked")) {
    questions.push(...cssQuestions);
  }
};

const shuffleArray = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const onSubmit = (event) => {
  event.preventDefault();

  selectQuestions(javascriptQuestions, htmlQuestions, cssQuestions);
  questions = shuffleArray(questions);

  if (questions.length) {
    $("#main-container").empty();
    constructQuizContainer(questions);

    setTimer(questions);
    $("#timer").text(timerValue);
    startTimer();
  } else {
    $("#start-btn").popover("show");
  }
};

$("#start-form").on("submit", onSubmit);
