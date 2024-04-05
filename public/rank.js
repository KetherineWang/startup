function loadScores() {
  console.log("Entered loadScores function");

  fetch("/api/scores")
    .then((response) => response.json())
    .then((data) => {
      const scores = data;
      const tableBodyEl = document.querySelector("#scores");
      tableBodyEl.innerHTML = "";

      if (Object.keys(scores).length) {
        const sortedScores = Object.entries(scores)
          .sort((a, b) => b[1].score - a[1].score)
          .slice(0, 10);

        sortedScores.forEach(([playerUsername, playerInformation], i) => {
          const tableRowEl = document.createElement("tr");
          const positionTdEl = document.createElement("td");
          const nameTdEl = document.createElement("td");
          const scoreTdEl = document.createElement("td");
          const dateTdEl = document.createElement("td");

          positionTdEl.textContent = i + 1;
          nameTdEl.textContent = playerUsername;
          scoreTdEl.textContent = playerInformation.score;
          dateTdEl.textContent = playerInformation.date;

          tableRowEl.appendChild(positionTdEl);
          tableRowEl.appendChild(nameTdEl);
          tableRowEl.appendChild(scoreTdEl);
          tableRowEl.appendChild(dateTdEl);

          tableBodyEl.appendChild(tableRowEl);
        });
      } else {
        tableBodyEl.innerHTML =
          '<tr><td colSpan="4">Be the first to score</td></tr>';
      }
    })
    .catch((error) => console.error("Error loading scores:", error));
}

document.addEventListener("DOMContentLoaded", loadScores);
