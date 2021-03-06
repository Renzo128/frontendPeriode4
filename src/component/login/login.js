import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config-firebase";

const Login = () => {
  let history = useNavigate();
  const [getLoginPassword, setGetLoginPassword] = useState("");
  const [getLoginEmail, setGetLoginEmail] = useState("");

  const logUserIn = async (e) => {
    // gebruiker inloggen
    e.preventDefault();
    try {
      const createdUser = await signInWithEmailAndPassword(
        auth,
        getLoginEmail,
        getLoginPassword
      );

      history("/chat", {
        state: { email: getLoginEmail, id: createdUser.user.uid },
      });
    } catch (error) {}
  };

  return (
    <div className="container-fluid">
      <form>
        <div className="mt-5"></div>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">Login</div>
        </div>
        <div className="mt-3"></div>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">Email</div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              id="loginEmail"
              onChange={(event) => setGetLoginEmail(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">Wachtwoord</div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              onChange={(event) => setGetLoginPassword(event.target.value)}
            ></input>
          </div>
        </div>
        <br />
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 text-center">
            <button className="btn btn-secondary" onClick={logUserIn}>
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
          <Link to="/register">Registeren</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
