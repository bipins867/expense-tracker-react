import { useEffect } from "react";
import ExpenseList from "./ExpenseList";

import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authAction, expenseAction } from "../../../../../store";

export default (props) => {
  const dispatch = useDispatch();
  const expenseListData=useSelector(state=>state.expense.data)
  
  useEffect(()=>{

    let sum=0

    for(const x of expenseListData){
      sum=sum+parseFloat(x.amount)
    }
    if(sum>10000){
      
      dispatch(authAction.setPremiumState(true))
    }
    else{
     dispatch(authAction.setPremiumState(false))
      
    }
  },[expenseListData])

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(
      `https://expense-tracker-react-77fb5-default-rtdb.firebaseio.com/${email}.json`
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result) {
          return;
        }
        if (result.error) {
          const data = result;
          let errorMessage = "Somthing went wrong";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        } else {
          //alert("Login Successfull");

          const list = [];
        
          for (const x in result) {
            list.push({ ...result[x], id: x });
          
          }
          
         
          //dataContext.setExpenseList(list)
          dispatch(expenseAction.setExpense(list));
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const expenseList = useSelector((state) => state.expense.data).map((item) => {
    return <ExpenseList key={Math.random().toString()} item={item} />;
  });
  const theme=useSelector(state=>state.theme)
  return (
    <>
      <Container className="my-5">
        <Table style={{color:theme.text,backgroundColor:theme.body}}>
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
