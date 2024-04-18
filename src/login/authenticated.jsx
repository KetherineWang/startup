import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('Loading lyrics...');

  useEffect(() => {
    fetchRandomKeshiLyrics();
  }, []);

  function fetchRandomKeshiLyrics() {
    const keshiSongs = ["2 soon", "right here", "drunk", "blue", "ANGEL"]; // Define song titles array
    const randomIndex = Math.floor(Math.random() * keshiSongs.length);
    const randomSong = keshiSongs[randomIndex];

    const apiUrl = `https://api.lyrics.ovh/v1/keshi/${randomSong}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.lyrics) {
          setSong(`keshi - ${randomSong}`);
          setLyrics(data.lyrics.replace(/\n/g, '<br />'));
        } else {
          setLyrics("Lyrics not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        setLyrics("An error occurred while fetching the lyrics.");
      });
  }
  
  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        console.error("Error logging out:", error);
      })
      .finally(() => {
        const username = localStorage.getItem("username");
        localStorage.setItem(`${username}_score`, 0);

        localStorage.removeItem("username");

        props.onLogout();
      });
  }

  return (
    <>
      <div className="welcome-text text-center mt-5 mb-3 text-white">
        <h1>Welcome</h1>
        <img alt="keshi logo" src="/images/KeshiLogo.png" className="img-fluid" />
      </div>

      <div className="login-box mt-5">
        <div id="playControls">
          <div id='authenticatedPlayerUsername' className="mt-3">{props.username}</div>
          
          <button type="button" className="authenticated-button btn btn-light btn-lg" onClick={() => navigate('/play')}>Play</button>
          <button type="button" className="authenticated-button btn btn-secondary btn-lg" onClick={() => logout()}>Logout</button>
        </div>
      </div>

      <div className="apiLyrics mt-5 mb-3">
        <h2>Echoes of the Day</h2>
        <h3>{song}</h3>
        <p dangerouslySetInnerHTML={{ __html: lyrics }}></p>
      </div>
    </>
  );
}
