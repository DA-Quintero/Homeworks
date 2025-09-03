import { Routes, Route} from "react-router-dom";
import { useState } from "react";
import { MyContext } from "./Context.js";
import { Login } from "./Login.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { UserProfile } from "./UserProfile.js";
import { NotFound } from "./NotFound.js";

export const App =() => {
  const [user, setUser] = useState ();

  return (
    <MyContext.Provider value ={{user, setUser}}>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/*" element={<NotFound />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/UserProfile" element={<UserProfile />}/>
        </Route>
      </Routes>
    </MyContext.Provider>
    
  )
}