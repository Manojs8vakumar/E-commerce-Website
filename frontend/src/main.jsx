import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global ErrorBoundary caught error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f1f3f6] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-slate-200">
            <div className="text-2xl font-black text-[#2874f0] italic mb-2">
              JustBuyIt <span className="text-[#ffe500]">✦</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              Store Session Recovered
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We encountered a session sync discrepancy. Click below to refresh the store.
            </p>
            <div className="text-[11px] text-rose-500 font-mono bg-rose-50 p-2.5 rounded mb-4 text-left overflow-x-auto">
              {this.state.error?.message || 'Session error occurred'}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all cursor-pointer"
            >
              Reload Just Buy It
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
