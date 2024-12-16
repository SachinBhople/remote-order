import React from 'react'

import './index.css'
import OrderHistory from './pages/OrderHistory'
import { Outlet, Route, Routes } from 'react-router-dom'

const App = () => {
  return <>

    <Routes>
      <Route path='/' element={<><Outlet /></>}>
        <Route index element={<OrderHistory />} />
      </Route>
    </Routes>
  </>
}

export default App
