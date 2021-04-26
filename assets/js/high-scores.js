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

  const highScoreItem = `<li class="list-item">${counter}. ${item.initials} - ${item.score}</li>`;

  $("#high-scores").append(highScoreItem);
};

// construct no high scores available div
const constructNoScoresAvailableDiv = () => {
  const noHighScoresAvailableDiv = `
  <div class="info">There are currently no high scores!</div>
  `;
  $("#high-scores").append(noHighScoresAvailableDiv);
};

// order high score items and render high score table on screen
const initialisePage = () => {
  const highScores = orderScores();
  if (highScores.length !== 0) {
    highScores.forEach(constructHighScoresListItem);
  } else {
    constructNoScoresAvailableDiv();
  }
};

$(document).ready(initialisePage);

// clear high scores function
const clearHighScores = () => {
  const highScores = getHighScoresFromLocalStorage();
  if (highScores.length !== 0) {
    localStorage.clear();
    $("#high-scores").empty();
    constructNoScoresAvailableDiv();
  }
};

$("#clear-highscores-btn").click(clearHighScores);
