// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="full-login-form">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='form-input'>

          <h3 className="welcome-message">Welcome to Meowbnb</h3>
          <div className="input-parent">

            <label>
              <input
                className="input"
                placeholder='Username or Email'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                className="input"
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="button-login" type="submit">Log In</button>
        </div>
        <div className="demo-user">
          <button className="demo-user-button"
            type="submit"
            onClick={() => {
              setCredential("Cat-boss")
              setPassword("password2")
            }}>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
