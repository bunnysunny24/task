import { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading', 'splitting', 'lshape', 'home'
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        const newTime = prev + 1;
        
        // Update progress based on timer
        if (newTime <= 100) {
          setProgress(newTime);
        }
        
        // Phase transitions
        if (newTime === 100) {
          setTimeout(() => setPhase('splitting'), 500);
        } else if (newTime === 102) {
          setPhase('lshape');
        } else if (newTime === 105) {
          setPhase('home');
        }
        
        return newTime;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(3, '0');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Timer */}
      <div className="fixed bottom-10 left-10 text-white text-5xl font-light tracking-wider z-20">
        {formatTime(timer)}
      </div>

      {/* Loading Container */}
      <div 
        className={`relative z-10 transition-all duration-800 ${
          phase === 'home' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        {/* Initial Loading Bar */}
        <div 
          className={`transition-all duration-500 ${
            phase === 'loading' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-80 h-16 bg-gray-700 rounded relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white to-gray-300 rounded transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Splitting Animation */}
        <div 
          className={`absolute top-0 left-0 transition-all duration-500 ${
            phase === 'splitting' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex gap-2">
            <div className="w-52 h-16 bg-gradient-to-r from-white to-gray-300 rounded transform transition-all duration-700 ease-out" />
            <div className="w-24 h-16 bg-gradient-to-r from-white to-gray-300 rounded transform transition-all duration-700 ease-out" />
          </div>
        </div>

        {/* L-Shape */}
        <div 
          className={`absolute top-0 left-0 transition-all duration-800 ${
            phase === 'lshape' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="relative">
            {/* Vertical part of L */}
            <div className="w-16 h-48 bg-white rounded absolute transform transition-all duration-800 ease-out" />
            {/* Horizontal part of L */}
            <div className="w-32 h-16 bg-white rounded absolute top-32 transform transition-all duration-800 ease-out" />
          </div>
        </div>
      </div>

      {/* Home Page Content */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center flex-col text-white transition-all duration-1000 ${
          phase === 'home' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
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