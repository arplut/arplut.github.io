"use client"

import { Container } from "./container"
import { useEffect, useState } from "react"
import { Flame, Droplet, Wind, Mountain } from "lucide-react"
import { useTranslation } from "react-i18next"

// Image data for elements
const elementImages = [
  {
    id: 1,
    icon: <Flame className="h-8 w-8" />,
    color: "from-red-500 to-orange-500",
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
  {
    id: 2,
    icon: <Droplet className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    icon: <Wind className="h-8 w-8" />,
    color: "from-gray-400 to-sky-400",
    textColor: "text-sky-700",
    bgColor: "bg-sky-100",
  },
  {
    id: 4,
    icon: <Mountain className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  }
]

export function DownloadSection() {
  const { t, i18n } = useTranslation()
  const isKannada = i18n.language === 'kn'
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCurrent, setShowCurrent] = useState(false);
  
  // Auto-advance through elements
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % elementImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + elementImages.length) % elementImages.length);
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % elementImages.length);
  };
  
  const toggleView = () => {
    setShowCurrent(!showCurrent);
  };
  
  // Get element data from translation based on active index
  const getElementTitle = () => {
    switch(activeIndex) {
      case 0: return t("environmental.element.fire.title");
      case 1: return t("environmental.element.water.title");
      case 2: return t("environmental.element.air.title");
      case 3: return t("environmental.element.earth.title");
      default: return "";
    }
  };
  
  const getElementDescription = (isCurrent: boolean) => {
    const elementKey = ["fire", "water", "air", "earth"][activeIndex];
    const descriptionType = isCurrent ? "currentDescription" : "pristineDescription";
    return t(`environmental.element.${elementKey}.${descriptionType}`);
  };
  
  return (
    <section id="elements" className="py-12 md:py-20 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium mb-4 animate-pulse">
              {t("environmental.awareness")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700">
              {t("environmental.whyImportant")}
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              {t("environmental.description")}
            </p>
          </div>
          
          {/* Element display area */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 mb-8 bg-gradient-to-br from-white to-gray-100">
            {/* Element image container */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r transition-all duration-700 ease-in-out"
                 style={{ backgroundImage: `linear-gradient(to right, ${showCurrent ? '#f87171' : '#10b981'}, ${showCurrent ? '#ef4444' : '#059669'})` }}>
              
              {/* Center content */}
              <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg max-w-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${elementImages[activeIndex].color} text-white mb-6`}>
                  {elementImages[activeIndex].icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                  {getElementTitle()}
                </h3>
                <p className="text-lg mb-6 font-medium">
                  {getElementDescription(showCurrent)}
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={toggleView}
                    className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                      showCurrent 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {showCurrent ? 
                      t("environmental.element.viewNaturalState") : 
                      t("environmental.element.viewCurrentState")
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation and element thumbnails */}
          <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {elementImages.map((element, index) => (
                <button
                  key={element.id}
                  onClick={() => setActiveIndex(index)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    index === activeIndex 
                      ? `${element.bgColor} shadow-lg scale-105` 
                      : 'bg-white/60 hover:bg-white/90'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${element.color} text-white`}>
                      {element.icon}
                    </div>
                    <p className={`mt-2 font-medium ${index === activeIndex ? element.textColor : 'text-gray-600'}`}>
                      {index === 0 ? t("environmental.element.fire.title") : 
                       index === 1 ? t("environmental.element.water.title") :
                       index === 2 ? t("environmental.element.air.title") :
                       t("environmental.element.earth.title")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handlePrevious}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                {t("environmental.element.previous")}
              </button>
              <button 
                onClick={handleNext}
                className="px-6 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors duration-300"
              >
                {t("environmental.element.next")}
              </button>
            </div>
            
            <p id="elementDescription" className="text-center text-lg font-medium mt-6 text-gray-700">
              {t("environmental.element.clickNext")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}