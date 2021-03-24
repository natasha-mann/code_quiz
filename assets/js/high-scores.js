const backButtonElement = document.getElementById("back-btn");
const clearHighScoresButtonElement = document.getElementById(
  "clear-highscores-btn"
);
const highScoresContainerDiv = document.getElementById("high-scores");
const highScoresListContainer = document.getElementById("high-scores-list");

// Get high scores from local storage
const getHighScoresFromLocalStorage = () => {
  const highScores = localStorage.getItem("highScores");
  if (highScores) {
    return JSON.parse(highScores);
  } else {
    return [];
  }
};

// sort scores in descending order
const orderScores = () => {
  const highScores = getHighScoresFromLocalStorage();
  highScores.sort(function (a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
  });
  return highScores;
};

// construct high scores table from data stored in local storage
const constructHighScoresListItem = (item, index) => {
  let counter = index + 1;
  const highScoreItem = document.createElement("li");
  highScoreItem.setAttribute("class", "list-item");
  highScoreItem.textContent =
    counter + ".   " + item["initials"] + " -   " + item["score"];
  highScoresListContainer.appendChild(highScoreItem);
};

// order high score items and render high score table on screen
const onLoad = () => {
  const highScores = orderScores();
  highScores.forEach(constructHighScoresListItem);
};

window.addEventListener("load", onLoad);

// clear high scores function
const clearHighScores = () => {
  const highScores = getHighScoresFromLocalStorage();
  localStorage.clear();
  highScoresContainerDiv.removeChild(highScoresListContainer);
};

clearHighScoresButtonElement.addEventListener("click", clearHighScores);
