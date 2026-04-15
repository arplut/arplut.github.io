// Phrases with alternating colors matching UI_REFERENCE marquee
const phrases = [
  { text: 'Data for Awareness',      className: 'text-slate-400 font-medium' },
  { text: 'Data for Accountability', className: 'text-white font-bold' },
  { text: 'Data for Action',          className: 'text-primary font-bold' },
];

// Bullet separator — rendered between phrases, never leading or trailing a group
const Bullet = () => (
  <span className="text-slate-600 mx-6 font-normal select-none">•</span>
);

const ScrollingBanner = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-3">
      <div className="animate-scroll whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="inline-block">
            {phrases.map((phrase, index) => (
              <span key={index}>
                <span className={`text-sm tracking-wider uppercase ${phrase.className}`}>
                  {phrase.text}
                </span>
                {/* Bullet after each phrase (acts as separator before the next phrase / next repetition) */}
                <Bullet />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
