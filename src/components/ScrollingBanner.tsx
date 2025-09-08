const ScrollingBanner = () => {
  const phrases = ["Data for Awareness", "Data for Accountability", "Data for Action"];
  
  return (
    <div className="relative overflow-hidden bg-primary/5 border-y border-primary/10">
      <div className="animate-scroll whitespace-nowrap py-3">
        {/* Repeat the phrases multiple times to create seamless scrolling */}
        {[...Array(6)].map((_, i) => (
          <span key={i} className="inline-block text-sm font-medium text-primary">
            {phrases.map((phrase, index) => (
              <span key={index}>
                {phrase}
                <span className="mx-6">•</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;

