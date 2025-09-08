import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all images
import idealWind from "@/assets/ideal-wind.jpg";
import idealWater from "@/assets/ideal-water.jpg";
import idealElectricity from "@/assets/ideal-electricity.jpg";
import idealEarth from "@/assets/ideal-earth.jpg";
import realityWind from "@/assets/reality-wind.jpg";
import realityWater from "@/assets/reality-water.jpg";
import realityElectricity from "@/assets/reality-electricity.jpg";
import realityEarth from "@/assets/reality-earth.jpg";

const elementData = [
  {
    ideal: { img: idealWind, label: "Clean Wind Energy" },
    reality: { img: realityWind, label: "Air Pollution" },
    element: "Wind"
  },
  {
    ideal: { img: idealWater, label: "Abundant Clean Water" },
    reality: { img: realityWater, label: "Water Scarcity" },
    element: "Water"
  },
  {
    ideal: { img: idealElectricity, label: "Reliable Electricity" },
    reality: { img: realityElectricity, label: "Power Outages" },
    element: "Fire"
  },
  {
    ideal: { img: idealEarth, label: "Green Urban Spaces" },
    reality: { img: realityEarth, label: "Urban Waste" },
    element: "Earth"
  }
];

const FourElements = () => {
  const [currentState, setCurrentState] = useState(0);

  const titles = [
    "Click next to see what they look like today...",
    "This is what they should look like today. Click next again to see what they actually look like...",
    "This is what they actually look like today..."
  ];

  const getImageSet = () => {
    if (currentState === 0) return elementData.map(e => ({ img: e.ideal.img, label: e.element }));
    if (currentState === 1) return elementData.map(e => ({ img: e.ideal.img, label: e.ideal.label }));
    return elementData.map(e => ({ img: e.reality.img, label: e.reality.label }));
  };

  const handleNext = () => {
    if (currentState < 2) setCurrentState(currentState + 1);
  };

  const handlePrev = () => {
    if (currentState > 0) setCurrentState(currentState - 1);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            THE FOUR ELEMENTS OF{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              NATURE
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {getImageSet().map((item, index) => (
            <div 
              key={`${currentState}-${index}`}
              className="relative group overflow-hidden rounded-xl shadow-soft hover:shadow-glow transition-all duration-500 animate-slide-in-right"
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentState === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>PREVIOUS</span>
          </Button>
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={currentState === 2}
            className="flex items-center space-x-2"
          >
            <span>NEXT</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <h3 className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {titles[currentState]}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default FourElements;
