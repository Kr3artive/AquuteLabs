import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RegistrationOTP from "./pages/Signup/RegistrationOTP";
const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/signup/otp' element={<RegistrationOTP/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
