function loadScores() {
  console.log("Entered loadScores function");

  fetch("/api/rank")
    .then((response) => response.json())
    .then((data) => {
      // Assuming `data` is an array of objects [{ username, score, date }, ...]
      const tableBodyEl = document.querySelector("#scores");
      tableBodyEl.innerHTML = "";

      if (data.length) {
        data.forEach((playerInformation, i) => {
          const tableRowEl = document.createElement("tr");
          const positionTdEl = document.createElement("td");
          const nameTdEl = document.createElement("td");
          const scoreTdEl = document.createElement("td");
          const dateTdEl = document.createElement("td");

          positionTdEl.textContent = i + 1;
          nameTdEl.textContent = playerInformation.username; // Adjusted for object structure
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
          '<tr><td colSpan="4">Be the first to score!</td></tr>';
      }
    })
    .catch((error) => console.error("Error loading scores:", error));
}

document.addEventListener("DOMContentLoaded", loadScores);
