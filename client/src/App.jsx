import AppLayout from "./layouts/AppLayout"
import Home from "./pages/Home";
import  DM from "./pages/DM/Index";
import './css/userDM.css'
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/message" element={<DM />}/>
        </Routes>
      </AppLayout>
    )
}
