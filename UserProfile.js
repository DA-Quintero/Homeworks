import { useContext } from "react";
import { MyContext } from "./Context.js"

export const UserProfile = () => {
    const {user} = useContext(MyContext);
    return <h3>Usuario Logueado: {user} </h3>
}