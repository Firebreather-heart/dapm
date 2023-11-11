import "./App.css";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import { UserContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("isLoggedIn", user)
  },[user])

  useEffect(() => {
    const data = window.localStorage.getItem("isLoggedIn")
   if (data !== null)  setUser(data)
  },[])

  return (
    <div>
      <UserContext.Provider value={{setUser, user}} >
        {user ? <Home/> : <SignIn/> }
      </UserContext.Provider>
    </div>
  );
}

export default App;
