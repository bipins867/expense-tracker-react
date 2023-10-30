import { useState } from "react"
import DataContext from "./data-context"

export default props=>{

    const [isLoggedIn,setIsLoggedIn]=useState(false)

    const data={
        isLoggedIn:isLoggedIn,
        setIsLoggedIn,setIsLoggedIn
        
    }
    return <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
}