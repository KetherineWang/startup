// Event messages
const gameEndEvent = 'gameEnd';
const gameStartEvent = 'gameStart';
const emojiReaction = "emojiClick";

const socket = configureWebSocket();

function getLyricsData() {
  console.log("Entered getLyricsData function");

  return fetch("/api/lyrics").then((response) => response.json());
}

function getPlayerUsername() {
  console.log("Entered getPlayerUsername function");

  return localStorage.getItem("username") || "Unknown Player";
}

function displayPlayerUsername() {
  console.log("Entered displayPlayerUsername function");

  const currentPlayerUsername = getPlayerUsername();

  const playerUsernameEl = document.querySelector("#playerUsername");
  playerUsernameEl.textContent = currentPlayerUsername || "Unknown Player";
}

let counter = 0;

function displayLyricAndOptions() {
  console.log("Entered displayLyricAndOptions function");

  getLyricsData().then((lyricsData) => {
    const currentLyric = lyricsData[counter];

    const lyricsEl = document.querySelector(".lyrics p");
    lyricsEl.textContent = "";
    currentLyric.lyric.split("\n").forEach((line) => {
      lyricsEl.appendChild(document.createTextNode(line));
      lyricsEl.appendChild(document.createElement("br"));
    });

    const optionsContainer = document.querySelector(".optionsContainer");
    while (optionsContainer.hasChildNodes()) {
      optionsContainer.removeChild(optionsContainer.firstChild);
    }

    currentLyric.options.forEach((option) => {
      const label = document.createElement("label");
      const div = document.createElement("div");
      div.className = "radioContainer";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "song";
      input.value = option;
      input.style.width = "20px";
      input.style.height = "20px";

      div.appendChild(input);
      div.appendChild(document.createTextNode(` ${option}`));
      label.appendChild(div);
      optionsContainer.appendChild(label);
    });
  });
}

function handleEmojiClick() {
  console.log("Entered handleEmojiClick function");

  document.querySelectorAll(".emoji").forEach((emoji) => {
    emoji.addEventListener("click", function (event) {
      const lastEmojiClicked = emoji.textContent;
      //const reaction = this.textContent;
      console.log(`Emoji ${lastEmojiClicked} clicked`);

      const currentPlayerUsername = getPlayerUsername();
      localStorage.setItem("lastEmojiClicked", lastEmojiClicked);
      broadcastEvent(currentPlayerUsername, emojiReaction, lastEmojiClicked);

      // fetch("/api/emoji", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ emoji: lastEmojiClicked }),
      // });
    });
  });
}

// function getLastEmojiClicked() {
//   // console.log("Entered getLastEmojiClicked function")

//   return fetch("/api/emoji")
//     .then((response) => response.text())
//     .then((emoji) => {
//       console.log(`The last emoji clicked was: ${emoji}`);
//       return emoji;
//     })
//     .catch((error) => {
//       console.error("Error fetching the last emoji clicked:", error);
//       return "";
//     });
// }

function skipQuestion() {
  console.log("Entered skipQuestion function");

  counter += 1;
}

function nextQuestion() {
  console.log("Entered nextQuestion function");

  counter += 1;
}

function endGame() {
  console.log("Entered endGame function");

  const currentPlayerUsername = getPlayerUsername();
  const currentPlayerScore = localStorage.getItem(`${currentPlayerUsername}_score`);
  broadcastEvent(currentPlayerUsername, gameEndEvent, currentPlayerScore);

  document.querySelector("#end").addEventListener("click", () => {
    window.location.href = "score.html";
  });
}

function checkGuess() {
  console.log("Entered checkGuess function");

  const selectedOption = document.querySelector('input[type="radio"]:checked');
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  getLyricsData().then((lyricsData) => {
    const currentLyric = lyricsData[counter];
    if (selectedOption.value === currentLyric.answer) {
      displayAnswerAndSoundCloud(currentLyric.answer, currentLyric.soundCloud);
      updateScore(true);
    } else {
      alert("Sorry wrong answer. Please try again!");
      updateScore(false);
    }
  });
}

function displayAnswerAndSoundCloud(answer, soundCloud) {
  console.log("Entered displayAnswerAndSoundCloud function");

  const answerEl = document.querySelector(".answer");

  answerEl.style.animation = "none";
  answerEl.offsetHeight;
  answerEl.style.animation = "";

  answerEl.textContent = `${answer} ✅`;
  answerEl.style.display = "block";

  const soundCloudContainer = document.querySelector("#soundCloud");
  soundCloudContainer.innerHTML = soundCloud;

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function updateScore(isCorrect) {
  console.log("Entered updateScore function");

  if (isCorrect) {
    const currentPlayerUsername = getPlayerUsername();
    // Retrieve the current score from Local Storage, or start at 0 if not set
    let currentPlayerScore = parseInt(localStorage.getItem(`${currentPlayerUsername}_score`), 10);
    // Increment the score
    currentPlayerScore += 1;
    // Update Local Storage with the new score
    localStorage.setItem(`${currentPlayerUsername}_score`, currentPlayerScore.toString());

    // Now, update the server with the new score
    fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: currentPlayerUsername, score: currentPlayerScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Score updated successfully", data);

        broadcastEvent(currentPlayerUsername, 'scoreUpdate', { score: currentPlayerScore });
      })
      .catch((error) => {
        console.error("Error updating score:", error);
      });
  }
}

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = async (event) => {
    displayMsg('system', 'game', 'connected');

    const currentPlayerUsername = await getPlayerUsername();
    broadcastEvent(currentPlayerUsername, gameStartEvent, {});
  };
  socket.onclose = (event) => {
    displayMsg('system', 'game', 'disconnected');
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    if (msg.type === gameEndEvent) {
      displayMsg('player', msg.from, `scored ${msg.value}`);
    } else if (msg.type === gameStartEvent) {
      displayMsg('player', msg.from, `started a new game`);
    } else if (msg.type === emojiReaction) {
      displayMsg('player', msg.from, `${msg.value}`);
    }
  };

  return socket;
}

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#playerMessages');
  chatText.innerHTML =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  socket.send(JSON.stringify(event));
}

function initPlay() {
  displayPlayerUsername();
  displayLyricAndOptions();
  handleEmojiClick();
  document
    .querySelector("#next")
    .addEventListener("click", displayLyricAndOptions);
  document
    .querySelector("#skip")
    .addEventListener("click", displayLyricAndOptions);
}

document.addEventListener("DOMContentLoaded", initPlay);

// let messageState = 0;

// setInterval(() => {
//   addNewMessage();
// }, 1500);

// async function addNewMessage() {
//   const notifications = document.querySelector("#notifications");

//   let newMessage;
//   if (messageState === 0) {
//     newMessage = createStartMessage();
//   } else if (messageState === 1) {
//     newMessage = createScoreMessage();
//   } else if (messageState === 2) {
//     newMessage = await createEmojiMessage();
//   }

//   if (newMessage) {
//     notifications.insertBefore(newMessage, notifications.firstChild);
//     if (notifications.children.length > 15) {
//       notifications.removeChild(notifications.lastChild);
//     }
//   }

//   messageState = (messageState + 1) % 3;
// }

// function createStartMessage() {
//   const newStartMessage = document.createElement("div");
//   newStartMessage.className = "message";
//   newStartMessage.innerHTML = `<span class="playerEvent">keshi</span> started a new game`;
//   return newStartMessage;
// }

// function createScoreMessage() {
//   const score = Math.floor(Math.random() * 100);
//   const newScoreMessage = document.createElement("div");
//   newScoreMessage.className = "message";
//   newScoreMessage.innerHTML = `<span class="playerEvent">keshi</span> scored ${score}`;
//   return newScoreMessage;
// }

// async function createEmojiMessage() {
//   const lastEmojiClicked = await getLastEmojiClicked();
//   if (lastEmojiClicked) {
//     const newEmojiMessage = document.createElement("div");
//     newEmojiMessage.className = "message";
//     newEmojiMessage.innerHTML = `<span class="playerEvent">keshi</span> ${lastEmojiClicked}`;
//     return newEmojiMessage;
//   }
//   return null;
// }
