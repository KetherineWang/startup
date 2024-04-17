import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './play.css'

export function Play() {
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Unknown Player');
  const [lyricsData, setLyricsData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(parseInt(localStorage.getItem(`${username}_score`), 10) || 0);
  const [answer, setAnswer] = useState('');
  const [soundCloud, setSoundCloud] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchLyricsData();
  }, []);

  const fetchLyricsData = async () => {
    const response = await fetch('/api/lyrics');
    const data = await response.json();
    setLyricsData(data);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleEmojiClick = (emoji) => {
    console.log(`Emoji ${emoji} clicked`);
    localStorage.setItem('lastEmojiClicked', emoji);
  };

  const checkGuess = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }

    const currentLyric = lyricsData[counter];
    if (selectedOption === currentLyric.answer) {
      displayAnswerAndSoundCloud(currentLyric.answer, currentLyric.soundCloud);
      updateScore(true);
    } else {
      alert("Sorry wrong answer. Please try again!");
      setAnswer('Wrong answer, try again!');
      setSoundCloud('');
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem(`${username}_score`, newScore.toString());
      postScoreUpdate(newScore);
    }
  };

  const postScoreUpdate = (newScore) => {
    fetch('/api/score', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score: newScore }),
    })
      .then((response) => {
        console.log("Score updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating score:", error);
      });
  };

  const displayAnswerAndSoundCloud = (answer, soundCloudUrl) => {
    setAnswer(`${answer} ✅`);
    setSoundCloud(soundCloudUrl);
  };

  const moveToNextQuestion = () => {
    if (counter < lyricsData.length - 1) {
      setCounter(prev => prev + 1);
      setSelectedOption('');
      setAnswer('');
      setSoundCloud('');
    } else {
      alert("You have completed all questions.");
      window.location.href = "score.html";
    }
  };

  return (
    <main>
      <PlayerInfo username={username} />
      <Lyrics lyric={lyricsData[counter] ? lyricsData[counter].lyric : "Loading..."} />
      <Emojis onEmojiClick={handleEmojiClick} emojis={['😍', '😭', '😂', '❤️', '👍', '👏']} />
      <SongOptions options={lyricsData[counter] ? lyricsData[counter].options : []} selectedOption={selectedOption} onOptionChange={handleOptionChange} />
      <div className="buttons mb-3">
        <button className="button btn btn-success btn-lg" onClick={checkGuess}>Go!</button>
        <button className="button btn btn-warning btn-lg" onClick={moveToNextQuestion}>Skip</button>
      </div>
      <div className="buttons mb-5">
        <button className="button btn btn-success btn-lg" onClick={moveToNextQuestion}>Next</button>
        <button className="button btn btn-secondary btn-lg" onClick={() => navigate("/score")}>End Game</button>
      </div>
      <AnswerDisplay answer={answer} />
      <SoundCloudPlayer soundCloudUrl={soundCloud} />
    </main>
  );
}

function PlayerInfo({ username }) {
  return (
    <div className="players">
      <div className="userPlayer mb-3">
        Player: <span id="playerUsername">{username}</span>
      </div>
    </div>
  );
}

function Lyrics({ lyric }) {
  return (
    <div className="lyrics">
      <p dangerouslySetInnerHTML={{ __html: lyric.replace(/\n/g, '<br />') }} />
    </div>
  );
}

function Emojis({ emojis, onEmojiClick }) {
  return (
    <div className="emojis mb-5">
      {emojis.map((emoji, index) => (
        <span key={index} className="emoji btn btn-outline-light btn-lg" onClick={() => onEmojiClick(emoji)}>
          {emoji}
        </span>
      ))}
    </div>
  );
}

function SongOptions({ options, selectedOption, onOptionChange }) {
  return (
    <div className="optionsContainer mb-5">
      {options.map((option, index) => (
        <label key={index}>
          <div className="radioContainer">
            <input
              type="radio"
              name="song"
              style={{ width: "20px", height: "20px" }}
              value={option}
              checked={selectedOption === option}
              onChange={onOptionChange}
            /> {option}
          </div>
        </label>
      ))}
    </div>
  );
}

function AnswerDisplay({ answer }) {
  return (
    <div className="answer text-center mt-5 mb-5">
      {answer}
    </div>
  );
}

function SoundCloudPlayer({ soundCloudUrl }) {
  console.log({soundCloudUrl})
  return (
    <div id="soundCloud">
      <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={soundCloudUrl}></iframe>
    </div>
  );
}