import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import InteractiveSentence from './components/feature_1';
import RotatingLogoGrid from './components/feature_2';
import BSSOSSSlideshow from './components/feature_3';
import LoadingPage from './components/feature_4';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Check if the loading animation is complete by monitoring the 'completed' state in localStorage
  useEffect(() => {
    // Monitor for changes to the loading phase
    const checkLoadingStatus = () => {
      // Check if the LoadingPage has set its completed state to true
      const homeElement = document.querySelector('[data-loading-phase="home"]');
      if (homeElement && homeElement.getAttribute('data-loading-complete') === 'true') {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); // Delay transition to ensure smooth animation
      }
    };

    // Set up an interval to check
    const statusInterval = setInterval(checkLoadingStatus, 500);
    
    // Auto-hide loading screen after a timeout (fallback)
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 7500); // Fallback timeout - 7.5 seconds

    return () => {
      clearInterval(statusInterval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <section className="section-feature-1">
            <InteractiveSentence />
          </section>
          
          <section className="section-feature-2">
            <RotatingLogoGrid />
          </section>
          
          <section className="section-feature-3">
            <BSSOSSSlideshow />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
