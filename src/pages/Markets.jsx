import { useEffect, useMemo, useState } from 'react'
import { useDerivStore } from '../store/derivStore'

export default function Markets() {
  const { markets, getActiveSymbols, getTicks, activeMarkets } = useDerivStore()
  const [selectedMarket, setSelectedMarket] = useState('all')

  useEffect(() => {
    getActiveSymbols()
  }, [getActiveSymbols])

  useEffect(() => {
    markets.forEach((market) => {
      if (!activeMarkets[market.symbol]) {
        getTicks(market.symbol)
      }
    })
  }, [activeMarkets, getTicks, markets])

  const filteredMarkets = useMemo(() => {
    if (selectedMarket === 'all') return markets
    return markets.filter((market) => (market.market || '').toLowerCase() === selectedMarket)
  }, [markets, selectedMarket])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">Markets</h1>
        <div className="ml-auto flex flex-wrap gap-2">
          {['all', 'forex', 'commodities', 'indices'].map((market) => (
            <button
              key={market}
              onClick={() => setSelectedMarket(market)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                selectedMarket === market ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {market}
            </button>
          ))}
        </div>
      </div>

      <div className="card-surface overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left">
            <thead className="bg-slate-900/50 text-sm text-slate-300">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Display Name</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMarkets.map((market) => (
                <tr key={market.symbol} className="hover:bg-slate-900/30">
                  <td className="px-4 py-4 font-mono text-white">{market.symbol}</td>
                  <td className="px-4 py-4 text-slate-200">{market.display_name}</td>
                  <td className="px-4 py-4 capitalize text-slate-300">{market.market || 'N/A'}</td>
                  <td className="px-4 py-4 text-right font-medium text-orange-400">
                    {activeMarkets[market.symbol]?.quote || '--'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <a href="/trade" className="btn-primary inline-block px-3 py-2 text-xs">Trade</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
