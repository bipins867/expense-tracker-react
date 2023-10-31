import { useContext, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import DataContext from "../../../../../store/data-context";
import { Container, Table } from "react-bootstrap";

export default (props) => {
  const dataContext = useContext(DataContext);
  useEffect(() => {
    fetch(
      "https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/expenses.json"
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

         const list=[]
          for(const x in result){
            list.push({ ...result[x] ,id:x});
          }
          dataContext.setExpenseList(list)
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const expenseList = dataContext.expenseList.map((item) => {
    return <ExpenseList key={Math.random().toString()} item={item} />;
  });

  return (
    <>
      <Container className="my-5">
        <Table striped hover>
          <thead>
            <tr>
              <th>Amount ($)</th>
              <th>Description</th>
              <th>Category</th>
              <th>#Edit</th>
              <th>#Delete</th>
            </tr>
          </thead>
          <tbody>{expenseList}</tbody>
        </Table>
      </Container>
    </>
  );
};
