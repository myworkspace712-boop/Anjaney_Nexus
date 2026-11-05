import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'an_secure_corporate_database';

const MessageSender = () => {
  const [emailInput, setEmailInput] = useState('');
  const [addedEmails, setAddedEmails] = useState([]);
  const [savedEmails, setSavedEmails] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all registered emails for the dropdown on load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const emails = storedUsers.map(user => user.email).filter(Boolean);
    setSavedEmails(emails);
  }, []);

  const handleAddEmail = (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.toLowerCase().replace(/\s+/g, '');
    
    if (cleanEmail && !addedEmails.includes(cleanEmail)) {
      setAddedEmails([...addedEmails, cleanEmail]);
      setEmailInput(''); // Reset input field after adding
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setAddedEmails(addedEmails.filter(email => email !== emailToRemove));
  };

  const handleClearAllEmails = () => {
    setAddedEmails([]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (addedEmails.length === 0) {
      alert("Please add at least one email ID to send the message.");
      return;
    }
    if (!message.trim()) {
      alert("Please enter a message to send.");
      return;
    }
    
    alert(`Success! Message simulated sending to ${addedEmails.length} user(s).`);
    setAddedEmails([]);
    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.08)] font-sans transition-colors">
      
      <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800/50">
          Communication Hub
        </span>
        <h2 className="text-2xl font-black text-blue-950 dark:text-white mt-2">Send Message</h2>
      </div>

      <form onSubmit={handleSendMessage} className="space-y-6">
        
        {/* EMAIL INPUT WITH DROPDOWN */}
        <div>
          <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
            Add Recipients
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              list="system-emails-list"
              placeholder="Select or type an email ID..."
              className="flex-grow p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium"
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-sm shrink-0"
            >
              Add
            </button>
          </div>
          
          <datalist id="system-emails-list">
            {savedEmails.map((savedEmail, idx) => (
              <option key={idx} value={savedEmail} />
            ))}
          </datalist>
        </div>

        {/* SELECTED EMAILS LIST & CLEAR BUTTON */}
        {addedEmails.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {addedEmails.length} Recipient(s) Added:
              </span>
              
              {/* THE CLEAR BUTTON */}
              <button
                type="button"
                onClick={handleClearAllEmails}
                className="text-[10px] text-red-500 hover:text-red-600 font-bold uppercase tracking-widest cursor-pointer hover:underline transition-colors"
              >
                Clear All Emails ✕
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {addedEmails.map((email, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-950 dark:text-white shadow-sm"
                >
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-slate-400 hover:text-red-500 transition-colors text-sm cursor-pointer leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGE BODY */}
        <div>
          <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
            Message
          </label>
          <textarea
            required
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium resize-none"
          />
        </div>

        {/* SEND BUTTON */}
        <button
          type="submit"
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-orange-500/30 cursor-pointer"
        >
          Send Message
        </button>
        
      </form>
    </div>
  );
};

export default MessageSender;
