import {Routes, Route , useLocation} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Goals/Goals";
import Expenses from "./pages/Expenses/Expenses";
import BottomNav from "./components/BottomNav";
export default function App() {
  const location = useLocation();

  const getActiveTab = () =>{
    if (location.pathname.startsWith("/goals")) return "goals";
    else if (location.pathname.startsWith("/expenses")) return "expenses";
    else return "dashboard";
  };
  return(
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/goals" element={<Goals/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
      </Routes>
      <BottomNav active={getActiveTab()} />
    </>
  );
}
