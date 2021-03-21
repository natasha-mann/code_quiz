const backButtonElement = document.getElementById("back-btn");
const clearHighScoresButtonElement = document.getElementById(
  "clear-highscores-btn"
);

// navigate back to main html document function
const goBackToQuizPage = () => {
  location.href = "code_quiz/index.html";
};

// clear high scores function
const clearHighScores = () => {};

backButtonElement.addEventListener("click", goBackToQuizPage);
clearHighScoresButtonElement.addEventListener("click", clearHighScores);
