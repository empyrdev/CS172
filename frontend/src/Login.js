import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loginUser } from "./APIFunctions";

function Login(props) {
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["name"]);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  });
  const [invalid, setInvalid] = useState(false);

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!’*+/=?^_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  //for special character
  //^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
  const passwordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

  const formValid = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    Object.values(errors).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };

  async function loginCheck() {
    let loginInfo = loginUser({
      email: email,
      password: password
    });

    return loginInfo;
  }

  const handleSubmit = async e => {
    // prevent the form from submit before validate
    e.preventDefault();

    // if everything is correct on the form
    if (formValid(formErrors)) {
      let loginInfo = await loginCheck();
      if (loginInfo.sessionID && loginInfo.sessionID.length > 0) {
        setCookie("accountID", loginInfo.accountID, { path: "/" });
        setCookie("sessionID", loginInfo.sessionID, { path: "/" });
        setInvalid(false);
        props.setAuthenticated(true);
        props.history.push("/");
      } else {
        setInvalid(true);
      }
    } else {
      alert("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  const handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormErrors(formErrors);

    switch (name) {
    case "email":
      setInvalid(false);
      formErrors.email = 
        emailRegex.test(value) ? "" : "invalid email address";
      setEmail(value);
      break;
    case "password":
      setInvalid(false);
      formErrors.password = passwordRegex.test(value) ? ""
        : "minimum 8 characaters required and it must contain an uppercase" +
        "letter and a number";
      setPassword(value);
      break;
    default:
      break;
    }

    setFormErrors(formErrors);
  };



  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Login Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Email"
              type="email"
              name="email"
              noValidate
              onChange={handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              className={formErrors.password.length > 0 ? "error" : null}
              placeholder="Password"
              type="password"
              name="password"
              noValidate
              onChange={handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div className="createAccount">
            <button type="submit">Login Account</button>
            <Link to="register">
              <small>Don't Have An Account Yet?</small>
            </Link>
          </div>
          <div className="warningMessage">
            <p>{invalid ? "Invalid Username/Password!!" : ""}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;