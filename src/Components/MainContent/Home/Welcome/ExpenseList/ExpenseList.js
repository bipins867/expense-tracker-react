import { useContext } from "react";
import { Button } from "react-bootstrap";
import DataContext from "../../../../../store/data-context";

export default (props) => {
  const item = props.item;
  const id = item.id;
  const dataContext = useContext(DataContext);

  function deleteExpenseHandler(event) {
    fetch(
      `https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dataContext.setExpenseList((prevState) => {
      const newObj = prevState.filter((item) => item.id != id);

      return newObj;
    });
  }

  function editExpenseHandler(event) {
    dataContext.setExpenseDetails({
      ...item,
    });
    dataContext.setIsExpenseFormEdit(true);
    dataContext.setExpenseList((prevState) => {
      const newObj = prevState.filter((item) => item.id != id);

      return newObj;
    });
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
