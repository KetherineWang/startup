(async () => {
  const username = localStorage.getItem("username");
  if (username) {
    document.querySelector("#playerUsername").textContent = username;
    setDisplay("loginControls", "none");
    setDisplay("playControls", "block");
  } else {
    setDisplay("loginControls", "block");
    setDisplay("playControls", "none");
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const username = document.querySelector("#username")?.value;
  const password = document.querySelector("#password")?.value;
  const response = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify({ email: username, password: password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    localStorage.setItem("username", username);
    localStorage.setItem(`${username}_score`, 0);
    window.location.href = "game.html";
  } else {
    const body = await response.json();
    const modalEl = document.querySelector("#msgModal");
    modalEl.querySelector(".modal-body").textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function play() {
  window.location.href = 'play.html';
}

function logout() {
  const username = localStorage.getItem("username");
  localStorage.setItem(`${username}_score`, 0);

  localStorage.removeItem("username");

  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

async function getUser(email) {
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
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
