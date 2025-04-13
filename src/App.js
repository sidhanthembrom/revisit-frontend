import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../src/components/Loginpage/Loginpage";
import Signup from "../src/components/Signup/Signup";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Notfound from "../src/components/Notfound/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/newAccount" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
