import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

import './login.css';

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({email: username, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("username", username);
      localStorage.setItem(`${username}_score`, 0);
      
      props.onLogin(username);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div class="login-box mt-5">
        <div class="login-signup-form mt-2 mb-2 text-white" style="width: 100%">
          <div id="loginControls">
            <h2>Login</h2>
    
            <div class="mb-3">
              <label for="username" class="form-label">Email</label>
              <input class="form-control" type="text" id="username" placeholder="Enter your email" />
            </div>
    
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input class="form-control" type="password" id="password" placeholder="Enter your password" />
            </div>
    
            <Button type="button" class="login-button" variant="secondary" onClick={() => loginUser()}>Login</Button>
    
            <p class="mt-3" id="signup-prompt">
              Don't have an account?
              <a href="signup.html" class="text-white">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
