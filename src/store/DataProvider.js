import { useEffect, useState } from "react"
import DataContext from "./data-context"

export default props=>{
    
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [expenseList,setExpenseList]=useState([])

    useEffect(()=>{

        const idToken=localStorage.getItem('idToken')
        if(idToken){
            setIsLoggedIn(true)
        }
    },[])

    const data={
        isLoggedIn:isLoggedIn,
        setIsLoggedIn,setIsLoggedIn,
        expenseList:expenseList,
        setExpenseList:setExpenseList
        
    }
    return <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
}