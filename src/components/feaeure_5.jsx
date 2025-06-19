import React, { useState, useEffect } from 'react';

const Feature5 = ({ isDarkMode }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.feature-5-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollOffset = window.scrollY - (rect.top + window.scrollY - window.innerHeight);
        setScrollY(Math.max(0, scrollOffset));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation ranges
  const textRange = [0, 300];  // Text animation happens first
  const imageRange = [200, 600]; // Image animation follows
  const contentRange = [500, 700]; // Content appears last

  // Calculate animation progress for each element
  const textProgress = Math.min(1, Math.max(0, (scrollY - textRange[0]) / (textRange[1] - textRange[0])));
  const imageProgress = Math.min(1, Math.max(0, (scrollY - imageRange[0]) / (imageRange[1] - imageRange[0])));
  const contentProgress = Math.min(1, Math.max(0, (scrollY - contentRange[0]) / (contentRange[1] - contentRange[0])));

  return (
    <div className={`feature-5-container relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Main parallax container */}
      <div className="h-[200vh] relative">
        {/* Sticky container for the parallax effect */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 w-full h-full transform transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${imageProgress * -50}vh, 0) scale3d(${1 + imageProgress * 0.1}, ${1 + imageProgress * 0.1}, 1)`,
              opacity: 1 - imageProgress * 0.8
            }}
          >
            <img 
              src="/misurina-sunset_181624-34793.avif"
              alt="Background"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text visibility */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-black/50 to-black/70' : 'bg-gradient-to-b from-black/30 to-black/50'}`} />
          </div>

          {/* Text Layer - Animates First */}
          <div 
            className="absolute inset-0 flex items-center justify-center transform transition-all duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${textProgress * -70}vh, 0)`,
              opacity: 1 - textProgress
            }}
          >
            <div className="text-center text-white px-4">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                Experience Nature
              </h1>
              <p className="text-2xl md:text-3xl opacity-90">
                A journey through breathtaking landscapes
              </p>
            </div>
          </div>

          {/* Content Cards */}
          <div 
            className="absolute inset-x-0 bottom-0 transform transition-all duration-500"
            style={{
              transform: `translate3d(0, ${(1 - contentProgress) * 100}px, 0)`,
              opacity: contentProgress
            }}
          >
            <div className="max-w-7xl mx-auto px-6 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/10'} backdrop-blur-lg p-8 rounded-2xl transition-colors duration-300`}>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Discover More
                  </h3>
                  <p className="text-white/90">
                    Immerse yourself in breathtaking views and unforgettable moments.
                  </p>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/10'} backdrop-blur-lg p-8 rounded-2xl transition-colors duration-300`}>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Plan Your Visit
                  </h3>
                  <p className="text-white/90">
                    Find the perfect time to witness this magnificent landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final content section */}
      <div className={`relative z-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Explore the Beauty
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover hidden gems and breathtaking vistas that will leave you speechless.
                Our carefully curated experiences ensure every moment is unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature5;