import "./App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Form from "./Pages/Form";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import RecordTrack from "./Pages/RecordTrack";
import BookSlot from "./Pages/BookSlot";
import axios from "axios";
import { UserContext } from "./context/userContext";

axios.defaults.withCredentials = true;
function App() {

  return (
    <div className="App">
      <UserContext>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Form />} />
          <Route exact path="/" element={<Home />} />
          <Route  path="/admin" element={<Admin />} />
          <Route  path="/admin/login" element={<AdminLogin />} />
          <Route  path="/admin/track" element={<RecordTrack />} />
          <Route  path="/admin/BookSlot" element={<BookSlot />} />
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;
