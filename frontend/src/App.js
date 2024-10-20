import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Navbar from './components/Navbar';
import CreateRule from './pages/CreateRule';
import GetAllRules from './pages/GetAllRules';
import EvaluateRule from './pages/EvaluateRule';
import CombineRules from './pages/CombineRules';
import ModifyRule from "./pages/ModifyRule";
function App() {
  return (
   <Router>
      <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/createRule' element={<CreateRule/>} />
    <Route path='/getAllRules' element={<GetAllRules/>} />
    <Route path='/evaluateRule' element={<EvaluateRule/>} />
    <Route path='/combineRules' element={<CombineRules/>} />
    <Route path='/modifyRule' element={<ModifyRule/>} />

      </Routes>
    </Router>
  );
}

export default App;
