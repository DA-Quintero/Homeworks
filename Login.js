import { useNavigate } from "react-router-dom"
import { MyContext } from "./Context";
import { useContext } from "react";
export const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(MyContext);

    const handleLogin = () =>{
        setUser("Pedro")
        navigate("/UserProfile", {
            replace: true
        })
    }
    return (
        <div>
            <h1><center>Login</center></h1>
            <h2><center>Usuario</center></h2>
            <h2><center>Contraseña</center></h2>
            <center><button onClick={handleLogin}>Iniciar Sesión</button></center>
        </div>
    )
}