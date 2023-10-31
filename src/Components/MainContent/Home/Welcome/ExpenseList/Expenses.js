import { useContext } from "react";
import ExpenseList from "./ExpenseList";
import DataContext from "../../../../../store/data-context";
import { Container, Table } from "react-bootstrap";

export default (props) => {
  const dataContext = useContext(DataContext);

  const expenseList = dataContext.expenseList.map((item) => {
    return <ExpenseList key={Math.random().toString()} item={item} />;
  });

  return (
    <>
      <Container className="my-5">
        <Table striped  hover>
          <thead>
            <tr>
              <th>Amount ($)</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenseList}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
