import React, { useState, useEffect } from 'react';
import HamburgerMenu from './components/hamburger-menu';
import ImageGrid from './image-components/image-grid';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State for toggling the menu visibility
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State for dark mode

  // Check the stored theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 text-white p-4 pb-2.5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fez's Image Gallery</h1>

          {/* Hamburger Menu Component */}
          <div className="ml-auto flex items-center space-x-4">
            <HamburgerMenu
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <ImageGrid />
      </div>
    </div>
  );
};

export default App;
