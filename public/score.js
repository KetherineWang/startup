function getPlayerUsername() {
  console.log("Entered getPlayerUsername function");

  return localStorage.getItem("username") || "Unknown Player";
}

function getPlayerScore() {
  console.log("Entered getPlayerScore function");

  fetch("/api/scores")
    .then((response) => response.json())
    .then((data) => {
      const currentPlayer = getPlayerUsername();
      const playerScore = data[currentPlayer] ? data[currentPlayer].score : 0;
      displayPlayerScore(playerScore);
    })
    .catch((error) => console.error("Failed to fetch player score:", error));
}

function displayPlayerScore(score) {
  console.log("Entered displayPlayerScore function");
  console.log(score);

  const playerScoreEl = document.querySelector("#playerScore");
  playerScoreEl.textContent = score;
}

function resetScoreZero() {
  console.log("Entered resetScoreZero function");

  const currentPlayer = getPlayerUsername();

  fetch("/api/reset", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: currentPlayer,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Score reset to zero successfully.");
      } else {
        throw new Error("Failed to reset score.");
      }
    })
    .catch((error) => console.error("Error resetting score:", error));
}

function initScore() {
  getPlayerScore();
}

document.addEventListener("DOMContentLoaded", initScore);
