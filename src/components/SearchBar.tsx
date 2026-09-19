import React from 'react';

const SearchBar: React.FC = () => (
  <form className="flex items-center w-full max-w-2xl mx-auto">
    <input
      type="text"
      className="flex-1 px-4 py-2 rounded-l-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-gray-700 text-base bg-white shadow-sm"
      placeholder="Search Products, Color & More..."
      aria-label="Search"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-amber-600 text-white rounded-r-lg font-semibold hover:bg-amber-700 transition-colors"
      aria-label="Search"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    </button>
  </form>
);

export default SearchBar;
