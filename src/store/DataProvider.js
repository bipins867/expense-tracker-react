import { useEffect, useState } from "react"
import DataContext from "./data-context"

export default props=>{
    
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [expenseList,setExpenseList]=useState([])
    const [isExpenseFormEdit,setIsExpenseFormEdit]=useState(false)
    const [expenseDetails,setExpenseDetails]=useState({id:'',amount:'',description:'',category:'Food'})

    useEffect(()=>{

        const idToken=localStorage.getItem('idToken')
        if(idToken){
            setIsLoggedIn(true)
        }
    },[])

    const data = {
      isLoggedIn: isLoggedIn,
      setIsLoggedIn,
      setIsLoggedIn,
      expenseList: expenseList,
      setExpenseList: setExpenseList,
      isExpenseFormEdit: isExpenseFormEdit,
      setIsExpenseFormEdit: setIsExpenseFormEdit,
      expenseDetails: expenseDetails,
      setExpenseDetails: setExpenseDetails,
    };
    return <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
}