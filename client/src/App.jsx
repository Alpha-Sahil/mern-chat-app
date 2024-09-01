import Home from "./pages/Home";
import  DM from "./pages/DM/Index";
import './css/userDm.css'
import './css/newDm.css'
import './css/profile.css'
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/message" element={<DM />}/>
      </Routes>
    )
}
