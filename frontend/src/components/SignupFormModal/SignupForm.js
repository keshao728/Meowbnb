import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
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
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="full-signup-form">

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className="error-handling" key={idx}>{error}</li>)}
        </ul>
        <div className="signup-full-form">
          <h3 className="welcome-message">Welcome to Meowbnb</h3>
          <div className="input-parent" id="input-parent-id">
            <label>
              <input
                placeholder="First Name"
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder="Last Name"
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder="Email"
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder="Username"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder="Password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                placeholder="Confirm Password"
                type="password"
                className="input password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="button-signup" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
