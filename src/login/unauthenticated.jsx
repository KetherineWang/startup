import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageDialog } from './messageDialog';
import './unauthenticated.css';

export function Unauthenticated(props) {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  // const [displaySignup, setDisplaySignup] = React.useState(true);

  // async function loginOrCreateEndpoint() {
  //   if (displaySignup) {
  //     loginOrCreate(`/api/auth/login`);
  //   } else {
  //     loginOrCreate(`/api/auth/create`);
  //   }
  // }

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
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
      <div className="welcome-text text-center mt-5 mb-3 text-white">
        <h1>Welcome</h1>
        <img alt="keshi logo" src="/images/KeshiLogo.png" className="img-fluid" />
      </div>

      <div className="login-box mt-5 mb-5">
        <div className="login-form mt-2 mb-2 text-white" style={{ width: '100%' }}>
          <div id="loginControls">
            <h2>Login to Play</h2>
    
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email</label>
              <input className="form-control" type="text" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your email" />
            </div> 
    
            <div className="mb-3">
              <label htmlFor="password" className="form-label" >Password</label>
              <input className="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>

            {/* <Button type="button" className="login-button" variant="secondary" onClick={() => loginOrCreateEndpoint()}>{displaySignup ? "Login":"Signup"}</Button> */}
            <button type="button" className="unauthenticated-button btn btn-secondary btn-lg" onClick={() => loginUser()}>Login</button>
        
            <p className="mt-2 mb-0" id="signup-prompt">
              Don't have an account? <br />
              {/* <a className="text-white" onClick={() => setDisplaySignup(!displaySignup)}>{displaySignup ? "Signup":"Login"}</a> */}
              <a className="text-white" onClick={() => navigate("/signup")}>Sign up</a>
            </p>
          </div>
        </div>
      </div>
    
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
