import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import InteractiveSentence from './components/feature_1';
import RotatingLogoGrid from './components/feature_2';
import BSSOSSSlideshow from './components/feature_3';
import LoadingPage from './components/feature_4';
import Feature5 from './components/feaeure_5';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const statusIntervalRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  // Theme management
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Loading management
  useEffect(() => {
    const checkLoadingStatus = () => {
      const homeElement = document.querySelector('[data-loading-phase="home"]');
      if (homeElement && homeElement.getAttribute('data-loading-complete') === 'true') {
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
        
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = null;
        }
        
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    statusIntervalRef.current = setInterval(checkLoadingStatus, 500);
    
    fallbackTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    }, 8500);

    return () => {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  return (
    <div className={`App min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Theme Toggle Button */}
      <button
        aria-label="Toggle Dark Mode"
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-opacity-20 backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="relative z-10">
            <section className="section-feature-1 dark:bg-gray-900 dark:text-white">
              <InteractiveSentence />
            </section>
            
            <section className="section-feature-2 dark:bg-gray-900 dark:text-white">
              <RotatingLogoGrid />
            </section>
            
            <section className="section-feature-3 dark:bg-gray-900 dark:text-white">
              <BSSOSSSlideshow />
            </section>
          </div>

          <section className="section-feature-5 relative z-0">
            <Feature5 isDarkMode={isDarkMode} />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
