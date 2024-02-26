function storeLyricsData() {
    console.log("Entered storeLyricsData function")

    const lyricsData = [
      {
        "isAnswered": false,
        "lyric": "You never had a clue\nAll the days that I spent loving you\nWho am I supposed to give 'em to?",
        "options": ["ANGEL", "GABRIEL", "LIMBO", "UNDERSTAND"],
        "answer": "ANGEL",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234379731&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "isAnswered": false,
        "lyric": "'Cause you never know until you do\nIf I had to guess, I think it's you\nSo if I fake it\nWould it be true?",
        "options": ["bandaids", "drunk", "blue", "us"],
        "answer": "us",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/911450407&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "isAnswered": false,
        "lyric": "Impatient, just say it\nStill waitin', for another round\nNew faces, I'm racin'\nI'm fine but I'll never make it home",
        "options": ["beside you", "drunk", "blue", "talk"],
        "answer": "blue",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/725573965&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "isAnswered": false,
        "lyric": "Never thought that I'd find\nThat the one in my life would be so near\nAnd now you're here",
        "options": ["right here", "UNDERSTAND", "always", "us"],
        "answer": "UNDERSTAND",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234378480&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "isAnswered": false,
        "lyric": "I think some words are overdue\nCould we just do it over?\nCan we just talk it out like friends\nBecause I need your shoulder",
        "options": ["right here", "beside you", "B.Y.S.", "talk"],
        "answer": "right here",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/682184639&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      }
    ];
  
    localStorage.setItem('lyricsData', JSON.stringify(lyricsData));
}

function getLyricsData() {
    console.log("Entered getLyricsData function")

    return JSON.parse(localStorage.getItem('lyricsData'));
}

function getPlayerUsername() {
    console.log("Entered getPlayerName function")

    return localStorage.getItem('username') || 'Unknown Player'
}

function displayPlayerUsername() {
    const playerUsernameEl = document.querySelector('.playerUsername');
    playerUsernameEl.textContent = getPlayerUsername();
}

setInterval(() => {
    addNewMessage();
}, 1500);

function addNewMessage() {
    const notifications = document.querySelector('#notifications');
    const notificationsChildren = Array.from(notifications.children);

    const newStartMessage = document.createElement('div');
    newScoreMessage.className = 'message';
    newScoreMessage.innerHTML = `<span class="playerEvent">keshi</span> started a new game`;

    const score = Math.floor(Math.random() * 100);
    const newScoreMessage = document.createElement('div');
    newScoreMessage.className = 'message';
    newScoreMessage.innerHTML = `<span class="playerEvent">keshi</span> scored ${score}`;

    const emoji = getLastEmojiClicked();
    const newEmojiMessage = document.createElement('div');
    newEmojiMessage.className = 'message';
    newEmojiMessage.innerHTML = `<span class="playerEvent">keshi</span> ${emoji}`;

    notificationsChildren.unshift(newStartMessage);
    notificationsChildren.unshift(newScoreMessage);
    notificationsChildren.unshift(newEmojiMessage);
    if (notifications.children.length > 15) {
        notificationsChildren.pop()
    }
    notifications.replaceChildren(...notificationsChildren);
}

let counter = 0;

function displayLyricAndOptions() {
    console.log("Entered displayLyricAndOptions function")

    const lyricsData = getLyricsData();
    const currentLyricIndex = counter;
    const currentLyric = lyricsData[currentLyricIndex];

    const lyricsEl = document.querySelector('.lyrics p');
    lyricsEl.textContent = '';
    currentLyric.lyric.split('\n').forEach(line => {
        lyricsEl.appendChild(document.createTextNode(line));
        lyricsEl.appendChild(document.createElement('br'));
    });

    const optionsContainer = document.querySelector('.optionsContainer');
    while (optionsContainer.hasChildNodes()) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    currentLyric.options.forEach(option => {
        const label = document.createElement('label');
        const div = document.createElement('div');
        div.className = "radioContainer";
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'song';
        input.value = option;
        input.style.width = '20px';
        input.style.height = '20px';

        div.appendChild(input);
        div.appendChild(document.createTextNode(` ${option}`));
        label.appendChild(div);
        optionsContainer.appendChild(label);
    });

    localStorage.setItem('currentLyricIndex', currentLyricIndex.toString())
}

function handleEmojiClick() {
    console.log("Entered handleEmojiClick function")

    document.querySelectorAll('.emoji').forEach(emoji => {
        emoji.addEventListener('click', function(event) {
            const reaction = emoji.textContent;
            //const reaction = this.textContent;
            console.log(`Emoji ${reaction} clicked`);

            localStorage.setItem('lastEmojiClicked', reaction);
        });
    });
}

function getLastEmojiClicked() {
    const lastEmojiClicked = localStorage.getItem('lastEmojiClicked');
    
    if(lastEmojiClicked) {
        console.log(`The last emoji clicked was: ${lastEmojiClicked}`);
    } else {
        console.log('No emoji reaction has been stored.');
    }
}

function skipQuestion() {
    console.log("Entered skipQuestion function")

    const lyricsData = getLyricsData();
    const currentLyricIndex = counter;
    const currentLyric = lyricsData[currentLyricIndex];

    if (counter < lyricsData.length) {
        counter += 1;
    }
}

function nextQuestion() {
    console.log("Entered nextQuestion function")

    const lyricsData = getLyricsData();
    const currentLyricIndex = counter;
    const currentLyric = lyricsData[currentLyricIndex];

    if (counter < lyricsData.length) {
        counter += 1;
    }
}

function endGame() {
    console.log("Entered endGame function")

    document.querySelector('#end').addEventListener('click', () => {
        windown.location.href = 'score.html';
    })
}

function checkGuess() {
    console.log("Entered checkGuess function")

    const lyricsData = getLyricsData();
    const currentLyricIndex = parseInt(localStorage.getItem('currentLyricIndex'), 10);
    const currentLyric = lyricsData[currentLyricIndex];

    if (currentLyric.isAnswered) {
        alert('You have already answered this question. Please move to the next question.')
        return;
    }

    const selectedOption = document.querySelector('input[type="radio"]:checked');
    if (!selectedOption) {
        alert('Please select an option!');
        return;
    }

    currentLyric.isAnswered = true;

    if (selectedOption.value === currentLyric.answer) {
        displayAnswerAndSoundCloud(currentLyric.answer, currentLyric.soundCloud);
        updateScore(true);
    } else {
        alert('Incorret! Sorry the game ends upon the first incorrect answer.')
        updateScore(false);
        window.location.href = 'score.html';
    };
}

function displayAnswerAndSoundCloud(answer, soundCloud) {
    console.log("Entered displayAnswerAndSoundCloud function")

    const answerEl = document.querySelector('.answer');

    answerEl.style.animation = 'none';
    answerEl.offsetHeight;
    answerEl.style.animation = '';

    answerEl.textContent = `${answer} ✅`;
    answerEl.style.display = 'block';

    const soundCloudContainer = document.querySelector('#soundCloud');
    soundCloudContainer.innerHTML = soundCloud;
}

function updateScore(isCorrect) {
    console.log("Entered updateScore function")

    if (isCorrect) {
        let currentPlayer = getPlayerName();
        let scores = JSON.parse(localStorage.getItem('scores')) || {}

        if (!scores[currentPlayer]) {
            scores[currentPlayer] = {
                score: 0,
                date: new Date().toLocaleString()
            }
        }

        scores[currentPlayer] += 1;
        scores[currentPlayer].date = new Date().toLocaleString();
        console.log(`After updating, ${currentPlayer}'s score:`, scores[currentPlayer]);

        localStorage.setItem('scores', JSON.stringify(scores));
        console.log("Scores saved to localStorage:", scores);
    }
}

function initPlay() {
    storeLyricsData();
    displayPlayerUsername();
    displayLyricAndOptions();
    handleEmojiClick();
    endGame();
    document.querySelector('#next').addEventListener('click', displayLyricAndOptions);
    document.querySelector('#skip').addEventListener('click', displayLyricAndOptions);

}

document.addEventListener('DOMContentLoaded', initPlay);