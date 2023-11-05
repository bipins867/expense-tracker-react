import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./ExpenseForm.css";
import DataContext from "../../../../../store/data-context";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../../../../store";

export default (props) => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dataContext = useContext(DataContext);
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);

  function onAmountChange(event) {
    dataContext.setExpenseDetails((prevState) => {
      const newObj = { ...prevState };
      newObj.amount = event.target.value;
      return newObj;
    });
  }
  function onDescriptionChange(event) {
    dataContext.setExpenseDetails((prevState) => {
      const newObj = { ...prevState };
      newObj.description = event.target.value;
      return newObj;
    });
  }
  function onCategoryChange(event) {
    dataContext.setExpenseDetails((prevState) => {
      const newObj = { ...prevState };
      newObj.category = event.target.value;
      return newObj;
    });
  }

  async function addExpense2Firebase(obj) {
    try {
      const email = localStorage.getItem("email");

      const response = await fetch(
        `https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const result = await response.json();

      if (result.error) {
        const data = result;
        let errorMessage = "Somthing went wrong";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      } else {
        //alert("Login Successfull");

        return result.name;
      }
    } catch (err) {
      alert(err);
    }
  }
  async function updateExpense2Firebase(obj, id) {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(
        `https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const result = await response.json();

      if (result.error) {
        const data = result;
        let errorMessage = "Somthing went wrong";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      } else {
        //alert("Login Successfull");
        dataContext.setIsExpenseFormEdit(false);
        return result.name;
      }
    } catch (err) {
      alert(err);
    }
  }

  const categories = [
    "Food",
    "Petrol",
    "Salary",
    "Groceries",
    "Transport",
    "Entertainment",
    "Others",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    let idObj;
    const expenseObj = dataContext.expenseDetails;
    if (dataContext.isExpenseFormEdit) {
      idObj = await updateExpense2Firebase(obj, expenseObj.id);
      amountRef.current.value = expenseObj.amount;
      descriptionRef.current.value = expenseObj.description;
      categoryRef.current.value = expenseObj.categories;
    } else {
      idObj = await addExpense2Firebase(obj);
    }

    dispatch(expenseAction.addExpense({ ...obj, id: idObj }));
    const blankObj = {
      id: "",
      amount: "",
      description: "",
      category: "Food",
    };
    dataContext.setExpenseDetails(blankObj);
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
              onChange={onAmountChange}
              value={dataContext.expenseDetails.amount}
              required
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
              value={dataContext.expenseDetails.description}
              onChange={onDescriptionChange}
              required
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
              onChange={onCategoryChange}
              value={dataContext.expenseDetails.category}
              required
            >
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>

        <Container className="text-center">
          <Container>
            <Button variant="primary" type="submit">
              {dataContext.isExpenseFormEdit ? "Update Expense" : "Add Expense"}
            </Button>
          </Container>
          {isPremium && (
            <Container className="mt-2">
              <Button variant="success">Activate Premium</Button>
            </Container>
          )}
        </Container>
      </Form>
    </Container>
  );
};
