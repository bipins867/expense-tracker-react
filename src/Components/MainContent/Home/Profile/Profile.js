import { useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default (props) => {
  const fullNameRef = useRef();
  const profileUrlRef = useRef();

  function formSubmitHandler(event) {
    event.preventDefault();

    const obj = {
      displayName: fullNameRef.current.value,
      photoUrl: profileUrlRef.current.value,
      idToken:localStorage.getItem('idToken')
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC63RCJ1tceQ2waUx_WkVZtJquTe8WKIYg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...obj,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          const data = result;
          let errorMessage = "Authentication failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>Contact Details</Col>
          <Col>
            <Link to="/home">Cancel</Link>
          </Col>
        </Row>

        <Form onSubmit={formSubmitHandler}>
          <Row>
            <Col>
              <FloatingLabel label="Full Name:" className="mb-2 input-width">
                <FormControl
                  ref={fullNameRef}
                  size="sm"
                  type="text"
                  placeholder="Enter your full Name"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                label="Profile photo url:"
                className="mb-2 input-width"
              >
                <FormControl
                  ref={profileUrlRef}
                  size="sm"
                  type="text"
                  placeholder="Profile Photo URL"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Button type="submit">Update</Button>
        </Form>
      </Container>
    </>
  );
};
