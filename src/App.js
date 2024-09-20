import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RegisterTeacher from "./pages/register/RegisterTeacher.jsx";
import RegisterStudent from "./pages/register/RegisterStudent.jsx";
import LoginTeacher from "./pages/login/LoginTeacher.jsx";
import LoginStudent from "./pages/login/LoginStudent.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/t" element={<RegisterTeacher />} />
          <Route path="/register/s" element={<RegisterStudent />} />
          <Route path="/login/t" element={<LoginTeacher />} />
          <Route path="/login/s" element={<LoginStudent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
