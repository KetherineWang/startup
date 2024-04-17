import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

import './login.css';

export function Unauthenticated(props) {
  console.log("Entered Unauthenticated component.");

  const navigate = useNavigate();

  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [displaySignup, setDisplaySignup] = React.useState(true);

  async function loginOrCreateEndpoint() {
    if (displaySignup) {
      loginOrCreate(`/api/auth/login`);
    } else {
      loginOrCreate(`/api/auth/create`);
    }
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

  console.log(password)

  return (
    <>
      <div className="login-box mt-5">
        <div className="login-signup-form mt-2 mb-2 text-white" style={{width: '100%'}}>
          <div id="loginControls">
            <h2>Login</h2>
    
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email</label>
              <input className="form-control" type="text" id="username" onChange={(e) => setUsername(e.target.value)}
 placeholder="Enter your email" />
            </div>
    
            <div className="mb-3">
              <label htmlFor="password" className="form-label" >Password</label>
              <input className="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>

            <Button type="button" className="login-button" variant="secondary" onClick={() => loginOrCreateEndpoint()}>{displaySignup ? "Login":"Signup"}</Button>
        
            <p className="mt-3" id="signup-prompt">
              Don't have an account?
              <a className="text-white" onClick={() => setDisplaySignup(!displaySignup)}>{displaySignup ? "Signup":"Login"}</a>
            </p>
          </div>
        </div>
      </div>
    
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
