import React from 'react';


const MessageTab = ({ name, email, onClear }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-md text-gray-600">{email}</p>
      </div>
      <button
        onClick={onClear}
        className="w-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 py-2.5 px-4 rounded-lg font-semibold transition-colors duration-200 border border-red-100 shadow-sm"
      >
        Clear
      </button>
    </div>
  );
};

export default MessageTab;
