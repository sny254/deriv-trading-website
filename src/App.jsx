import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Markets from './pages/Markets'
import TradeBoard from './pages/TradeBoard'
import Account from './pages/Account'
import { useDerivStore } from './store/derivStore'
import { useEffect } from 'react'

export default function App() {
  const { initializeConnection, isConnected } = useDerivStore()

  useEffect(() => {
    initializeConnection()
  }, [initializeConnection])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar isConnected={isConnected} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/trade" element={<TradeBoard />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
