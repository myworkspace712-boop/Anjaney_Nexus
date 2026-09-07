import { useState, useEffect } from 'react';


const AuthHistoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    const saved = localStorage.getItem('auth_attempts');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  // Also expose a custom event listener so other components can trigger an update
  useEffect(() => {
    const handleUpdate = () => {
      if (isOpen) loadHistory();
    };
    window.addEventListener('auth_history_updated', handleUpdate);
    return () => window.removeEventListener('auth_history_updated', handleUpdate);
  }, [isOpen]);

  const clearHistory = () => {
    localStorage.removeItem('auth_attempts');
    setHistory([]);
  };

  return (
    <div className="relative mb-6 z-50">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          View Recent Attempts
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Authentication History</h3>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-bold">{history.length}</span>
          </div>
          
          <div className="max-h-60 overflow-y-auto p-2">
            {history.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-6">No recent attempts recorded.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((attempt, index) => (
                  <li key={index} className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 text-sm truncate">{attempt.name}</p>
                      <p className="text-xs text-gray-500 truncate">{attempt.email}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded w-fit ${attempt.type === 'signup' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {attempt.type}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <button
              onClick={clearHistory}
              disabled={history.length === 0}
              className="w-full text-center text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthHistoryDropdown;
