import React from 'react';

interface HamburgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isMenuOpen,
  toggleMenu,
  isDarkMode,
  toggleDarkMode,
}) => {
  //logic goes here

  return (
    <div className="relative">
      <button
        className="text-white"
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 mt-2 p-4 bg-white shadow-lg rounded-lg w-48">
          <div className="flex items-center justify-between">
            <span className="text-gray-800">Dark Mode</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
