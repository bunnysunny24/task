import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import InteractiveSentence from './components/feature_1';
import RotatingLogoGrid from './components/feature_2';
import BSSOSSSlideshow from './components/feature_3';
import LoadingPage from './components/feature_4';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const statusIntervalRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  // Check if the loading animation is complete by monitoring the 'completed' state
  useEffect(() => {
    // Monitor for changes to the loading phase
    const checkLoadingStatus = () => {
      // Check if the LoadingPage has set its completed state to true
      const homeElement = document.querySelector('[data-loading-phase="home"]');
      if (homeElement && homeElement.getAttribute('data-loading-complete') === 'true') {
        // Clear both timers to prevent double transitions
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
        
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = null;
        }
        
        // Transition to main content with a delay for animation
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    // Set up an interval to check
    statusIntervalRef.current = setInterval(checkLoadingStatus, 500);
    
    // Auto-hide loading screen after a timeout (fallback)
    fallbackTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      
      // Clear interval when fallback fires
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    }, 8500); // Fallback timeout - 8.5 seconds

    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
      
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
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
