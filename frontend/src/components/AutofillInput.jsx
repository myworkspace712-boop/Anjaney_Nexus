import React, { useState, useEffect } from 'react';


const AutofillInput = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  storageKey,
  minLength,
  className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500", // Default login style, can be overridden
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (storageKey) {
      try {
        const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setHistory(stored);
      } catch (e) {
        setHistory([]);
      }
    }
  }, [storageKey]);

  // We listen to a custom event to update history across components when a new item is added
  useEffect(() => {
    const handleStorageUpdate = () => {
      if (storageKey) {
        try {
          const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
          setHistory(stored);
        } catch (e) {
          setHistory([]);
        }
      }
    };
    window.addEventListener('autofill_history_updated', handleStorageUpdate);
    return () => window.removeEventListener('autofill_history_updated', handleStorageUpdate);
  }, [storageKey]);


  const handleClear = (e) => {
    e.preventDefault(); // Prevent blur
    if (storageKey) {
      localStorage.removeItem(storageKey);
      setHistory([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (e, item) => {
    e.preventDefault(); // Prevent blur
    onChange({ target: { value: item, name } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        autoComplete="off"
        className={className}
        value={value}
        onChange={onChange}
        onFocus={() => {
          if (history.length > 0) setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        placeholder={placeholder}
      />

      {isOpen && history.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#1c1917] border border-stone-700 rounded-lg shadow-xl overflow-hidden text-sm">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 text-stone-200 hover:bg-stone-800 cursor-pointer flex items-center gap-2"
              onMouseDown={(e) => handleSelect(e, item)}
            >
              {item}
            </div>
          ))}
          <div
            className="border-t border-stone-700 px-4 py-2 text-xs text-red-400 hover:bg-stone-800 cursor-pointer font-medium"
            onMouseDown={handleClear}
          >
            Clear history
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to be called from Login/SignUp to save entries
export const saveAutofillEntry = (storageKey, value) => {
  if (!value || !storageKey || value.trim() === '') return;
  try {
    const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const filtered = history.filter((item) => item !== value);
    filtered.unshift(value); // Add to beginning
    const limited = filtered.slice(0, 5); // Keep only last 5
    localStorage.setItem(storageKey, JSON.stringify(limited));
    window.dispatchEvent(new Event('autofill_history_updated'));
  } catch (err) {
    console.error('Failed to save autofill entry', err);
  }
};

export default AutofillInput;
