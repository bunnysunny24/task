import React, { useState, useEffect } from 'react';

const RotatingLogoGrid = () => {
  // Define multiple sets of logos that will rotate
  const logoSets = [
    [
      { name: 'Perplexity', color: 'from-purple-500 to-pink-500' },
      { name: 'Supercell', color: 'from-blue-500 to-cyan-500' },
      { name: 'Monzo', color: 'from-pink-500 to-red-500' },
      { name: 'Raycast', color: 'from-orange-500 to-yellow-500' },
      { name: 'Retool', color: 'from-green-500 to-teal-500' },
      { name: 'Mercury', color: 'from-indigo-500 to-purple-500' }
    ],
    [
      { name: 'Ramp', color: 'from-emerald-500 to-green-500' },
      { name: 'OpenAI', color: 'from-gray-700 to-gray-900' },
      { name: 'Scale', color: 'from-blue-600 to-indigo-600' },
      { name: 'Boom', color: 'from-red-500 to-pink-500' },
      { name: 'Cash App', color: 'from-green-600 to-emerald-600' },
      { name: 'Vercel', color: 'from-gray-800 to-black' }
    ],
    [
      { name: 'Notion', color: 'from-gray-600 to-gray-800' },
      { name: 'Stripe', color: 'from-purple-600 to-blue-600' },
      { name: 'Linear', color: 'from-blue-500 to-purple-500' },
      { name: 'Figma', color: 'from-orange-500 to-pink-500' },
      { name: 'Discord', color: 'from-indigo-500 to-purple-600' },
      { name: 'GitHub', color: 'from-gray-700 to-gray-900' }
    ]
  ];
  const [currentSet, setCurrentSet] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle animated transitions between logo sets
  useEffect(() => {
    // Initial animation on first load
    const initialTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);

    // Rotate through logo sets every 5 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // After transition out, change the logo set
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % logoSets.length);
        
        // After changing, transition back in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 500);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  const currentLogos = logoSets[currentSet];

  // Generate logo icon based on company name
  const getLogoIcon = (name) => {
    const icons = {
      'Perplexity': (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      'Supercell': (
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          S
        </div>
      ),
      'Monzo': (
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
          </div>
        </div>
      ),
      'Raycast': (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'Retool': (
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
      ),
      'Mercury': (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
      ),
      'Ramp': (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
      ),
      'OpenAI': (
        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      ),
      'Scale': (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          S
        </div>
      ),
      'Boom': (
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          !
        </div>
      ),
      'Cash App': (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          $
        </div>
      ),
      'Vercel': (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-white"></div>
        </div>
      ),
      'Notion': (
        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          N
        </div>
      ),
      'Stripe': (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.912-1.722 2.166-1.722 3.663 0 2.868 1.844 4.235 4.763 5.394 1.624.604 2.539 1.111 2.539 1.937 0 .669-.547 1.066-1.506 1.066-1.978 0-4.567-.909-6.074-1.802l-.703 4.222c1.27.756 3.466 1.548 6.477 1.548 2.065 0 3.747-.511 4.858-1.489 1.134-.978 1.667-2.298 1.667-3.85 0-2.846-1.844-4.235-4.908-5.312"/>
          </svg>
        </div>
      ),
      'Linear': (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      ),
      'Figma': (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-8 h-12 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 rounded-l-full"></div>
          <div className="w-8 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-r-full"></div>
        </div>
      ),
      'Discord': (
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.229a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.229.077.077 0 0 0-.079-.036A19.891 19.891 0 0 0 3.677 4.492a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
          </svg>
        </div>
      ),
      'GitHub': (
        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
      )
    };
    return icons[name] || <div className="w-12 h-12 bg-gray-500 rounded-full"></div>;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-8 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Title */}
      <div className="absolute top-20 left-0 right-0 text-center">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">
          Trusted By Industry Leaders
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Join thousands of companies using our platform to revolutionize their business
        </p>
      </div>
      
      <div 
        className="relative w-[900px] h-[450px] cursor-pointer mt-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Grid */}
        <div 
          className={`grid grid-cols-3 grid-rows-2 gap-12 w-full h-full transition-all duration-500 ${
            isHovered ? 'blur-sm scale-95' : ''
          } ${
            isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
          } ${
            isInitialLoad ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
          }`}
        >          {currentLogos.map((logo, index) => (
            <div
              key={`${currentSet}-${index}`}
              className={`bg-gradient-to-br ${logo.color} rounded-2xl flex flex-col items-center justify-center border border-gray-700 hover:border-gray-400 transition-all duration-500 group hover:scale-105 shadow-2xl`}
              style={{
                animation: `fadeInScale 0.5s ease-out ${index * 100}ms both`,
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5), 
                           inset 0 1px 1px rgba(255,255,255,0.1)`
              }}
            >
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute -inset-3 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-md transition-opacity duration-300"></div>
                {getLogoIcon(logo.name)}
              </div>
              <div className="text-white text-lg font-semibold opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-1">
                {logo.name}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Hover Overlay Button */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >          <button className="bg-gradient-to-r from-purple-700/90 to-indigo-700/90 backdrop-blur-lg hover:from-purple-600/90 hover:to-indigo-600/90 text-white px-10 py-5 rounded-full border border-purple-500/30 font-bold text-xl flex items-center gap-4 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/20 group">
            <span>Meet our sponsors</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform duration-300">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
        <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default RotatingLogoGrid;