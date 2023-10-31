import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  NavLink,
} from "react-bootstrap";

import "./SignUp.css";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default (props) => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const confPassRef = useRef();
  const history = useHistory();

  function formSubmitHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confPassword = confPassRef.current.value;

    if (confPassword !== password) {
      alert("Password don't match !");
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC63RCJ1tceQ2waUx_WkVZtJquTe8WKIYg",
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
          alert("SignUp Successfull");
          history.push("/login");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Container className="mt-5 shadow p-2 text-center container-style">
        <h2 className="pt-2 h1 fw-bold py-2">SignUp</h2>
        <hr />
        <center>
          <Form onSubmit={formSubmitHandler}>
            <FloatingLabel label="Email Address" className="mb-2 input-width">
              <FormControl
                ref={emailRef}
                size="sm"
                type="email"
                placeholder="Enter your name"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-2 input-width">
              <FormControl
                ref={passwordRef}
                size="sm"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FloatingLabel>{" "}
            <FloatingLabel
              label="Confirm Password"
              className="mb-2 input-width"
            >
              <FormControl
                ref={confPassRef}
                size="sm"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FloatingLabel>
            <Button type="submit" className="input-width">
              Sign Up
            </Button>
          </Form>
          <hr />
          <Link to="/login" className="btn login-btn">
            Have an account? Login
          </Link>
        </center>
      </Container>
    </>
  );
};
