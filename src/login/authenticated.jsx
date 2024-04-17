import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './login.css';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();
  
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
    <div className="login-box mt-5">
      <div id="playControls">
        <div className='playerName'>{props.username}</div>
        
        <Button variant='light' onClick={() => navigate('/play')}>
          Continue to Play
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
