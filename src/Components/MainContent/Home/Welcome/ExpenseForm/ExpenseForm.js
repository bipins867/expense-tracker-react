import React, { useContext, useRef } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./ExpenseForm.css";
import DataContext from "../../../../../store/data-context";

export default (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  function addExpense2Firebase(obj) {
    fetch(
      "https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          const data = result;
          let errorMessage = "Somthing went wrong";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        } else {
          //alert("Login Successfull");

          console.log(result);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  const dataContext = useContext(DataContext);
  const categories = [
    "Food",
    "Petrol",
    "Salary",
    "Groceries",
    "Transport",
    "Entertainment",
    "Others",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    dataContext.setExpenseList((prevState) => {
      const newObj = [...prevState];
      const obj = {
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
      newObj.push(obj);
      
      addExpense2Firebase(obj)
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "Food";
      return newObj;
    });

    
  };

  return (
    <Container className="form-container p-2 shadow rounded-2">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="col-3">
            <Form.Label>Money Spent</Form.Label>
          </Col>

          <Col className="col-9 ">
            <Form.Control
              type="number"
              name="moneySpent"
              placeholder="Enter amount"
              className="input-width"
              ref={amountRef}
            />
          </Col>
        </Row>

        <Row className="my-4">
          <Col className="col-3">
            <Form.Label>Description</Form.Label>
          </Col>

          <Col className="col-9">
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              className="input-width"
              ref={descriptionRef}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="col-3">
            <Form.Label>Category</Form.Label>
          </Col>

          <Col className="col-9">
            <Form.Control
              as="select"
              ref={categoryRef}
              name="category"
              className="input-width"
            >
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>

        <Container className="text-center">
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Container>
      </Form>
    </Container>
  );
};
