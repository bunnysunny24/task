import React, { useState, useEffect } from 'react';

const Feature5 = ({ isDarkMode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.feature-5-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);

        if (isInView) {
          const sectionTop = rect.top + window.scrollY;
          const relativeScroll = window.scrollY - sectionTop + window.innerHeight;
          setScrollY(Math.max(0, relativeScroll));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation ranges
  const textRange = [0, 300];
  const imageRange = [200, 600];
  const contentRange = [500, 700];

  // Calculate animation values only when section is visible
  const textProgress = isVisible ? Math.min(1, Math.max(0, (scrollY - textRange[0]) / (textRange[1] - textRange[0]))) : 0;
  const imageProgress = isVisible ? Math.min(1, Math.max(0, (scrollY - imageRange[0]) / (imageRange[1] - imageRange[0]))) : 0;
  const contentProgress = isVisible ? Math.min(1, Math.max(0, (scrollY - contentRange[0]) / (contentRange[1] - contentRange[0]))) : 0;

  return (
    <div className="feature-5-container relative">
      {/* Spacer to ensure proper positioning */}
      <div className="h-screen" />

      {/* Main content */}
      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 w-full h-full transform transition-all duration-300 ease-out will-change-transform"
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
            <div className={`absolute inset-0 bg-gradient-to-b ${
              isDarkMode 
                ? 'from-dark-bg/70 to-dark-bg/90' 
                : 'from-primary-900/30 to-primary-900/50'
            }`} />
          </div>

          {/* Text Layer */}
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
                <div className={`backdrop-blur-lg p-8 rounded-2xl transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-dark-card/80 text-dark-text border border-primary-700/30' 
                    : 'bg-primary-100/30 text-light-text border border-primary-200'
                }`}>
                  <h3 className="text-2xl font-bold mb-4">
                    Discover More
                  </h3>
                  <p className={isDarkMode ? 'text-dark-text/90' : 'text-light-text/90'}>
                    Immerse yourself in breathtaking views and unforgettable moments.
                  </p>
                </div>
                <div className={`backdrop-blur-lg p-8 rounded-2xl transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-dark-card/80 text-dark-text border border-primary-700/30' 
                    : 'bg-primary-100/30 text-light-text border border-primary-200'
                }`}>
                  <h3 className="text-2xl font-bold mb-4">
                    Plan Your Visit
                  </h3>
                  <p className={isDarkMode ? 'text-dark-text/90' : 'text-light-text/90'}>
                    Find the perfect time to witness this magnificent landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final content section */}
      <div className={`relative transition-colors duration-300 ${
        isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <h2 className={`text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-dark-text' : 'text-light-text'
              }`}>
                Explore the Beauty
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-dark-text/80' : 'text-light-text/80'
              }`}>
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