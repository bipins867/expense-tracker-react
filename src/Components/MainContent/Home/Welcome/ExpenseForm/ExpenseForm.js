import React, {  useContext, useRef } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./ExpenseForm.css";
import DataContext from "../../../../../store/data-context";

export default (props) => {

    const amountRef=useRef()
    const descriptionRef=useRef()
    const categoryRef=useRef()

    const dataContext=useContext(DataContext)
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
    

    dataContext.setExpenseList(prevState=>{

        const newObj=[...prevState]
        const obj={
            amount:amountRef.current.value,
            description:descriptionRef.current.value,
            category:categoryRef.current.value
        }
        newObj.push(obj)

        return newObj;
    })

    amountRef.current.value=''
    descriptionRef.current.value=''
    categoryRef.current.value='Food'
    
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
            <Form.Control as="select" ref={categoryRef} name="category" className="input-width">
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
