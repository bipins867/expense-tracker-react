import { Container } from "react-bootstrap";

import SignUp from "./Authentication/SignUp/SignUp";
import Login from "./Authentication/Login/Login";
import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./MainContent/Home/home";
import { useContext } from "react";
import DataContext from "../store/data-context";
export default (props) => {
  const dataContext = useContext(DataContext);
  return (
    <>
      <Switch>
        {!dataContext.isLoggedIn && (
          <>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </>
        )}
        {dataContext.isLoggedIn && (
          <>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
};
