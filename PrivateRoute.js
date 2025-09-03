import { useContext } from "react";
import { MyContext } from "./Context.js";


export const PrivateRoute =( {children} ) =>{
    const { user} = useContext(MyContext);
    console.log(children)
    return user ? children : <>Error 404</>
}