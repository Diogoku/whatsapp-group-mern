import React from "react";

// REACT-REDUX
import { useDispatch } from "react-redux";
import { setUser } from "./actions/userActionCreators";

// FIREBASE
import { auth, provider } from "./firebase";

// MATERIAL-UI
import { Button } from "@material-ui/core";

// CSS
import "./css/login.css";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => dispatch(setUser(result.user)))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1-1.png"
          alt="Whatsapp Logo"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
