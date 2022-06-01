import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config-firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Register = () => {

  let history = useNavigate(); 
  const [getRegisterEmail, setGetRegisterEmail] = useState("");
  const [getRegisterPassword, setGetRegisterPassword] = useState("");
  const [getusername, setusername] = useState("");

  const registerUser = async (e) => { // gebruiker registreren in firebase
    e.preventDefault();
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        getRegisterEmail,
        getRegisterPassword
      );
      const userdata = {
        email: createdUser.user.email,
        lastSeen: serverTimestamp(),
        displayName: getusername,
      };
      await setDoc(doc(db, "users", createdUser.user.uid), userdata);
      history("/chat", {
        state: { email: getRegisterEmail, id: createdUser.user.uid },
      });
    } catch (error) {}
  };



  return (
    <div className="container-fluid">
      <form>
        <div className="mt-5"></div>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">Registeren</div>
        </div>
        <div className="mt-3"></div>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">Gebruikersnaam</div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              min={0}
              onChange={(event) => setusername(event.target.value)}
            ></input>
          </div>
        </div>


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
              id="registerEmail"
              min={0}
              onChange={(event) => setGetRegisterEmail(event.target.value)}
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
              min={0}
              onChange={(event) => setGetRegisterPassword(event.target.value)}
            ></input>
          </div>
        </div>
        <br />
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 text-center">
            <button className="btn btn-secondary" onClick={registerUser}>
              Registreren
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
