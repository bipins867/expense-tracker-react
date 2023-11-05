import { useEffect, useState } from "react";
import DataContext from "./data-context";
import { useDispatch } from "react-redux";
import { authAction } from ".";

export default (props) => {
  const [isExpenseFormEdit, setIsExpenseFormEdit] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    id: "",
    amount: "",
    description: "",
    category: "Food",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    if (idToken) {
      dispatch(authAction.login());
    }
  }, []);

  const data = {
    isExpenseFormEdit: isExpenseFormEdit,
    setIsExpenseFormEdit: setIsExpenseFormEdit,
    expenseDetails: expenseDetails,
    setExpenseDetails: setExpenseDetails,
  };
  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};
