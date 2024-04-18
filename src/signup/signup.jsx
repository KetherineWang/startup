import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageDialog } from './messageDialog';
import './signup.css';

export function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

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
    })
    .then(async response => {
        if (response?.status === 200) {
            console.log("Player created successfully", response)

            navigate("/");
          } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
          }
    })
  }

  return (
    <main className="signup">
      <div className="welcome-text text-center mt-5 mb-3 text-white">
        <h1>Welcome</h1>
        <img alt="keshi logo" src="/images/KeshiLogo.png" className="img-fluid" />
      </div>

      <div className="signup-box mt-5">
        <div className="signup-form mt-2 mb-2 text-white" style={{ width: '100%' }}>
          <div id="signupControls">
            <h2>Signup</h2>
    
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email</label>
              <input className="form-control" type="text" id="newUsername" onChange={(e) => setUsername(e.target.value)} placeholder="Enter an email address" />
            </div>
    
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input className="form-control" type="password" id="newPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Create a new password" />
            </div>
    
            <button type="button" className="signup-button btn btn-secondary" onClick={() => createUser()}>Register</button>
          </div>
        </div>
      </div>
    
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
