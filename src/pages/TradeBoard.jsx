import { useEffect, useState } from 'react'
import { useDerivStore } from '../store/derivStore'

export default function TradeBoard() {
  const { isAuthenticated, markets, activeMarkets, getTicks, placeTrade } = useDerivStore()
  const [symbol, setSymbol] = useState('R_50')
  const [contractType, setContractType] = useState('CALL')
  const [amount, setAmount] = useState(10)
  const [duration, setDuration] = useState(5)
  const [durationUnit, setDurationUnit] = useState('m')

  useEffect(() => {
    if (!isAuthenticated) return
    getTicks(symbol)
  }, [symbol, isAuthenticated, getTicks])

  const handleTrade = () => {
    placeTrade({
      amount: Number(amount),
      symbol,
      type: contractType,
      duration: Number(duration),
      durationUnit
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card-surface rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold">Trade board</h2>
          <p className="mt-3 text-slate-300">Connect your account to start placing trades.</p>
          <a href="/account" className="btn-primary mt-6 inline-block px-5 py-3">Connect account</a>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <section className="card-surface rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Live chart</h2>
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">Streaming</span>
          </div>

          <div className="grid-pattern flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">{activeMarkets[symbol]?.quote || '--'}</div>
              <div className="mt-2 text-sm text-slate-400">{symbol}</div>
            </div>
          </div>
        </section>

        <aside className="card-surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Place trade</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Symbol</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-orange-400"
              >
                {markets.map((market) => (
                  <option key={market.symbol} value={market.symbol}>{market.display_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Direction</label>
              <div className="grid grid-cols-2 gap-3">
                {['CALL', 'PUT'].map((direction) => (
                  <button
                    key={direction}
                    onClick={() => setContractType(direction)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${
                      contractType === direction ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {direction}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div className="grid grid-cols-[1fr_100px] gap-3">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Duration</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Unit</label>
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-orange-400"
                >
                  <option value="m">m</option>
                  <option value="h">h</option>
                  <option value="d">d</option>
                </select>
              </div>
            </div>

            <button onClick={handleTrade} className="btn-primary w-full px-4 py-3">
              Place trade
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
