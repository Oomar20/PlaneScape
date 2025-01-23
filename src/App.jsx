import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// importing the pages
import Home from './pages/MainPage';
import Hotels from './pages/Hotels';
import ContactUs from './pages/ContactUs';
import MyFlights from './pages/MyFlights';
import MyHotels from './pages/MyHotels';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Importing the protected routes to prevent the user from accessing them without being logged in
import ProtectedRoute from './pages/ProtectedRoutes';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/myflights"
            element={
              <ProtectedRoute>
                <MyFlights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myhotels"
            element={
              <ProtectedRoute>
                <MyHotels />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>


    </>
  );
};

export default App;

