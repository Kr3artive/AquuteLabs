import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/Login/ForgotPassword";
import SignupOTP from "./pages/Signup/SignupOTP";
import ForgotPasswordOTP from "./pages/Login/ForgotPasswordOTP";
const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/forgot-password/otp' element={<ForgotPasswordOTP/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/signup/otp' element={<SignupOTP/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
