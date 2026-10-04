import { create } from 'zustand'

const DERIV_WS_URL = import.meta.env.VITE_DERIV_API_URL || 'wss://ws.derivws.com/websockets/v3'

let wsInstance = null

export const useDerivStore = create((set, get) => ({
  isConnected: false,
  isAuthenticated: false,
  balance: 0,
  markets: [],
  activeMarkets: {},
  userData: null,
  error: null,
  requestId: 1,

  initializeConnection: () => {
    if (wsInstance && wsInstance.readyState === WebSocket.OPEN) return

    wsInstance = new WebSocket(DERIV_WS_URL)

    wsInstance.onopen = () => {
      set({ isConnected: true })
      const savedToken = localStorage.getItem('deriv_token')
      if (savedToken) {
        get().authorize(savedToken)
      }
    }

    wsInstance.onmessage = (event) => {
      const data = JSON.parse(event.data)
      get().handleMessage(data)
    }

    wsInstance.onerror = () => {
      set({ error: 'WebSocket connection failed', isConnected: false })
    }

    wsInstance.onclose = () => {
      set({ isConnected: false, isAuthenticated: false })
    }
  },

  sendMessage: (message) => {
    if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
      const id = get().requestId
      wsInstance.send(JSON.stringify({ ...message, req_id: id }))
      set({ requestId: id + 1 })
      return id
    }
    return null
  },

  authorize: (token) => {
    get().sendMessage({ authorize: token })
  },

  getActiveSymbols: () => {
    get().sendMessage({ active_symbols: 'brief', product_type: 'all' })
  },

  getTicks: (symbol) => {
    get().sendMessage({ ticks: symbol, subscribe: 1 })
  },

  placeTrade: ({ amount, symbol, type, duration, durationUnit }) => {
    get().sendMessage({
      buy: 1,
      price: 1,
      amount,
      symbol,
      contract_type: type,
      duration,
      duration_unit: durationUnit || 'm',
      currency: 'USD'
    })
  },

  handleMessage: (response) => {
    if (response.error) {
      set({ error: response.error.message || 'API error' })
      return
    }

    if (response.authorize) {
      set({ isAuthenticated: true, userData: response.authorize })
      get().getActiveSymbols()
    }

    if (response.balance) {
      set({ balance: Number(response.balance.balance || 0) })
    }

    if (response.active_symbols) {
      set({ markets: response.active_symbols })
    }

    if (response.ticks) {
      const nextQuote = response.ticks.quote
      const symbol = response.echo_req?.ticks
      if (symbol) {
        set((state) => ({
          activeMarkets: {
            ...state.activeMarkets,
            [symbol]: { quote: nextQuote }
          }
        }))
      }
    }
  },

  logout: () => {
    localStorage.removeItem('deriv_token')
    set({ isAuthenticated: false, userData: null, balance: 0 })
    if (wsInstance) {
      wsInstance.close()
      wsInstance = null
    }
  }
}))
