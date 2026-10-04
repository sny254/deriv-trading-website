import { useState } from 'react'
import { useDerivStore } from '../store/derivStore'

export default function Account() {
  const { isAuthenticated, userData, authorize, logout } = useDerivStore()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!token.trim()) {
      setError('Please enter your Deriv API token.')
      return
    }

    localStorage.setItem('deriv_token', token)
    authorize(token)
    setError('')
  }

  if (isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="card-surface rounded-2xl p-8">
          <h1 className="text-3xl font-bold">Account details</h1>
          <div className="mt-6 space-y-4 text-slate-200">
            <div>
              <div className="text-sm text-slate-400">User ID</div>
              <div className="text-lg font-medium">{userData?.user_id || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Email</div>
              <div className="text-lg font-medium">{userData?.email || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Account type</div>
              <div className="text-lg font-medium capitalize">{userData?.account_type || 'real'}</div>
            </div>
          </div>

          <button onClick={logout} className="btn-secondary mt-8 w-full px-4 py-3">
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="card-surface rounded-2xl p-8">
        <h1 className="text-3xl font-bold">Connect Deriv account</h1>
        <p className="mt-3 text-slate-300">Paste your Deriv API token to access your account and live market data.</p>

        <div className="mt-6">
          <label className="mb-2 block text-sm text-slate-300">Deriv API token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={6}
            placeholder="Paste your API token here"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-orange-400"
          />
        </div>

        {error && <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}

        <button onClick={handleLogin} className="btn-primary mt-6 w-full px-4 py-3">
          Connect account
        </button>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
          <div className="font-medium text-white">How to get a token</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Open your Deriv account</li>
            <li>Go to Security & Password</li>
            <li>Create an API token</li>
            <li>Paste it here to authenticate</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
