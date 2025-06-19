import React, { useState, useEffect } from 'react';

const AppleVisionScrollUI = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation thresholds
  const textAnimationEnd = 400; // When text finishes moving up
  const imageAnimationStart = textAnimationEnd; // When image starts moving up

  // Text animation (moves up while component is sticky)
  const textTranslateY = Math.min(scrollY * 1.2, textAnimationEnd * 1.2);
  const textOpacity = Math.max(0, 1 - scrollY / 300);

  // Image animation (starts after text animation ends)
  const imageTranslateY = scrollY > imageAnimationStart ? (scrollY - imageAnimationStart) * 0.8 : 0;

  // Component stickiness - sticky until text animation completes
  const isSticky = scrollY < textAnimationEnd;

  return (
    <div className="relative">
      {/* Spacer to create scroll distance */}
      <div className="h-screen"></div>

      {/* Hero Section - Sticky until text animation completes */}
      <div 
        className={`${isSticky ? 'fixed' : 'relative'} top-0 left-0 w-full h-screen overflow-hidden z-10`}
        style={{
          transform: !isSticky ? `translateY(-${imageTranslateY}px)` : 'translateY(0)'
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80" 
            alt="Modern room interior"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Video Call Interface Mockup */}
        <div className="absolute top-1/4 left-8 w-64 h-48 bg-black bg-opacity-40 rounded-2xl backdrop-blur-md border border-white border-opacity-20 shadow-2xl">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Connection</span>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white bg-opacity-40 rounded-full"></div>
              </div>
            </div>
            <div className="mt-2 text-white text-xs opacity-75">Los Angeles • May 5, 1:56 PM</div>
          </div>
        </div>

        {/* Photos on Surface */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-12 h-16 bg-green-400 rounded-sm shadow-lg"></div>
            <div className="w-12 h-16 bg-blue-400 rounded-sm shadow-lg"></div>
            <div className="w-12 h-16 bg-purple-400 rounded-sm shadow-lg"></div>
            <div className="w-12 h-16 bg-orange-400 rounded-sm shadow-lg"></div>
            <div className="w-12 h-16 bg-pink-400 rounded-sm shadow-lg"></div>
          </div>
        </div>

        {/* Main Text Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-center z-10 transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(-${textTranslateY}px)`,
            opacity: textOpacity
          }}
        >
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Share quality time.
              <br />
              <span className="text-4xl md:text-6xl">And space.</span>
            </h1>
          </div>
        </div>

        {/* Scroll indicator - only show when sticky */}
        {isSticky && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
            <div className="flex flex-col items-center">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
              </div>
              <span className="text-sm mt-2">Scroll</span>
            </div>
          </div>
        )}
      </div>

      {/* Spacer for smooth transition */}
      <div className="h-screen"></div>

      {/* Content Section */}
      <div className="relative z-20 bg-white">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
                A more engaging way to get together.
              </h2>
            </div>
            <div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Apple Vision Pro makes it easy to collaborate and connect wherever you are. You can see FaceTime participants in life-size video tiles, or you can choose to use your spatial Persona and feel like you are sharing the same space with others. And use SharePlay to watch, listen, and play together with your favorite people.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 flex items-center space-x-2">
                <span className="text-2xl">+</span>
                <span>Learn more about connection</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional content sections */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">Spatial Computing</h3>
                <p className="text-gray-600">Experience apps and content in ways never before possible with revolutionary spatial computing technology.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">Immersive Experiences</h3>
                <p className="text-gray-600">Step into incredible immersive experiences that transport you to new worlds and dimensions.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">Seamless Integration</h3>
                <p className="text-gray-600">Connect seamlessly with your digital world while staying present in your physical space.</p>
              </div>
            </div>
          </div>
        </div>

        {/* More content for scrolling */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-black mb-8">The future is here</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover new ways to work, play, and connect with the world around you through groundbreaking spatial computing technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleVisionScrollUI;