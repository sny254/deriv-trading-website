import { useEffect } from 'react'
import { useDerivStore } from '../store/derivStore'

export default function Dashboard() {
  const { isAuthenticated, balance, markets, getActiveSymbols } = useDerivStore()

  useEffect(() => {
    if (!isAuthenticated) return
    getActiveSymbols()
  }, [isAuthenticated, getActiveSymbols])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="card-surface rounded-2xl p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-orange-300">Deriv trading</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trade smarter. React faster.</h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Access real market data, manage your account, and execute trades from a single secure interface.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/markets" className="btn-primary px-5 py-3">Explore markets</a>
            <a href="/account" className="btn-secondary px-5 py-3">Connect account</a>
          </div>
        </section>

        <aside className="card-surface rounded-2xl p-6">
          <p className="text-sm text-slate-400">Account Balance</p>
          <div className="mt-3 text-4xl font-bold text-orange-400">
            ${isAuthenticated ? balance.toFixed(2) : '0.00'}
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex justify-between"><span>Markets</span><span>{markets.length}</span></div>
            <div className="flex justify-between"><span>Status</span><span className={isAuthenticated ? 'text-emerald-400' : 'text-slate-400'}>{isAuthenticated ? 'Active' : 'Not connected'}</span></div>
          </div>
        </aside>
      </div>

      <section className="card-surface rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured markets</h2>
          <a href="/markets" className="text-sm text-orange-300 hover:text-orange-200">View all</a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {markets.slice(0, 6).map((market) => (
            <div key={market.symbol} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-white">{market.display_name}</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">{market.market || 'Market'}</span>
              </div>
              <div className="text-lg font-semibold text-orange-400">{market.symbol}</div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Live</span>
                <span>Open</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
