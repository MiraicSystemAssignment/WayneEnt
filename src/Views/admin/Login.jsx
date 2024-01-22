import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";
const Login = () => {
  const [username, setUsername] = useState('testLogin');
  const [password, setPassword] = useState('testtest1');
  const navigate = useNavigate();

  const submitForm = () => {
     // authentication logic with hardcoded username and password
     const hardcodedUsername = 'testLogin';
     const hardcodedPassword = 'testtest1';
 
     if (username === hardcodedUsername && password === hardcodedPassword) {
            navigate('/home', { replace: true });
     } else {
       alert('Invalid username or password');
     }
    
    //console.log('Username:', username);
    //console.log('Password:', password);
  };

  return (
    <div className='body'>
      <div className="auth-container">
      <img src="/bat_black.png" alt="Company Logo" className="company-logo" />
      <h2 className="heading">Login </h2>
      <form onSubmit={submitForm}>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            className='input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input 
            className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
