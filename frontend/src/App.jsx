import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpertList from './pages/ExpertList';
import ExpertDetail from './pages/ExpertDetails';
import MyBookings from './pages/MyBookings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App