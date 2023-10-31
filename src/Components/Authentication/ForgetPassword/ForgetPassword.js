import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  NavLink,
} from "react-bootstrap";

import "./ForgetPassword.css";
import { useContext, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DataContext from "../../../store/data-context";

export default (props) => {
  const emailRef = useRef();
  const [requestStatus, setRequestStatus] = useState("");

  const dataContext = useContext(DataContext);
  const sendOobCode = async (email) => {
    setRequestStatus("Request Sending ...");
    const apiKey = "AIzaSyC63RCJ1tceQ2waUx_WkVZtJquTe8WKIYg"; // Replace 'YOUR_API_KEY' with your Firebase Web API Key
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

    const requestBody = {
      requestType: "PASSWORD_RESET", // Example: Change this according to your use case
      email: email, // Example: Set the email for which you want to send the OOB code
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
        // Request successful
        setRequestStatus("Password Reset Link Send");
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } else {
        // Handle errors
        const errorData = await response.json();
        setRequestStatus("Failed to send OOB code:", errorData.error);
      }
    } catch (error) {
      setRequestStatus("Error sending OOB code:", error);
    }
  };

  function formSubmitHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;

    sendOobCode(email);
  }

  return (
    <>
      <Container className="mt-5 shadow p-2 text-center container-style">
        <h2 className="pt-2 h1 fw-bold py-2">Login</h2>
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

            <Button type="submit" className="input-width my-2">
              Send Link
            </Button>
            <br />
            {requestStatus}
          </Form>
          <hr />
          <Link to="/login">Login</Link>
        </center>
      </Container>
    </>
  );
};
