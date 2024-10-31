import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "../src/pages/Register.jsx";
import Login from "../src/pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Course from "./pages/Course.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:uni/:course" element={<Course />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
