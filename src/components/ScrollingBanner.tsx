// Each phrase cycles through: muted → bright white → brand green (matching UI_REFERENCE marquee)
const phrases = [
  { text: 'Data for Awareness',     className: 'text-slate-400 font-medium' },
  { text: 'Data for Accountability', className: 'text-white font-bold' },
  { text: 'Data for Action',         className: 'text-primary font-bold' },
];

const ScrollingBanner = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-3">
      <div className="animate-scroll whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="inline-block">
            {phrases.map((phrase, index) => (
              <span key={index} className={`text-sm tracking-wider uppercase mx-8 ${phrase.className}`}>
                • {phrase.text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
