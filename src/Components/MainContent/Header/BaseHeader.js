import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

export default (props) => {
  const sendOobCode = async () => {
    const apiKey = "AIzaSyC63RCJ1tceQ2waUx_WkVZtJquTe8WKIYg"; // Replace 'YOUR_API_KEY' with your Firebase Web API Key
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

    const requestBody = {
      requestType: "VERIFY_EMAIL", // Setting the request type to verify email
      idToken: localStorage.getItem("idToken"), // Replace 'USER_ID_TOKEN' with the user's ID token
      // Additional parameters according to Firebase API documentation
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } else {
        const errorData = await response.json();
        console.error("Failed to send verification email:", errorData.error);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  function sendVerifyEmail() {
    sendOobCode();
  }
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
              <Col className="justify-content-center">
                <Button onClick={sendVerifyEmail}>Verify Email</Button>
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
