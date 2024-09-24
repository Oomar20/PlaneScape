import React from 'react'
import MainPage from './pages/MainPage'
import MyFlights from './pages/MyFlights'
import NotFoundPage from './pages/NotFoundPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/home' element={<MainPage />} />
          <Route path='/myflights' element={<MyFlights />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App