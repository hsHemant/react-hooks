import React, { useContext } from "react";

import Card from "./UI/Card";
import "./Auth.css";

import { AuthContext } from "../context/auth-contex";

const Auth = props => {
  const authContextHandler = useContext(AuthContext);

  const loginHandler = () => {
    authContextHandler.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
