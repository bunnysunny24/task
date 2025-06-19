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
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Loading management
  useEffect(() => {
    const checkLoadingStatus = () => {
      const homeElement = document.querySelector('[data-loading-phase="home"]');
      if (homeElement?.getAttribute('data-loading-complete') === 'true') {
        clearInterval(statusIntervalRef.current);
        clearTimeout(fallbackTimerRef.current);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    statusIntervalRef.current = setInterval(checkLoadingStatus, 500);
    fallbackTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      clearInterval(statusIntervalRef.current);
    }, 8500);

    return () => {
      clearInterval(statusIntervalRef.current);
      clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  return (
    <div className={`App min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'
    }`}>
      {/* Theme Toggle Button */}
      <button
        aria-label="Toggle Dark Mode"
        className={`fixed top-4 right-4 z-[100] p-3 rounded-full transition-all duration-200 ${
          isDarkMode 
            ? 'bg-dark-card hover:bg-primary-700 text-primary-400' 
            : 'bg-light-card hover:bg-primary-100 text-primary-600'
        } shadow-lg`}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {isLoading ? (
        <LoadingPage isDarkMode={isDarkMode} />
      ) : (
        <main className="relative">
          {/* Regular features container */}
          <div className="relative">
            <section className={`min-h-screen section-feature-1 ${
              isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'
            } transition-colors duration-300`}>
              <InteractiveSentence isDarkMode={isDarkMode} />
            </section>
            
            <section className={`min-h-screen section-feature-2 ${
              isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'
            } transition-colors duration-300`}>
              <RotatingLogoGrid isDarkMode={isDarkMode} />
            </section>
            
            <section className={`min-h-screen section-feature-3 ${
              isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'
            } transition-colors duration-300`}>
              <BSSOSSSlideshow isDarkMode={isDarkMode} />
            </section>
          </div>

          {/* Feature 5 container */}
          <div className="relative">
            <section className="section-feature-5">
              <Feature5 isDarkMode={isDarkMode} />
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
