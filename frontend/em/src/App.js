import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ExpenseDetail from "./pages/ExpenseDetail";
import ManageCat from "./pages/ManageCat";
import BillView from "./pages/BillView";
import Referral from "./pages/Referral";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navabar from "./globalcomponent/Navabar";
function App() {
  return (
    <Router>
      <Navabar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/expense/:id" element={<ExpenseDetail />} />

        <Route path="/bill/:id" element={<BillView />} />

        <Route path="/category" element={<ManageCat />} />

        <Route path="/referral" element={<Referral />} />
      </Routes>
    </Router>
  );
}

export default App;
