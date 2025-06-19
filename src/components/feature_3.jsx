import React, { useState, useEffect, useRef } from 'react';
import { Car, Building, BookOpen, Calendar, BarChart, LineChart, Activity, TrendingUp } from 'lucide-react';

const BSSOSSSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animatingSection, setAnimatingSection] = useState(false);
  const [buttonExpanded, setButtonExpanded] = useState(false);
  const [animationStage, setAnimationStage] = useState('button'); // 'button', 'timeSeries', 'content'
  const [currentButtonWidth, setCurrentButtonWidth] = useState(160); // Track current button width
  const [previousIndex, setPreviousIndex] = useState(null); // Track previous index for transitions
  const timeSeriesRef = useRef(null);
  const buttonRefs = useRef([]);
  
  const sections = [
    {
      id: 'billing',
      title: 'BILLING',
      icon: Car,
      color: 'bg-pink-300',
      chartIcon: BarChart,
      timeSeriesData: [25, 36, 18, 45, 28, 52, 68, 75, 62, 48, 55, 70],
      content: {
        title: 'Real-Time Convergent Billing',
        description: 'Instantaneous, accurate billing across all services and payment methods.',
        stats: [
          { label: 'Estimated Invoices', value: '112 355' },
          { label: 'Estimated Duration', value: '45 MIN' },
          { label: 'Current period end', value: '17 DAYS' }
        ]
      }
    },
    {
      id: 'charging',
      title: 'CHARGING',
      icon: Building,
      color: 'bg-yellow-300',
      chartIcon: LineChart,
      timeSeriesData: [40, 32, 45, 65, 58, 38, 42, 58, 70, 82, 75, 60],
      content: {
        title: 'Online Charging System',
        description: 'AI-powered insights that predict customer needs and drive personalized experiences.',
        pricing: '€0.00/min',
        phone: '+1 (415) 678-2345'
      }
    },
    {
      id: 'catalog',
      title: 'CATALOG',
      icon: BookOpen,
      color: 'bg-green-300',
      chartIcon: Activity,
      timeSeriesData: [30, 45, 35, 28, 40, 55, 70, 65, 50, 42, 60, 75],
      content: {
        title: 'Product Catalog',
        description: 'Intuitive tools that empower customers to manage their accounts with ease, freeing up your team.',
        features: ['Netflix', 'Apple', 'Spotify'],
        plan: 'TOTAL UNLIMITED'
      }
    },
    {
      id: 'events',
      title: 'EVENTS',
      icon: Calendar,
      color: 'bg-cyan-300',
      chartIcon: TrendingUp,
      timeSeriesData: [20, 35, 30, 45, 55, 40, 50, 65, 75, 60, 45, 70],
      content: {
        title: 'Event Management',
        description: 'Comprehensive event tracking and management system for all customer interactions.',
        metrics: ['Real-time processing', 'Event correlation', 'Analytics dashboard']
      }
    }
  ];
  
  const SECTION_DURATION = 8000; // 8 seconds per section to allow for animations
  const BUTTON_ANIMATION_DURATION = 1000; // 1 second for button expansion
  const MIN_BUTTON_WIDTH = 160; // Minimum button width
  const MAX_BUTTON_WIDTH = 320; // Maximum expanded button width
  
  // Animation sequence handling
  useEffect(() => {
    let buttonAnimationTimeout;
    let timeSeriesAnimationTimeout;
    let contentAnimationTimeout;
    let buttonWidthAnimationInterval;
    
    if (progress === 0) {
      // Reset all animations at the start of a new section
      setButtonExpanded(false);
      setAnimatingSection(false);
      setAnimationStage('button');
      setCurrentButtonWidth(MIN_BUTTON_WIDTH); // Reset to default width
      
      // Reset time series animations
      const timeSeriesPoints = document.querySelectorAll('.time-series-point');
      timeSeriesPoints.forEach(point => {
        point.classList.remove('active');
      });
      
      if (timeSeriesRef.current) {
        timeSeriesRef.current.classList.remove('expanded');
      }
      
      // Step 1: Trigger button expansion after a short delay
      buttonAnimationTimeout = setTimeout(() => {
        setButtonExpanded(true);
        setAnimationStage('button');
        
        // Gradually increase button width
        let startWidth = MIN_BUTTON_WIDTH;
        const targetWidth = MAX_BUTTON_WIDTH;
        const steps = 15; // Number of steps for smooth animation
        const stepIncrement = (targetWidth - startWidth) / steps;
        let currentStep = 0;
        
        buttonWidthAnimationInterval = setInterval(() => {
          if (currentStep < steps) {
            currentStep++;
            setCurrentButtonWidth(startWidth + (stepIncrement * currentStep));
          } else {
            clearInterval(buttonWidthAnimationInterval);
            
            // Step 2: After button expansion completes, start time series animation
            timeSeriesAnimationTimeout = setTimeout(() => {
              setAnimationStage('timeSeries');
              setAnimatingSection(true);
              
              // Animate the time series
              const timeSeriesPoints = document.querySelectorAll('.time-series-point');
              timeSeriesPoints.forEach((point, idx) => {
                setTimeout(() => {
                  point.classList.add('active');
                }, idx * 100); // Stagger the animation
              });
              
              // Animate the section expansion
              if (timeSeriesRef.current) {
                setTimeout(() => {
                  timeSeriesRef.current.classList.add('expanded');
                }, 300);
              }
              
              // Step 3: After time series animation, animate content
              contentAnimationTimeout = setTimeout(() => {
                setAnimationStage('content');
              }, 2000); // Allow time for time series to complete
            }, 500); // Start time series after button expansion
          }
        }, 50); // Update width every 50ms for smooth animation
      }, 300); // Short delay before starting button animation
    }
    
    // Clean up all timeouts and intervals when component unmounts or section changes
    return () => {
      clearTimeout(buttonAnimationTimeout);
      clearTimeout(timeSeriesAnimationTimeout);
      clearTimeout(contentAnimationTimeout);
      clearInterval(buttonWidthAnimationInterval);
    };
  }, [progress]);
    // Main progress interval
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Save current index as previous before changing
          setPreviousIndex(activeIndex);
          
          // Move to the next section
          setActiveIndex(prevIndex => (prevIndex + 1) % sections.length);
          
          // Reset button width at section change
          setCurrentButtonWidth(MIN_BUTTON_WIDTH);
          return 0;
        }
        return prev + (100 / (SECTION_DURATION / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex]); // sections.length is static and doesn't need to be in dependencies

  const handleSectionClick = (index) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    setProgress(0);
    setButtonExpanded(false);
    setAnimatingSection(false);
    setAnimationStage('button');
    setCurrentButtonWidth(MIN_BUTTON_WIDTH);
  };

  const renderTimeSeries = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div 
        ref={timeSeriesRef} 
        className={`time-series-container transition-all duration-1000 ease-in-out overflow-hidden ${color.replace('bg-', 'border-')}`}
      >
        <div className="relative h-40 w-full flex items-end">
          {data.map((value, index) => {
            const height = ((value - min) / range) * 100;
            return (
              <div 
                key={index}
                className={`time-series-point mx-1 rounded-t-md transition-all duration-500 ease-out transform opacity-0 ${color}`}
                style={{ 
                  height: `${height}%`, 
                  width: '8%',
                  transitionDelay: `${index * 100}ms`,
                  transform: 'translateY(100%)'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    const section = sections[activeIndex];
    
    switch (section.id) {
      case 'billing':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">EMS</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-6">Billing Analytics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {section.content.stats.map((stat, idx) => (
                <div key={idx} className="p-3">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'charging':
        return (
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="bg-white rounded-xl p-4 shadow-lg mb-4 md:mb-0 md:mr-4">
              <div className="text-sm text-gray-500 mb-1">ASAP →</div>
              <div className="text-2xl font-bold">{section.content.pricing}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg mb-4 md:mb-0 md:mr-4">
              <div className="text-sm text-gray-500 mb-2">TRAFFIC TYPE</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">📍 COUNTRY +</div>
                <div className="flex items-center text-sm">📞 CALL TYPE +</div>
                <div className="flex items-center text-sm">🎯 ZONE +</div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
              <div className="text-xs mb-2">9:41 📶 📶 🔋</div>
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mb-2">
                📞
              </div>
              <div className="text-sm">{section.content.phone}</div>
              <div className="text-xs text-gray-400">Calling</div>
            </div>
          </div>
        );
      
      case 'catalog':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-sm text-gray-500 mb-4">+ ADD-ONS</div>
            <div className="flex space-x-2 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center text-white font-bold">N</div>
              <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">🍎</div>
            </div>
            <div className="flex space-x-2 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">♪</div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="text-sm text-gray-500 mb-1">MOBILEAPP ONLY →</div>
              <div className="text-xl font-bold mb-2">{section.content.plan}</div>
              <div className="text-sm text-gray-500">✓ Unlimited minutes</div>
            </div>
          </div>
        );
      
      case 'events':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Event Processing</h3>
            <div className="space-y-3">
              {section.content.metrics.map((metric, idx) => (
                <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderContent = () => {
    const section = sections[activeIndex];
    const ChartIcon = section.chartIcon;
    
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 transition-all duration-1000">
        <div className="flex items-center mb-8">
          <div className={`p-3 rounded-xl ${section.color} mr-4 ${animationStage !== 'button' ? 'animate-bounce-subtle' : ''}`}>
            <ChartIcon size={28} className="text-gray-800" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{section.content.title}</h2>
            <p className="text-gray-600">{section.content.description}</p>
          </div>
        </div>
        
        {/* Time Series Visualization - Only show when in timeSeries or content stages */}
        <div className={`mb-8 transition-all duration-1000 
                        ${animationStage === 'button' ? 'opacity-0 max-h-0 overflow-hidden' : 
                          animationStage === 'timeSeries' ? 'opacity-100 max-h-[300px]' : 'opacity-100 max-h-[300px]'}`}>
          {renderTimeSeries(section.timeSeriesData, section.color)}
        </div>
        
        {/* Section Specific Content - Only fully visible in content stage */}
        <div className={`transition-all duration-1000 
                        ${animationStage === 'content' ? 'opacity-100 transform translate-y-0' : 
                          'opacity-0 transform translate-y-8'}`}>
          {renderSectionContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-500 mb-2 tracking-wider">
            ( EFFICIENCY, SCALABILITY, AND AGILITY )
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-gray-300">Unparalleled</span>
          </h1>
          <h1 className="text-5xl lg:text-6xl font-bold">
            <span className="text-gray-800">BSS/OSS </span>
            <span className="text-gray-600 italic">Capabilities</span>
          </h1>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === activeIndex;
              
              return (
                <button
                  key={section.id}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleSectionClick(index)}
                  className={`
                    relative overflow-hidden px-6 py-4 rounded-2xl flex items-center space-x-3 
                    transition-all duration-700 ease-in-out
                    ${isActive ? 'shadow-lg' : 'opacity-70 hover:opacity-90'}
                    ${isActive && buttonExpanded ? 'button-expanded' : ''}
                  `}
                  style={{
                    background: isActive 
                      ? `linear-gradient(90deg, ${section.color.replace('bg-', '').replace('-300', '')} 0%, ${section.color.replace('bg-', '').replace('-300', '')} ${progress}%, rgba(255,255,255,0.8) ${progress}%, rgba(255,255,255,0.8) 100%)`
                      : 'rgba(255,255,255,0.8)',
                    width: isActive ? `${currentButtonWidth}px` : `${MIN_BUTTON_WIDTH}px`,
                    maxWidth: isActive ? `${MAX_BUTTON_WIDTH}px` : `${MIN_BUTTON_WIDTH}px`,
                    transform: isActive && buttonExpanded ? 'scale(1.05)' : isActive ? 'scale(1.02)' : 'scale(1)',
                    transitionProperty: 'all',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '700ms',
                    boxShadow: isActive && buttonExpanded ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
                  }}
                >
                  <div className={`p-2 rounded-lg ${section.color} transition-all duration-500 ${isActive && buttonExpanded ? 'scale-110' : ''}`}>
                    <Icon size={isActive && buttonExpanded ? 24 : 20} className="text-gray-700 transition-all duration-500" />
                  </div>
                  <span className={`font-semibold text-gray-800 tracking-wider transition-all duration-500 ${isActive && buttonExpanded ? 'text-lg' : 'text-sm'}`}>
                    {section.title}
                  </span>
                  
                  {/* Progress bar overlay for active button */}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-gray-600 transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-8">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-gray-800 rounded-2xl p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-8">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>↑</span>
              <span>PRODUCTS</span>
              <span>+</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>SOLUTIONS</span>
              <span>+</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>RESOURCES</span>
              <span>+</span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              SERVICES
            </button>
          </div>
          <button className="bg-cyan-400 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
            BOOK A MEETING
          </button>
        </div>
      </div>
      
      <style>{`
        .time-series-container {
          border-left: 2px solid;
          border-bottom: 2px solid;
          padding: 10px;
          transform: scaleX(0.2);
          transform-origin: left;
          transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .time-series-container.expanded {
          transform: scaleX(1);
        }
        
        .time-series-point {
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .time-series-point.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes button-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          50% { box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        
        .button-expanded {
          animation: button-pulse 2s infinite;
          position: relative;
          overflow: hidden;
        }
        
        .button-expanded::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
          animation: button-shine 1.5s infinite;
        }
        
        @keyframes button-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BSSOSSSlideshow;