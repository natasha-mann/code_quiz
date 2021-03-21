const backButtonElement = document.getElementById("back-btn");
const clearHighScoresButtonElement = document.getElementById(
  "clear-highscores-btn"
);
const highScoresListContainer = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores"));

window.addEventListener("load", (event) => {
  displayHighScores();
});

const displayHighScores = () => {
  console.log(highScores);

  if (highScores) {
    highScores.forEach(constructHighScoresTable);
  }
};

const constructHighScoresTable = (item, index) => {
  let counter = index + 1;
  const highScoreItem = document.createElement("li");
  highScoreItem.setAttribute("class", "list-item");
  const highScoreCounter = document.createElement;
  highScoreItem.textContent =
    counter + ".   " + item["Initials"] + " -   " + item["Score"];
  highScoresListContainer.appendChild(highScoreItem);
};

// navigate back to main html document function
const goBackToQuizPage = () => {
  location.href = "../../index.html";
};

// clear high scores function
const clearHighScores = () => {};

backButtonElement.addEventListener("click", goBackToQuizPage);
clearHighScoresButtonElement.addEventListener("click", clearHighScores);
