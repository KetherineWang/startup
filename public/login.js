function login() {
  const usernameEl = document.querySelector("#username");
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("username", usernameEl.value);
  localStorage.setItem("password", passwordEl.value);
  window.location.href = "play.html";
}

const keshiSongs = ["2 soon", "right here", "drunk", "blue", "ANGEL"];

function fetchRandomKeshiLyrics() {
  const randomIndex = Math.floor(Math.random() * keshiSongs.length);
  const randomSong = keshiSongs[randomIndex];

  const apiUrl = `https://api.lyrics.ovh/v1/keshi/${randomSong}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.lyrics);

      if (data.lyrics) {
        document.querySelector(".lyrics h2").textContent = "Echoes of the Day";
        document.querySelector(
          ".lyrics h3"
        ).textContent = `keshi - ${randomSong}`;
        const lyrics = data.lyrics.split("\n").slice(1).join("<br />");
        document.querySelector(".lyrics p").innerHTML = lyrics;
      } else {
        document.querySelector(".lyrics p").textContent = "Lyrics not found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching lyrics:", error);
      document.querySelector(".lyrics p").textContent =
        "An error occurred while fetching the lyrics.";
    });
}

fetchRandomKeshiLyrics();
