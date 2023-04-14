import { Routes,Route } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Users/>}></Route>
          <Route path="/user/:id" element={<UserDetails/>}></Route>
        </Routes>
  </div>
    )
}

export default App;
