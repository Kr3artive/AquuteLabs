import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/Login/ForgotPassword";
const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
