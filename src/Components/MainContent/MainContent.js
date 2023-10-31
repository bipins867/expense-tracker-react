import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import { Container } from "react-bootstrap";
import BaseHeader from "./Header/BaseHeader";
import Welcome from "./Home/Welcome/Welcome";
import Profile from "./Home/Profile/Profile";

export default (props) => {
  
  return (
    <>
      <Container>
        <BaseHeader />
        <Switch>
          <Route path="/home" exact>
            <Welcome />
          </Route>
          <Route path="/home/profile" exact>
            <Profile />
          </Route>
          <Route path="/home/*" exact>
            <Redirect to='/home'/>
          </Route>
        </Switch>
      </Container>
    </>
  );
};
