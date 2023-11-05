import { useContext, useDebugValue } from "react";
import { Button } from "react-bootstrap";
import DataContext from "../../../../../store/data-context";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../../../../store";

export default (props) => {
  const item = props.item;
  const id = item.id;
  const dataContext = useContext(DataContext);
  const expenseList = useSelector((state) => state.expense.data);

  const dispatch = useDispatch();

  function deleteExpenseHandler(event) {
    const email = localStorage.getItem("email");
    fetch(
      `https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    const newObj = expenseList.filter((item) => item.id != id);
    dispatch(expenseAction.setExpense(newObj));
  }

  function editExpenseHandler(event) {
    dataContext.setExpenseDetails({
      ...item,
    });
    dataContext.setIsExpenseFormEdit(true);
    const newObj = expenseList.filter((item) => item.id != id);
    dispatch(expenseAction.setExpense(newObj));
  }

  return (
    <>
      <tr>
        <td>{item.amount}</td>
        <td>{item.description}</td>
        <td>{item.category}</td>
        <td>
          <Button onClick={editExpenseHandler}>Edit</Button>
        </td>
        <td>
          <Button onClick={deleteExpenseHandler}>Delete</Button>
        </td>
      </tr>
    </>
  );
};
