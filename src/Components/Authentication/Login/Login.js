import { Button, Container, FloatingLabel, Form, FormControl, NavLink } from "react-bootstrap";

import "./Login.css";
import {  useContext, useRef } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DataContext from "../../../store/data-context";

export default (props) => {
  const passwordRef = useRef();
  const emailRef = useRef();

   const dataContext=useContext(DataContext)
   
   
  function formSubmitHandler(event){
    event.preventDefault();

    const email=emailRef.current.value;
    const password=passwordRef.current.value;
   
    
    
    
    const obj={
      email:email,
      password:password,
      
    }

     fetch(
       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC63RCJ1tceQ2waUx_WkVZtJquTe8WKIYg",
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
           //alert("Login Successfull");
          
           dataContext.setIsLoggedIn(true)
           localStorage.setItem('idToken',result.idToken)
         }
       })
       .catch((err) => {
         alert(err);
       });
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
                placeholder="Enter your name" required
              />
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-2 input-width">
              <FormControl
                ref={passwordRef}
                size="sm"
                type="password"
                placeholder="Enter your password" required
              />
            </FloatingLabel>{" "}
            
            
            <Button type="submit" className="input-width my-2">
              Login
            </Button><br/>
            <a href="#">Forgot Password</a>

          </Form>
          <hr/>
          <Link to="/signUp" className="btn login-btn">Don't have an account? Sign Up</Link >
        </center>
      </Container>
    </>
  );
};
