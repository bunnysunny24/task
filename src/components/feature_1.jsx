import React, { useState, useEffect } from 'react';

const InteractiveSentence = () => {
  const [activeWord, setActiveWord] = useState(null);
  const [displayedImages, setDisplayedImages] = useState([]);

  // Enhanced image collections for each word
  const wordImages = {
    reports: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop'
    ],
    forecasts: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop'
    ],
    dashboards: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    ],
    consolidations: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop'
    ]
  };
  // Define entry points from different edges with more varied positions
  const entryPoints = [
    { name: 'top-left', x: -300, y: -200, finalX: '20%', finalY: '20%' },
    { name: 'top-right', x: '100vw', y: -200, finalX: '70%', finalY: '20%' },
    { name: 'bottom-left', x: -300, y: '100vh', finalX: '25%', finalY: '70%' },
    { name: 'bottom-right', x: '100vw', y: '100vh', finalX: '75%', finalY: '70%' },
    { name: 'mid-left', x: -300, y: '50%', finalX: '15%', finalY: '45%' },
    { name: 'mid-right', x: '100vw', y: '50%', finalX: '85%', finalY: '45%' },
    { name: 'top-mid', x: '50%', y: -200, finalX: '45%', finalY: '15%' },
    { name: 'bottom-mid', x: '50%', y: '100vh', finalX: '55%', finalY: '85%' }
  ];

  const getRandomImages = (word) => {
    const images = wordImages[word];
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };  const handleWordHover = (word) => {
    if (wordImages[word]) {
      setActiveWord(word);
      
      const selectedImages = getRandomImages(word);
      const selectedEntryPoints = [...entryPoints].sort(() => 0.5 - Math.random()).slice(0, 4);
      
      // Create exactly 4 images with scattered positions
      const newImages = selectedImages.map((src, index) => ({
        id: `${word}-${index}-${Date.now()}`,
        src,
        entry: selectedEntryPoints[index],
        delay: index * 100, // Faster delay for more responsive hover
        rotation: Math.random() * 20 - 10 // Random rotation for variety
      }));
      
      setDisplayedImages(newImages);
    }
  };
  
  const handleWordLeave = () => {
    setActiveWord(null);
    setDisplayedImages([]);
  };

  const sentence = "Create reports, forecasts, dashboards & consolidations";
  const words = sentence.split(' ');

  const renderWord = (word, index) => {
    const cleanWord = word.replace(/[,&]/g, '');
    const isClickable = wordImages[cleanWord];
    const punctuation = word.match(/[,&]/g);
    const isActive = activeWord === cleanWord;

    return (
      <span key={index} className="inline-block">
        <span
          className={`transition-all duration-500 transform ${
            isClickable
              ? 'cursor-pointer hover:scale-110 active:scale-95'
              : ''
          } ${
            isActive
              ? 'text-yellow-300 drop-shadow-2xl scale-110 animate-pulse'
              : isClickable
              ? 'text-white hover:text-yellow-200 hover:drop-shadow-xl'
              : 'text-white/90'          }`}
          onMouseEnter={() => isClickable && handleWordHover(cleanWord)}
          onMouseLeave={() => isClickable && handleWordLeave()}
        >
          {cleanWord}
        </span>
        {punctuation && (
          <span className="text-white/80">{punctuation.join('')}</span>
        )}
        {index < words.length - 1 && <span className="text-white/80"> </span>}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <div
              className={`w-16 h-16 ${
                i % 3 === 0 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 rounded-full' 
                  : i % 3 === 1
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg rotate-45'
                  : 'bg-gradient-to-r from-pink-400 to-red-400 rounded-full'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header with ratings */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-wrap justify-center gap-3 text-white/80 text-sm">
          {[
            '⭐ 4.8 rating on Capterra',
            '⭐ 4.8 rating on G2', 
            '⭐ 350+ reviews on Xero',
            '⭐ 550+ reviews on QuickBooks'
          ].map((rating, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              {rating}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="text-center max-w-6xl">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
              {words.map(renderWord)}
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-spin-slow">
              ✨
            </div>
            <p className="text-white/90 text-2xl font-light">
              Now with AI-insights
            </p>
          </div>
          
          <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
            <span className="relative z-10">Start 14-day free trial →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>          
          {activeWord && (
            <p className="text-white/60 text-lg mt-8 animate-fade-in">
              Hover over different words to see various visuals
            </p>
          )}
        </div>
      </div>      {/* Dynamic images appearing from the background */}
      {displayedImages.map((image) => (
        <div
          key={image.id}
          className="fixed pointer-events-none z-30"
          style={{
            left: image.entry.finalX,
            top: image.entry.finalY,
            opacity: 0,
            transform: 'scale(0.2)',
            animation: `popIn 0.6s ease-out ${image.delay}ms forwards`
          }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
            <div className="relative">
              <img
                src={image.src}
                alt={`${activeWord} visualization`}
                className="w-72 h-48 object-cover rounded-lg shadow-2xl border-2 border-white/30"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${activeWord}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg drop-shadow-lg">                {activeWord}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(0deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.1) rotate(${Math.random() * 10 - 5}deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(${Math.random() * 10 - 5}deg);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSentence;