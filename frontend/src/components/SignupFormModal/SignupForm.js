import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm({ setShowModal }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
          // console.log("THIS IS ERRORS", errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="full-signup-form">
      <div className="login-title-wrap">
        <div className="login-title">
          <div className="login-close" onClick={closeModal}>x</div>
          <div className="login-title-item"> Sign Up </div>
          <div></div>
        </div>
      </div>

      <form className="signup-form-mother" onSubmit={handleSubmit}>
        <h3 className="welcome-message">Welcome to Meowbnb!</h3>
        <ul className="error-mother">
          {errors?.map((error, idx) =>
            <li className="error-handling" key={idx}>{error}</li>)}
        </ul>
        <div className="signup-form-wrapper">
          <div className="login-input-parent" id="input-parent-id">
            <div className="signup-input-box">
              <input
                type="text"
                className="signup-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label>First Name</label>
            </div>
            <div className="signup-input-box">
              <input
                type="text"
                className="signup-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label>Last Name</label>
            </div>
            <div className="signup-input-box">
              <input
                type="text"
                className="signup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className="signup-input-box">
              <input
                type="text"
                className="signup-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Username</label>
            </div>
            <div className="signup-input-box">
              <input
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <div className="signup-input-box password">
              <input
                type="password"
                className="signup-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
            </div>
          </div>
          <button className="button-signup" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
