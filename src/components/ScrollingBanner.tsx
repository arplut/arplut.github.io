const ScrollingBanner = () => {
  const phrases = ["Data for Awareness", "Data for Accountability", "Data for Action"];

  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground py-4 shadow-inner">
      <div className="animate-scroll whitespace-nowrap flex items-center">
        {/* Repeat the phrases multiple times to create seamless scrolling */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center">
            {phrases.map((phrase, index) => (
              <div key={index} className="flex items-center mx-8">
                <span className="text-sm font-bold tracking-wider uppercase opacity-90">
                  {phrase}
                </span>
                <span className="ml-8 h-1.5 w-1.5 rounded-full bg-white/40" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;

