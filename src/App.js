import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";

import { AuthContext } from "./context/auth-contex";

const App = props => {
  const authContextHandler = useContext(AuthContext);

  let content = <Auth />;
  if (authContextHandler.isAuth) content = <Ingredients />;

  return content;
};

export default App;
