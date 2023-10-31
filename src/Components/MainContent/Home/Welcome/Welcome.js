import { useContext } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";

import { Container} from "react-bootstrap";
import Expenses from "./ExpenseList/Expenses";

export default (props) => {
  
  return (
    <>
      <ExpenseForm />
      
      <Expenses/>
    </>
  );
};
