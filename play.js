function storeLyricsData() {
    console.log("Entered storeLyricsData function")

    const lyricsData = [
      {
        "lyric": "You never had a clue\nAll the days that I spent loving you\nWho am I supposed to give 'em to?",
        "options": ["ANGEL", "GABRIEL", "LIMBO", "UNDERSTAND"],
        "answer": "ANGEL",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234379731&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "lyric": "'Cause you never know until you do\nIf I had to guess, I think it's you\nSo if I fake it\nWould it be true?",
        "options": ["bandaids", "drunk", "blue", "us"],
        "answer": "us",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/911450407&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "lyric": "Impatient, just say it\nStill waitin', for another round\nNew faces, I'm racin'\nI'm fine but I'll never make it home",
        "options": ["beside you", "drunk", "blue", "talk"],
        "answer": "blue",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/725573965&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
        "lyric": "Never thought that I'd find\nThat the one in my life would be so near\nAnd now you're here",
        "options": ["right here", "UNDERSTAND", "always", "us"],
        "answer": "UNDERSTAND",
        "soundCloud": '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234378480&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'
      },
      {
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

  function displayLyricAndOptions() {
    console.log("Entered displayLyricAndOptions function")

    const lyricsData = getLyricsData();
    const currentLyricIndex = Math.floor(Math.random() * lyricsData.length);
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
        const label = document.createElement('lable');
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
        emoji.addEventListener('click', function() {
            const reaction = this.textContent;
            console.log(`Emoji ${reaction} clicked`);
        });
    });
  }

  function skipQuestion() {
    console.log("Entered skipQuestion function")

    document.querySelector('#skip').addEventListener('click', displayLyricAndOptions);
  }

  function nextQuestion() {
    console.log("Entered nextQuestion function")

    document.querySelector('#next').addEventListener('click', displayLyricAndOptions);
  }

  function endGame() {
    console.log("Entered endGame function")

    document.querySelector('#end').addEventListener('click', () => {
        windown.location.href = 'score.html';
    })
  }

  function checkGuess() {
    console.log("Entered checkGuess function")

    document.querySelector('#go').addEventListener('click', function() {
        const selectedOption = document.querySelector('input[type="radio"]:checked');
        if (!selectedOption) {
            alert('Please select an option!');
            return;
        }

        const lyricsData = getLyricsData();
        const currentLyricIndex = parseInt(localStorage.getItem('currentLyricIndex'), 10);
        const currentLyric = lyricsData[currentLyricIndex];

        if (selectedOption.value === currentLyric.answer) {
            displayAnswerAndSoundCloud(currentLyric.answer, currentLyric.soundCloud);
            updateScore(true);
        } else {
            alert('Please select an option!');
            updateScore(false);
            window.location.href = 'score.html';
        }
    });
  }

  function displayAnswerAndSoundCloud(answer, soundCloud) {
    console.log("Entered disPlayAnswerAndSoundCloud function")

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

  }

  function initPlay() {
    if (!localStorage.getItem('lyricsData')) {
        storeLyricsData();
    }
    displayLyricAndOptions();
    handleEmojiClick();
    skipQuestion();
    nextQuestion();
    endGame();
    checkGuess();
  }

  document.addEventListener('DOMContentLoaded', initPlay);