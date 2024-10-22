import AppLayout from './layouts/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './pages/auth/Register.jsx'
import store from './redux/store.jsx'
import VideoCall from './pages/Profile/Calling/VideoCall.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import './css/main.css'
import './css/search.css'
import './css/videoCall.css'
import './css/toast.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={ <AppLayout /> }>
            <Route index element={<Home />} />
            <Route path='/conversations/:conversation' element={<Home />} />
            <Route path='/conversations/:conversation/video-call' element={<VideoCall />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
