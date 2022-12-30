// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        // console.log("THIS IS DATA", data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      }
      );
  };

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="full-login-form">
      <div className="login-title-wrap">
        <div className="login-title">
          <div className="login-close" onClick={closeModal}>x</div>
          <div className="login-title-item"> Log In </div>
          <div></div>
        </div>
      </div>
      <form className="login-form-wrapper-parent" onSubmit={handleSubmit}>
        <h3 className="welcome-message">Welcome to Meowbnb!</h3>
        <ul className="login-error-validation">
          {errors?.map((error, idx) => (
            <li key={idx} className="error-handling">
              {error}
            </li>
          ))}
        </ul>

        <div className='login-form-wrapper'>
          <div className="login-input-parent">
            <div className="login-input-box">
              <input
                className="login-input"
                // placeholder='Username or Email'
                type="text"
                name="email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
              <label htmlFor="email">Username or Email</label>
            </div>
            <div className="login-input-box password">
              <input
                className="login-input"
                // placeholder='Password'
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="button-login" type="submit">Log In</button>
        </div>
        <div className="demo-user">
          <div className="demo-or">or</div>
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
