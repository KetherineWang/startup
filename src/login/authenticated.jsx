import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './login.css';
import './authenticated.css';

export function Authenticated(props) {
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
    <div class="login-box mt-5">
      <div id="playControls">
        <div className='playerName'>{props.userName}</div>
        
        <Button variant='light' onClick={() => useNavigate('/play')}>
          Continue to Play
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
