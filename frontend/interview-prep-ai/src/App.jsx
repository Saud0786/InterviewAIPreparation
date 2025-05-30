import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import LandingPage from './Pages/LandingPage';
// import Login from './pages/Auth/Login';
// import SignUp from './pages/Auth/SignUp';
import InterviewPrep from './Pages/InterviewPrep/InterviewPrep';
import Dashboard from './Pages//Home/Dashboard';
import UserProvider from './context/userContext';


function App() {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
        <Route  path="/" element={<LandingPage/>}/>
        {/* <Route  path="/login" element={<Login/>}/> */}
        <Route  path="/dashboard" element={<Dashboard/>}/>
        {/* <Route  path="/signup" element={<SignUp/>}/> */}
        <Route  path="/interview-prep/:sessionId" element={<InterviewPrep/>}/>
      </Routes>
      </Router>

      <Toaster  toastOptions={{
        className:'',
        style:{
          fontSize:'13px',
        }
      }}/>
    </div>
    </UserProvider>
  )
}

export default App
