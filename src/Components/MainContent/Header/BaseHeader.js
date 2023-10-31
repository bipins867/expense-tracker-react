import { Container, Row, Col } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

export default (props) => {
  return (
    <>
      <Container className="mb-5">
        <Switch>
          <Route path="/home" exact>
            <Row>
              <Col>
                <h1 className="h5 fst-italic text-muted">
                  Welecome to expense tracker
                </h1>
              </Col>
              <Col className="text-end">
                Your profile is incomplete.
                <Link to="/home/profile">Complete Now</Link>
              </Col>
            </Row>
          </Route>
          <Route path="/home/profile" exact>
            <Row>
              <Col>
                <h1 className="h5 fst-italic text-muted">
                  Winners never quite,Quiters never win.
                </h1>
              </Col>
              <Col className="text-end">Your Profile is 64% completed.</Col>
            </Row>
          </Route>
        </Switch>
      </Container>
    </>
  );
};
