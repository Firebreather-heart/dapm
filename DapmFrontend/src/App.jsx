import "./App.css";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import { UserContext } from "./context/AuthContext";
import { useState } from "react";
function App() {
  const [user, setUser] = useState(false)
  return (
    <div>
      <UserContext.Provider value={{setUser, user}} >
        {user ? <Home/> : <SignIn/> }
      </UserContext.Provider>
    </div>
  );
}

export default App;
