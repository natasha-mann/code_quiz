const backButtonElement = document.getElementById("back-btn");
const clearHighScoresButtonElement = document.getElementById(
  "clear-highscores-btn"
);
const highScoresContainerDiv = document.getElementById("high-scores");
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
  highScoreItem.textContent =
    counter + ".   " + item["Initials"] + " -   " + item["Score"];
  highScoresListContainer.appendChild(highScoreItem);
};

// clear high scores function
const clearHighScores = () => {
  localStorage.clear();
  highScores.length = 0;
  highScoresContainerDiv.removeChild(highScoresListContainer);
};

clearHighScoresButtonElement.addEventListener("click", clearHighScores);
