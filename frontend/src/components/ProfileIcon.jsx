import React from 'react';

const ProfileIcon = ({ isLoggedIn = false, isDarkMode = true }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
        isDarkMode
          ? 'bg-blue-900/90 border-blue-700 text-orange-400 group-hover:border-orange-500'
          : 'bg-blue-50 border-blue-200 text-blue-950 group-hover:border-orange-500'
      }`}
    >
      {/* User Silhouette SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>

      {/* Online / Signed-In Status Dot */}
      <span
        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${
          isDarkMode ? 'border-blue-950' : 'border-white'
        } ${isLoggedIn ? 'bg-green-500' : 'bg-slate-400'}`}
      />
    </div>
  );
};

export default ProfileIcon;
