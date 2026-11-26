import React from 'react';

const ProfileIcon = ({ isLoggedIn = false, isDarkMode = false }) => {
  return (
    <div
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
        isDarkMode
          ? 'bg-[#1f1b17] border-[#332b21] text-[#c99a42] group-hover:border-[#c99a42]'
          : 'bg-[#f7f4ee] border-[#e8e2d4] text-[#0b1d3a] group-hover:border-[#c99a42]'
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
          isDarkMode ? 'border-[#141312]' : 'border-[#fcfbf8]'
        } ${isLoggedIn ? 'bg-green-500' : 'bg-slate-400'}`}
      />
    </div>
  );
};

export default ProfileIcon;
