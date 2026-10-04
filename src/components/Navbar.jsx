import { Link } from 'react-router-dom'
import { useDerivStore } from '../store/derivStore'

export default function Navbar({ isConnected }) {
  const { isAuthenticated, balance, logout } = useDerivStore()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-orange-400">
          <span className="rounded-lg bg-orange-500/20 p-2 text-base">D</span>
          DerivTrade
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-white">Dashboard</Link>
          <Link to="/markets" className="transition hover:text-white">Markets</Link>
          <Link to="/trade" className="transition hover:text-white">Trade</Link>
          <Link to="/account" className="transition hover:text-white">Account</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className="text-xs text-slate-300">{isConnected ? 'Live' : 'Offline'}</span>
          </div>

          {isAuthenticated ? (
            <>
              <div className="hidden rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-300 md:block">
                ${balance.toFixed(2)}
              </div>
              <button onClick={logout} className="btn-secondary px-3 py-2 text-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/account" className="btn-primary px-4 py-2 text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
