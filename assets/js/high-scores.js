const backButtonElement = document.getElementById("back-btn");
const clearHighScoresButtonElement = document.getElementById(
  "clear-highscores-btn"
);
const highScoresContainerDiv = document.getElementById("high-scores");
const highScoresListContainer = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores"));

// sort scores in descending order
const orderScores = () => {
  highScores.sort(function (a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);
  });
};

// construct high scores table from data stored in local storage
const constructHighScoresListItem = (item, index) => {
  let counter = index + 1;
  const highScoreItem = document.createElement("li");
  highScoreItem.setAttribute("class", "list-item");
  highScoreItem.textContent =
    counter + ".   " + item["Initials"] + " -   " + item["Score"];
  highScoresListContainer.appendChild(highScoreItem);
};

// order high score items and render high score table on screen
const onLoad = () => {
  if (highScores) {
    orderScores();
    highScores.forEach(constructHighScoresListItem);
  }
};

// clear high scores function
const clearHighScores = () => {
  localStorage.clear();
  highScores.length = 0;
  highScoresContainerDiv.removeChild(highScoresListContainer);
};

clearHighScoresButtonElement.addEventListener("click", clearHighScores);
window.addEventListener("load", onLoad);
