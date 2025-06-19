import { useState, useEffect, useRef } from 'react';

export default function LoadingPage() {
  // Animation states
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading', 'splitting', 'lshape', 'home'
  const [timer, setTimer] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Refs for animation control
  const intervalRef = useRef(null);
  const loadingBarRef = useRef(null);
  const leftPartRef = useRef(null);
  const rightPartRef = useRef(null);
  const verticalLRef = useRef(null);
  const horizontalLRef = useRef(null);

  // Animation sequence
  useEffect(() => {
    // Function to stop all animations and timers
    const stopAllTimers = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Only start if not already completed
    if (!completed) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          
          // Update progress until 100%
          if (newTime <= 100) {
            setProgress(newTime);
            
            // At 100%, trigger the splitting animation
            if (newTime === 100) {
              // Set a timeout to switch to the splitting phase after a brief pause
              setTimeout(() => {
                // Get positions for a smooth transition
                const loadingBar = loadingBarRef.current;
                if (loadingBar) {
                  const rect = loadingBar.getBoundingClientRect();
                  
                  // Position the splitting parts at the exact position of the loading bar
                  if (leftPartRef.current && rightPartRef.current) {
                    leftPartRef.current.style.top = `${rect.top}px`;
                    leftPartRef.current.style.left = `${rect.left}px`;
                    rightPartRef.current.style.top = `${rect.top}px`;
                    rightPartRef.current.style.left = `${rect.left + rect.width * 0.68}px`;
                  }
                }
                
                // Now trigger the splitting phase
                setPhase('splitting');
              }, 800);
            }
          }
          
          // Phase transitions with proper sequencing
          if (newTime === 104) {
            // Get positions from the splitting parts for L shape transition
            const leftPart = leftPartRef.current;
            if (leftPart && verticalLRef.current) {
              const rect = leftPart.getBoundingClientRect();
              verticalLRef.current.style.top = `${rect.top}px`;
              verticalLRef.current.style.left = `${rect.left}px`;
              
              if (horizontalLRef.current) {
                horizontalLRef.current.style.top = `${rect.top + rect.height * 2}px`;
                horizontalLRef.current.style.left = `${rect.left}px`;
              }
            }
            
            // Trigger L-shape phase
            setPhase('lshape');
          } else if (newTime === 107) {
            setPhase('home');
            
            // Set completed flag after a delay for home animation
            setTimeout(() => {
              setCompleted(true);
              stopAllTimers();
            }, 1500);
          }
          
          // Safety cap to prevent timer going too high
          if (newTime > 110) {
            stopAllTimers();
            return 110;
          }
          
          return newTime;
        });
      }, 50);
    }

    return stopAllTimers;
  }, [completed]);

  const formatTime = (time) => {
    return time.toString().padStart(3, '0');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Timer */}
      <div className={`fixed bottom-10 left-10 text-white text-5xl font-light tracking-wider z-20 transition-opacity duration-500 ${
        phase === 'home' ? 'opacity-0' : 'opacity-100'
      }`}>
        {formatTime(timer)}
      </div>

      {/* Loading Container - All animations happen in this container */}
      <div className="relative w-80 h-48 flex items-center justify-center">
        {/* Initial Loading Bar */}
        <div 
          className={`absolute transition-all duration-500 ${
            phase === 'loading' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          <div 
            ref={loadingBarRef}
            className="w-80 h-16 bg-gray-700 rounded relative overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-white to-gray-300 rounded transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Pulse effect */}
            {progress > 0 && (
              <div 
                className="absolute h-full w-4 bg-white/30 blur-sm"
                style={{ 
                  left: `calc(${progress}% - 4px)`,
                  opacity: progress < 100 ? 1 : 0,
                  transition: 'opacity 0.3s ease-out'
                }}
              />
            )}
          </div>
          
          {/* Loading percentage */}
          <div className="text-white text-right mt-2 text-sm font-mono">
            {progress}%
          </div>
        </div>

        {/* Splitting Animation - Positioned absolutely to match loading bar location */}
        <div 
          className={`absolute top-0 left-0 w-full transition-all duration-700 ${
            phase === 'splitting' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Left part (2/3) */}
          <div 
            ref={leftPartRef}
            className="absolute w-52 h-16 bg-gradient-to-r from-white to-gray-300 rounded transition-all duration-700 ease-out"
            style={{ 
              transform: phase === 'splitting' ? 'translateX(-10px)' : 'translateX(0)',
              opacity: phase === 'splitting' ? 1 : 0
            }}
          />
          
          {/* Right part (1/3) */}
          <div 
            ref={rightPartRef}
            className="absolute w-24 h-16 bg-gradient-to-r from-white to-gray-300 rounded transition-all duration-700 ease-out"
            style={{ 
              transform: phase === 'splitting' ? 'translateX(10px)' : 'translateX(0)',
              opacity: phase === 'splitting' ? 1 : 0
            }}
          />
        </div>

        {/* L-Shape - Also positioned absolutely to maintain position */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-all duration-800 ${
            phase === 'lshape' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Vertical part of L */}
          <div 
            ref={verticalLRef}
            className="absolute w-16 h-48 bg-white rounded transition-all duration-800 ease-out" 
            style={{ 
              boxShadow: phase === 'lshape' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : 'none',
              transform: phase === 'lshape' ? 'scaleY(1.05)' : 'scaleY(1)',
              opacity: phase === 'lshape' ? 1 : 0
            }}
          />
          
          {/* Horizontal part of L */}
          <div 
            ref={horizontalLRef}
            className="absolute w-32 h-16 bg-white rounded transition-all duration-800 ease-out" 
            style={{ 
              boxShadow: phase === 'lshape' ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : 'none',
              transform: phase === 'lshape' ? 'scaleX(1.05)' : 'scaleX(1)',
              opacity: phase === 'lshape' ? 1 : 0
            }}
          />
        </div>
      </div>

      {/* Home Page Content */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center flex-col text-white transition-all duration-1000 ${
          phase === 'home' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          clipPath: phase === 'home' 
            ? 'circle(150% at center)' 
            : 'circle(0% at center)',
          transition: 'clip-path 1.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s ease-in-out, transform 1s ease-in-out'
        }}
        data-loading-phase={phase}
        data-loading-complete={completed.toString()}
      >
        <div className="relative">
          {/* Decorative floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" 
                 style={{ animationDelay: '0s', animationDuration: '3s' }} />
            <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" 
                 style={{ animationDelay: '1s', animationDuration: '4s' }} />
            <div className="absolute bottom-20 left-32 w-12 h-12 bg-white/10 rounded-full animate-bounce" 
                 style={{ animationDelay: '2s', animationDuration: '5s' }} />
            <div className="absolute bottom-32 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce" 
                 style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
          </div>

          {/* Main content */}
          <div className="text-center z-10 relative">
            <h1 className={`text-7xl font-thin mb-6 tracking-wide transition-all duration-1000 ${
              phase === 'home' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '0.5s' }}>
              Welcome
            </h1>
            <p className={`text-2xl opacity-80 transition-all duration-1000 ${
              phase === 'home' ? 'translate-y-0 opacity-80' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '0.8s' }}>
              Your journey begins here
            </p>
          </div>

          {/* Interactive elements */}
          <div className={`mt-12 flex gap-6 justify-center transition-all duration-1000 ${
            phase === 'home' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1.1s' }}>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/50 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full" />
      </div>
    </div>
  );
}
