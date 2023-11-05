import { Container } from "react-bootstrap";

import SignUp from "./Authentication/SignUp/SignUp";

import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";

import { useContext } from "react";
import DataContext from "../store/data-context";
import MainContent from "./MainContent/MainContent";
import ForgetPassword from "./Authentication/ForgetPassword/ForgetPassword";
import Login from "./Authentication/Login/Login";
import { useSelector } from "react-redux";
export default (props) => {
  //const dataContext = useContext(DataContext);
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
  return (
    <>
      <Switch>
        {!isLoggedIn && (
          <>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/forgetPassword">
              <ForgetPassword/>
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </>
        )}
        {isLoggedIn && (
          <>
            <Route to="/home">
              <MainContent />
            </Route>
            
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="*" exact>
              <Redirect to="/home" />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
};
