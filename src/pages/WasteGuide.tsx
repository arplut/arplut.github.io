import { useState, useMemo, useEffect, useRef } from 'react';

// ── Colour tokens (matching GEODHA + guide palette) ───────────────────────────
const C = {
  greenDark:  '#1B4332',
  green:      '#2D6A4F',
  greenMid:   '#52B788',
  greenLight: '#D8F3DC',
  blue:       '#1A5276',
  blueMid:    '#2E86C1',
  blueLight:  '#D6EAF8',
  red:        '#922B21',
  redMid:     '#E74C3C',
  redLight:   '#FADBD8',
  black:      '#1C1C1C',
  blackLight: '#E8E8E6',
  blackMid:   '#555555',
  amber:      '#B7410E',
  amberLight: '#FEF3C7',
  gap:        '#6B21A8',
  gapLight:   '#F3E8FF',
  bg:         '#FAFAF7',
  border:     '#E5E5E0',
  text:       '#1A1A18',
  textSec:    '#5A5A56',
  white:      '#FFFFFF',
} as const;

// ── Data ──────────────────────────────────────────────────────────────────────

const BINS = [
  {
    id: 'green',
    color: 'green' as const,
    label: 'Green Bin',
    name: 'Wet Waste',
    subtitle: '— Biodegradable',
    emoji: '🟢',
    pills: ['🕐 Collected Daily', '🚫 No liner', '🪣 Lidded bucket'],
    badge: null,
    rules: [
      { bold: 'No plastic liner', rest: ' — not even compostable or biodegradable bags. Use dry leaves or old compost at the base instead.' },
      { bold: 'No "compostable" bags either', rest: " — they don't break down fast enough and contaminate the composting process." },
      { bold: 'Bin must have a lid', rest: ' — prevents animals and odour.' },
      { bold: null, rest: 'Rinse bin regularly to prevent buildup.' },
      { bold: null, rest: 'Free browns (dry leaves) can be provided for home composting — check with your ward.' },
    ],
    items: null,
    itemPills: null,
    destination: 'In-situ composting on your premises OR collected by BSWML and taken to a centralised composting facility or biogas unit.',
  },
  {
    id: 'blue',
    color: 'blue' as const,
    label: 'Blue Bin / Bag',
    name: 'Dry Waste',
    subtitle: '— Recyclable',
    emoji: '🔵',
    pills: ['🕐 Twice a week', '✨ Must be clean & dry'],
    badge: null,
    rules: [
      { bold: 'Must be clean and dry', rest: ' — rinse all containers before placing in dry waste. Food residue contaminates the entire load.' },
      { bold: 'Do not cut corners of packaging', rest: ' — slice through one side only. Intact material is easier to recycle.' },
      { bold: 'Flatten all cardboard boxes', rest: ' — reduces volume, improves collection efficiency.' },
      { bold: 'No small snips of plastic', rest: ' — too small for mechanical recovery. Falls through sorting machinery.' },
      { bold: 'Only 70% of dry waste is actually recyclable', rest: ' — clean segregation protects that 70%. Contamination drops recovery to near zero.' },
    ],
    items: null,
    itemPills: null,
    destination: "Dry Waste Collection Centre (DWCC) → sorted → plastics and paper to KSPCB-approved recycler. The genuinely unrecyclable 30% goes to incineration.",
  },
  {
    id: 'red',
    color: 'red' as const,
    label: 'Red Bin · 5 Litres',
    name: 'Sanitary Waste',
    subtitle: null,
    emoji: '🔴',
    pills: ['🕐 Collected Daily', '🟡 Yellow bags only'],
    badge: { text: 'Critical rules', type: 'critical' },
    rules: [
      { bold: 'Use yellow non-chlorinated bags only', rest: ' for lining this bin.' },
      { bold: 'NO metal needles or syringes', rest: ' — these must go in the black bin (Special Care), not here. They cause serious injury to waste workers and damage incineration equipment. This is the most critical rule in this entire guide.' },
      { bold: null, rest: 'No biomedical sharps of any kind in the red bin.' },
      { bold: null, rest: 'Undergarments can go here.' },
      { bold: null, rest: 'Families with infants: daily collection is mandatory — escalate if collection is missed.' },
    ],
    items: null,
    itemPills: null,
    destination: 'Incineration. 4 zones in Bengaluru have active tenders. Approximately 250 tonnes of sanitary waste is generated across the city daily.',
  },
  {
    id: 'black',
    color: 'black' as const,
    label: 'Black Bin',
    name: 'Special Care',
    subtitle: '— Hazardous',
    emoji: '⚫',
    pills: ['🕐 Once a month', '🔒 Store safely'],
    badge: null,
    rules: [
      { bold: 'Store safely inside premises', rest: ' between monthly collections. Use a hard plastic container with a lid for items like syringes and razors.' },
      { bold: 'Never give e-waste to unauthorized scrap dealers', rest: ' — harmful chemicals, no safe processing. Serious health and legal risk.' },
      { bold: 'Donate unused medicines', rest: ' rather than disposing — ask your pharmacist or check with your RWA for donation points.' },
      { bold: 'Put syringes and razors in a hard plastic container before placing in black bin', rest: ' — protects waste workers.' },
      { bold: null, rest: 'Empty, fully dried paint cans → dry waste. Partially full or liquid paint → black bin only.' },
      { bold: null, rest: 'Empty and fully depressurised aerosol cans → dry waste. Partially full → black bin.' },
    ],
    items: 'What goes in — includes',
    itemPills: ['💉 Syringes & needles', '🪟 Broken glass', '🎨 Paint cans', '🔋 Batteries', '💊 Expired medicines', '🪒 Razors & blades', '💡 CFL / fluorescent tubes'],
    destination: 'Transported to authorised handlers and specialised processing facilities. CFL tubes (contain mercury) and batteries require specific authorised handlers.',
  },
] as const;

type BinColor = 'green' | 'blue' | 'red' | 'black';

const BIN_STYLES: Record<BinColor, { iconBg: string; labelColor: string; nameColor: string; destBg: string; destColor: string }> = {
  green: { iconBg: C.greenLight, labelColor: C.green, nameColor: C.greenDark, destBg: C.greenLight, destColor: C.greenDark },
  blue:  { iconBg: C.blueLight,  labelColor: C.blueMid, nameColor: C.blue,     destBg: C.blueLight,  destColor: C.blue },
  red:   { iconBg: C.redLight,   labelColor: C.redMid,  nameColor: C.red,      destBg: C.redLight,   destColor: C.red },
  black: { iconBg: C.blackLight, labelColor: C.blackMid, nameColor: C.black,   destBg: C.blackLight, destColor: C.black },
};

const DROP_POINTS = [
  {
    name: '🌿 Garden & Leaf Waste',
    desc: 'Nearest community drop point. Some wards have street leaf composters. Check with your ward office or BBMP marshal for your nearest point.',
    tags: [{ label: 'Drop point', style: 'green' as const }],
    severity: 'soft' as const,
  },
  {
    name: '🧱 Construction & Demolition Waste',
    desc: "Large quantities require private disposal. Generators are legally required under SWM 2026 to store on premises and transport to a C&D facility. On-demand collection is available. Do not dump on streets — this is the leading cause of black spots.",
    tags: [{ label: 'On demand', style: 'black' as const }, { label: 'Legal obligation', style: 'reduce' as const }],
    severity: 'medium' as const,
  },
  {
    name: '📱 E-Waste',
    desc: 'Store on premises. Quarterly collection by authorised handlers only. Sahas is a recommended e-waste handler in Bengaluru. Never give to informal scrap dealers.',
    tags: [{ label: 'Quarterly', style: 'black' as const }],
    severity: 'medium' as const,
  },
  {
    name: '🛋 Bulky Waste',
    desc: 'Sofas, beds, large furniture. Store on premises. Monthly collection under SWM 2026 new vehicle programme.',
    tags: [{ label: 'Monthly', style: 'black' as const }],
    severity: 'soft' as const,
  },
  {
    name: '👕 Textile Waste',
    desc: 'Half-yearly. Organise donations, thrift stores, or send to textile recycling centres. Reuse and donation first before recycling.',
    tags: [{ label: 'Half-yearly', style: 'blue' as const }, { label: 'Donate first', style: 'reduce' as const }],
    severity: 'soft' as const,
  },
  {
    name: '🥥 Coconut Shells',
    desc: "High volume in Bengaluru households. Technically wet waste but take extremely long to break down. Most composting facilities don't want them. Garden waste drop point is the better option.",
    tags: [{ label: 'Garden waste point', style: 'green' as const }],
    severity: 'soft' as const,
  },
];

type FilterCat = 'all' | 'food' | 'plastic' | 'hazardous' | 'gap';
type ConflictSeverity = 'hard' | 'medium' | 'soft';
type TagStyle = 'green' | 'blue' | 'red' | 'black' | 'reduce' | 'gap';

interface ConflictItem {
  name: string;
  desc: string;
  tags: { label: string; style: TagStyle }[];
  severity: ConflictSeverity;
  cat: FilterCat;
}

const CONFLICT_ITEMS: ConflictItem[] = [
  { name: '🥡 Food-soiled takeaway plastic', desc: 'Lightly soiled: rinse and blue bin. Heavily soiled: wet waste. Multilayer laminate pouches (chips bags, sauce sachets): blue bin regardless — they\'ll be incinerated either way. Most people won\'t rinse. Be realistic.', tags: [{ label: 'Blue if rinsed', style: 'blue' }, { label: 'Wet if soiled', style: 'green' }], severity: 'medium', cat: 'food' },
  { name: '🫓 Pizza boxes & food-soiled cardboard', desc: 'Top half clean → blue bin. Bottom half soiled → wet waste. Tear and split. If heavily soiled throughout, put entire box in wet waste — food residue in blue bin contaminates surrounding dry waste.', tags: [{ label: 'Top half', style: 'blue' }, { label: 'Bottom half', style: 'green' }], severity: 'medium', cat: 'food' },
  { name: '🫙 Aluminium foil & foil packaging', desc: "Clean foil: blue bin, recyclable. Used cooking foil: usually food-soiled, not worth rinsing. Foil-lined packaging (juice cartons, coffee pouches, biscuit wrappers): blue bin — not recyclable in Bengaluru's current infrastructure, will be incinerated.", tags: [{ label: 'Blue bin', style: 'blue' }], severity: 'medium', cat: 'food' },
  { name: '🧻 Greasy paper & food-wrapping tissue', desc: 'Not recyclable when soiled. Not ideal for composting but acceptable. Wet waste is the least-bad option.', tags: [{ label: 'Wet waste', style: 'green' }], severity: 'soft', cat: 'food' },
  { name: '🍽 Paper cups & plates', desc: "Paper cups have a plastic lining — not compostable, not recyclable. Technically special care or reject waste. In practice they go in blue bin and get incinerated. The honest answer: these should not exist. If they do, blue bin.", tags: [{ label: 'Blue bin', style: 'blue' }, { label: 'Avoid entirely', style: 'reduce' }], severity: 'hard', cat: 'food' },
  { name: '🛍 Multilayer flexible packaging', desc: "Chips bags, biscuit wrappers, sauce pouches, toothpaste tubes. Blue bin by default but not actually recyclable in Bengaluru's current infrastructure. They go to incineration. The guide won't pretend otherwise.", tags: [{ label: 'Blue bin', style: 'blue' }, { label: 'Reduce generation', style: 'reduce' }], severity: 'hard', cat: 'plastic' },
  { name: '🟫 Black plastic containers', desc: "Takeaway boxes, dark trays. Technically recyclable plastic but carbon black pigment makes them invisible to optical sorting machines. Effectively unrecyclable. Blue bin — will be incinerated.", tags: [{ label: 'Blue bin', style: 'blue' }], severity: 'hard', cat: 'plastic' },
  { name: '🫧 Bubble wrap & soft plastics', desc: "Technically recyclable but clogs machinery at most DWCCs. Some facilities accept it, most don't. Blue bin with caveat — check what your ward's DWCC accepts.", tags: [{ label: 'Blue bin', style: 'blue' }], severity: 'medium', cat: 'plastic' },
  { name: '💉 Syringes — home medical use', desc: 'Black bin (Special Care) only. Never red bin (sanitary) — needles cause serious injury to waste workers and damage incineration equipment. Store in a hard plastic container with a lid between monthly collections.', tags: [{ label: 'Black bin only', style: 'black' }], severity: 'hard', cat: 'hazardous' },
  { name: '💡 CFL & fluorescent tubes', desc: 'E-waste / Special Care. Contain mercury — never in dry waste or regular bins. Extremely commonly disposed incorrectly. Quarterly authorised collection only.', tags: [{ label: 'Black bin', style: 'black' }], severity: 'hard', cat: 'hazardous' },
  { name: '🎨 Paint cans', desc: 'Empty, fully dried paint cans: dry waste / blue bin. Partially full or liquid paint: black bin only. Never pour liquid paint down the drain.', tags: [{ label: 'Empty: blue bin', style: 'blue' }, { label: 'Liquid: black bin', style: 'black' }], severity: 'medium', cat: 'hazardous' },
  { name: '💊 Expired medicines', desc: "Black bin for disposal. But first — consider donating unexpired medicines. Ask your pharmacist or RWA for donation drop points. Blister packs go whole into black bin — don't separate foil from plastic.", tags: [{ label: 'Black bin', style: 'black' }, { label: 'Donate unexpired', style: 'reduce' }], severity: 'medium', cat: 'hazardous' },
  { name: '🦴 Bones and meat waste', desc: "Technically wet waste but causes odour and attracts animals. Biogas units accept it and it's the best destination — but not always accessible. Wet waste if biogas isn't available nearby.", tags: [{ label: 'Wet waste', style: 'green' }], severity: 'medium', cat: 'food' },
  { name: '🌺 Flowers & puja waste', desc: 'Flowers are compostable — wet waste. But mixed puja waste often includes plastic, foil, synthetic materials. Separate before composting. High volume, especially post-festivals.', tags: [{ label: 'Wet waste (separated)', style: 'green' }], severity: 'soft', cat: 'food' },
  { name: '🍳 Cooking oil', desc: "Never in any bin. Community collection programmes exist in some areas. Reuse where possible. This is a genuine gap in Bengaluru's current system — no consistent disposal route exists for most households.", tags: [{ label: 'System gap', style: 'gap' }], severity: 'hard', cat: 'gap' },
  { name: '🧾 Thermal paper receipts', desc: "Blue bin by default but thermal coating means they're not actually recyclable. Reject waste is the most honest category. The system doesn't have a good answer for this yet.", tags: [{ label: 'System gap', style: 'gap' }, { label: 'Blue bin (practical)', style: 'blue' }], severity: 'hard', cat: 'gap' },
  { name: '🪞 Mirrors & ceramics', desc: "Not recyclable glass, not C&D waste exactly. Should go to community drop points as bulky or special waste. Not well addressed by the current system — avoid putting in dry waste as it damages sorting machinery.", tags: [{ label: 'Drop point', style: 'gap' }], severity: 'medium', cat: 'gap' },
  { name: '☕ Tetrapak / juice cartons', desc: "Paper, plastic, and aluminium laminated together. Rinse, flatten, blue bin. Some Bengaluru recyclers accept them but not all DWCCs — check with your ward's DWCC for current status.", tags: [{ label: 'Blue bin (rinsed)', style: 'blue' }], severity: 'medium', cat: 'plastic' },
];

const MISTAKES = [
  { icon: '🛍', title: 'Plastic liner in green bin', desc: 'Even "compostable" bags prevent the wet waste from composting properly. Use dry leaves or old compost at the base instead. Fine: ₹1,000 — marshals are authorised to issue this.' },
  { icon: '💉', title: 'Syringes in red bin', desc: 'Metal needles in sanitary waste cause serious injury to waste workers and damage incineration equipment. Syringes go in black bin only, stored in a hard plastic container.' },
  { icon: '🤝', title: 'E-waste to kabadiwala', desc: 'Informal scrap dealers cannot safely process e-waste. Toxic metals cause serious health damage. Use Sahas or authorised quarterly collection only.' },
  { icon: '🔥', title: 'Open burning', desc: 'Illegal. Causes cancer-level air pollution. Burning leaves is also illegal — composting is the alternative. Document and report via GEODHA or to your ward marshal.' },
  { icon: '🍕', title: 'Soiled packaging in blue bin', desc: 'Food residue on dry waste contaminates the entire load. Rinse before placing in blue bin. Heavily soiled items go in wet waste instead.' },
  { icon: '💡', title: 'CFL tubes in dry waste', desc: 'CFL tubes contain mercury. Never in regular bins. Quarterly authorised e-waste collection or black bin special care only.' },
];

const ESCALATION_STEPS = [
  { step: 'Step 1', title: 'Document it', desc: 'Take a photo with GPS location enabled. Note the time and exact address. This is your evidence — without it, complaints are easy to dismiss.' },
  { step: 'Step 2', title: 'File a complaint', desc: "Report via GEODHA (files directly to BBMP Sahaaya) or via the BBMP Sahaaya portal directly. You'll receive a complaint reference number." },
  { step: 'Step 3', title: 'Contact your ward marshal', desc: 'BBMP marshals are authorised to issue on-the-spot fines. Share your photo and complaint reference. Marshals don\'t mind awareness drives on weekends and are generally responsive when approached as a team.' },
  { step: 'Step 4', title: "Don't go alone", desc: "Elected representatives listen to a team, not individuals. For persistent problems, go with your RWA or neighbours. Documented community backing makes it harder to ignore and harder to falsely close." },
];

const SEARCH_DATA = [
  { name: 'Food-soiled plastic', bin: 'Blue (rinsed) or Wet (soiled)', note: 'Rinse lightly soiled. Heavily soiled goes in green bin.', color: 'blue' as BinColor },
  { name: 'Pizza box', bin: 'Split — top blue, bottom wet', note: 'Tear the box. Clean half to blue, soiled half to green.', color: 'blue' as BinColor },
  { name: 'Syringe / needle', bin: 'Black bin ONLY', note: 'Never in red bin. Store in hard plastic container. Critical.', color: 'black' as BinColor },
  { name: 'Battery', bin: 'Black bin', note: 'Special care. Fire hazard if placed in dry waste.', color: 'black' as BinColor },
  { name: 'CFL bulb', bin: 'Black bin', note: 'Contains mercury. Never in dry waste.', color: 'black' as BinColor },
  { name: 'LED bulb', bin: 'Black bin (preferred) or blue', note: 'Lower hazard than CFL but e-waste handling is safer.', color: 'black' as BinColor },
  { name: 'Expired medicine', bin: 'Black bin', note: 'Donate unexpired. Blister pack goes whole.', color: 'black' as BinColor },
  { name: 'Paint can', bin: 'Blue (empty/dry) or Black (liquid)', note: 'Fully dried empty cans go blue. Liquid paint is special care.', color: 'black' as BinColor },
  { name: 'Diaper', bin: 'Red bin', note: 'Sanitary waste. Daily collection is mandatory.', color: 'red' as BinColor },
  { name: 'Cardboard box', bin: 'Blue bin', note: 'Flatten first. Remove food residue if any.', color: 'blue' as BinColor },
  { name: 'Aluminium foil', bin: 'Blue bin', note: 'Clean foil only. Food-soiled foil is impractical to clean — blue bin anyway.', color: 'blue' as BinColor },
  { name: 'Bubble wrap', bin: 'Blue bin', note: 'Check if your DWCC accepts soft plastics. Can clog machinery.', color: 'blue' as BinColor },
  { name: 'Coconut shell', bin: 'Garden waste drop point', note: 'Too slow to break down for composting. Garden waste point preferred.', color: 'green' as BinColor },
  { name: 'Flowers / puja waste', bin: 'Wet waste (after separating plastic)', note: 'Separate plastic and synthetic items before composting.', color: 'green' as BinColor },
  { name: 'E-waste / electronics', bin: 'Quarterly authorised collection', note: 'Never to kabadiwala. Sahas is a recommended handler in Bengaluru.', color: 'black' as BinColor },
  { name: 'Textile / clothes', bin: 'Half-yearly — donate first', note: 'Donation or thrift store before textile recycler.', color: 'blue' as BinColor },
  { name: 'C&D debris', bin: 'Store on premises — on-demand pickup', note: 'Legal obligation under SWM 2026. Do not dump on streets.', color: 'black' as BinColor },
  { name: 'Bones / meat', bin: 'Wet waste', note: 'Biogas unit preferred if accessible. Otherwise wet waste.', color: 'green' as BinColor },
  { name: 'Cooking oil', bin: 'Community collection only', note: 'Never in any bin. System gap — no consistent route for most households.', color: 'black' as BinColor },
  { name: 'Thermal receipt', bin: 'Blue bin (practical)', note: 'Not actually recyclable due to thermal coating. System gap.', color: 'blue' as BinColor },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function TagPill({ label, style }: { label: string; style: TagStyle }) {
  const styles: Record<TagStyle, { bg: string; color: string }> = {
    green:  { bg: C.greenLight, color: C.greenDark },
    blue:   { bg: C.blueLight,  color: C.blue },
    red:    { bg: C.redLight,   color: C.red },
    black:  { bg: C.blackLight, color: C.black },
    reduce: { bg: C.amberLight, color: C.amber },
    gap:    { bg: C.gapLight,   color: C.gap },
  };
  const s = styles[style];
  return (
    <span
      style={{ background: s.bg, color: s.color }}
      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
    >
      {label}
    </span>
  );
}

function MetaPill({ children }: { children: string }) {
  return (
    <span
      style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textSec }}
      className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-0.5 rounded-full"
    >
      {children}
    </span>
  );
}

function SeverityBar({ severity }: { severity: ConflictSeverity }) {
  const colorMap: Record<ConflictSeverity, string> = {
    hard: C.redMid, medium: '#F39C12', soft: C.greenMid,
  };
  return (
    <div
      style={{ background: colorMap[severity] }}
      className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
    />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ color: C.textSec }} className="text-[11px] font-semibold tracking-[2px] uppercase mb-2">
      {children}
    </p>
  );
}

function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: C.text, ...style }}
      className="text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight mb-2"
    >
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: string }) {
  return (
    <p style={{ color: C.textSec }} className="text-[15px] font-light max-w-xl mb-8">
      {children}
    </p>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function WasteGuide() {
  const [openBins, setOpenBins] = useState<Set<string>>(new Set(['green']));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCat>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleBin = (id: string) => {
    setOpenBins(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToBin = (id: string) => {
    setOpenBins(prev => new Set([...prev, id]));
    setTimeout(() => {
      document.getElementById(`bin-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return SEARCH_DATA.filter(d => d.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredConflicts = useMemo(
    () => activeFilter === 'all' ? CONFLICT_ITEMS : CONFLICT_ITEMS.filter(c => c.cat === activeFilter),
    [activeFilter]
  );

  const binColorMap: Record<BinColor, { bg: string; color: string }> = {
    green: { bg: C.greenLight, color: C.greenDark },
    blue:  { bg: C.blueLight,  color: C.blue },
    red:   { bg: C.redLight,   color: C.red },
    black: { bg: C.blackLight, color: C.black },
  };

  useEffect(() => {
    document.title = 'Waste Disposal Guide — GEODHA';
    return () => { document.title = 'GEODHA'; };
  }, []);

  const FILTER_BTNS: { label: string; value: FilterCat }[] = [
    { label: 'All', value: 'all' },
    { label: 'Food-soiled', value: 'food' },
    { label: 'Plastics', value: 'plastic' },
    { label: 'Hazardous', value: 'hazardous' },
    { label: 'System gaps', value: 'gap' },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.6 }} className="min-h-screen">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        style={{ background: C.greenDark, height: 56, zIndex: 100 }}
        className="sticky top-0 px-6 flex items-center justify-between"
      >
        <a href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: C.white, letterSpacing: '-0.3px' }}
          >
            GEO<span style={{ color: C.greenMid }}>DHA</span>
          </span>
        </a>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          Bengaluru Waste Guide
        </span>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div
        style={{ background: C.greenDark, position: 'relative', overflow: 'hidden' }}
        className="px-6 pt-14 pb-12 text-center"
      >
        {/* radial glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 30% 50%, rgba(82,183,136,0.15) 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 20%, rgba(82,183,136,0.08) 0%, transparent 50%)`,
        }} />
        <span
          style={{ border: `1px solid rgba(82,183,136,0.3)`, color: C.greenMid }}
          className="relative inline-block text-[11px] font-semibold tracking-[2px] uppercase mb-4 px-4 py-1.5 rounded-full"
        >
          SWM 2026 · Updated April 2026
        </span>
        <h1
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: C.white, lineHeight: 1.05, letterSpacing: '-1px' }}
          className="relative text-[clamp(32px,7vw,54px)] font-bold mb-4"
        >
          Bengaluru's waste<br />
          <span style={{ color: C.greenMid }}>doesn't have to be</span><br />
          confusing.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 480, fontWeight: 300 }} className="relative text-[16px] mx-auto mb-10">
          Know which bin, what goes in it, and what to do when things go wrong.
          Simple, honest guidance for every resident.
        </p>

        {/* Bin quick-nav */}
        <div className="relative flex flex-wrap gap-2.5 justify-center">
          {[
            { id: 'green', label: 'Green · Wet Waste',    dotColor: C.green,   bg: C.greenLight, color: C.greenDark },
            { id: 'blue',  label: 'Blue · Dry Waste',     dotColor: C.blueMid, bg: C.blueLight,  color: C.blue },
            { id: 'red',   label: 'Red · Sanitary',       dotColor: C.redMid,  bg: C.redLight,   color: C.red },
            { id: 'black', label: 'Black · Special Care', dotColor: C.black,   bg: C.blackLight, color: C.black },
          ].map(b => (
            <button
              key={b.id}
              onClick={() => scrollToBin(b.id)}
              style={{ background: b.bg, color: b.color, border: 'none', cursor: 'pointer' }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: b.dotColor, display: 'inline-block', flexShrink: 0 }} />
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── HIERARCHY STRIP ────────────────────────────────────────────────── */}
      <div style={{ background: C.greenDark }} className="py-10">
        <div className="max-w-3xl mx-auto px-5">
          <p style={{ color: C.greenMid }} className="text-[11px] font-semibold tracking-[2px] uppercase mb-2">
            Before you bin anything
          </p>
          <h2
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: C.white, fontSize: 22, fontWeight: 700 }}
            className="mb-7"
          >
            Reduce first. Then recycle. Then dispose.
          </h2>
          <div className="flex items-center overflow-x-auto pb-1">
            {[
              { num: 1, label: 'Reduce',  active: true },
              { num: 2, label: 'Reuse',   active: true },
              { num: 3, label: 'Recycle', active: false },
              { num: 4, label: 'Recover', active: false },
              { num: 5, label: 'Dispose', active: false },
            ].map((step, i) => (
              <>
                <div key={step.num} className="flex flex-col items-center flex-1 min-w-[72px] text-center px-2">
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 8, flexShrink: 0,
                    background: step.active ? C.greenMid : 'rgba(255,255,255,0.12)',
                    border: `1.5px solid ${step.active ? C.greenMid : 'rgba(255,255,255,0.25)'}`,
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
                    color: step.active ? C.white : 'rgba(255,255,255,0.55)',
                  }}>
                    {step.label}
                  </div>
                </div>
                {i < 4 && (
                  <div key={`arrow-${i}`} style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16, flexShrink: 0, marginBottom: 24 }}>→</div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* ── BIN GUIDE ──────────────────────────────────────────────────────── */}
      <section id="bins" style={{ borderTop: `1px solid ${C.border}` }} className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <SectionLabel>The four bins</SectionLabel>
          <SectionTitle>What goes where</SectionTitle>
          <SectionDesc>
            Every household in Bengaluru uses four bins. Here's exactly what each one is for,
            when it's collected, and the rules that matter.
          </SectionDesc>

          {/* Search */}
          <div className="relative mb-8 max-w-lg">
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: C.textSec, pointerEvents: 'none', fontSize: 16 }}>🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for an item — e.g. pizza box, syringe, battery…"
              style={{
                width: '100%', paddingLeft: 44, paddingRight: 20, paddingTop: 13, paddingBottom: 13,
                border: `1.5px solid ${C.border}`, borderRadius: 100, fontSize: 14,
                background: C.white, color: C.text, outline: 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = C.greenMid; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(82,183,136,0.15)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Search results */}
          {searchQuery.trim() && (
            <div className="mb-6">
              {searchResults && searchResults.length > 0 ? searchResults.map(item => (
                <div
                  key={item.name}
                  style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10 }}
                  className="flex items-start gap-3.5 p-3.5 mb-2"
                >
                  <span
                    style={{
                      background: binColorMap[item.color].bg,
                      color: binColorMap[item.color].color,
                      fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', marginTop: 2, flexShrink: 0,
                    }}
                  >
                    {item.bin}
                  </span>
                  <div>
                    <div className="font-semibold text-[14px] mb-0.5">{item.name}</div>
                    <div style={{ color: C.textSec }} className="text-[13px]">{item.note}</div>
                  </div>
                </div>
              )) : (
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, color: C.textSec }} className="px-5 py-4 text-[14px]">
                  No results for "<strong>{searchQuery}</strong>". Item list is still being finalised — check back soon.
                </div>
              )}
            </div>
          )}

          {/* Bin cards */}
          <div className="flex flex-col gap-4">
            {BINS.map((bin, idx) => {
              const s = BIN_STYLES[bin.color];
              const isOpen = openBins.has(bin.id);
              return (
                <div
                  key={bin.id}
                  id={`bin-${bin.id}`}
                  style={{
                    background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden',
                    animation: `fadeUp 0.4s ease both`,
                    animationDelay: `${idx * 0.05}s`,
                  }}
                >
                  {/* Card header */}
                  <div
                    onClick={() => toggleBin(bin.id)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    className="flex items-start gap-5 px-7 py-6 hover:opacity-90 transition-opacity sm:px-7 sm:py-6 px-4 py-4"
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                      {bin.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: s.labelColor, marginBottom: 4 }}>
                        {bin.label}
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px', color: s.nameColor, marginBottom: 8 }}>
                        {bin.name}
                        {bin.subtitle && <span style={{ fontWeight: 300, fontSize: 16 }}> {bin.subtitle}</span>}
                        {bin.badge && (
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', background: '#FEE2E2', color: '#991B1B', padding: '2px 7px', borderRadius: 4, marginLeft: 8, verticalAlign: 'middle' }}>
                            {bin.badge.text}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bin.pills.map(p => <MetaPill key={p}>{p}</MetaPill>)}
                      </div>
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: C.bg, border: `1px solid ${C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      marginTop: 4, color: C.textSec, fontSize: 12,
                      transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s',
                    }}>
                      ▾
                    </div>
                  </div>

                  {/* Card body */}
                  {isOpen && (
                    <div className="px-7 pb-7 sm:px-7 px-4">
                      <div style={{ height: 1, background: C.border, marginBottom: 24 }} />

                      {/* Rules */}
                      <div style={{ background: '#FFF8F0', border: '1px solid #F5DEB3', borderRadius: 10 }} className="p-4 mb-5">
                        <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.amber, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                          ⚠ Critical rules
                        </h4>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                          {bin.rules.map((r, i) => (
                            <li key={i} style={{
                              fontSize: 13.5, color: C.text, padding: '5px 0 5px 22px', position: 'relative',
                              borderBottom: i < bin.rules.length - 1 ? '1px solid rgba(245,222,179,0.5)' : 'none',
                            }}>
                              <span style={{ position: 'absolute', left: 0, fontSize: 11 }}>⚠</span>
                              {r.bold && <strong>{r.bold}</strong>}{r.rest}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Items */}
                      <div className="mb-5">
                        <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.textSec, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          ✅ {bin.items ?? 'What goes in'}
                        </h4>
                        {bin.itemPills && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {bin.itemPills.map(p => <MetaPill key={p}>{p}</MetaPill>)}
                          </div>
                        )}
                        <div style={{ background: C.bg, border: `2px dashed ${C.border}`, borderRadius: 10, color: C.textSec }} className="p-5 text-center text-[13px]">
                          <span className="block text-[20px] mb-1.5">📋</span>
                          Full item list being finalised by SWMRT and BSWML.<br />Coming soon.
                        </div>
                      </div>

                      {/* Destination */}
                      <div style={{ background: s.destBg, color: s.destColor, borderRadius: 10 }} className="px-4 py-3.5 text-[13px]">
                        <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: 2 }}>Where it goes</span>
                        {bin.destination}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY DROP POINTS ──────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}` }} className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <SectionLabel>Not everything is doorstep collection</SectionLabel>
          <SectionTitle>Community drop points</SectionTitle>
          <SectionDesc>
            Some waste categories need to be stored on premises and taken to designated
            points or collected on a scheduled basis.
          </SectionDesc>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {DROP_POINTS.map(item => (
              <div
                key={item.name}
                style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, position: 'relative' }}
                className="p-5"
              >
                <SeverityBar severity={item.severity} />
                <div className="font-semibold text-[14px] mb-1.5 mt-0.5">{item.name}</div>
                <div style={{ color: C.textSec }} className="text-[13px] leading-relaxed mb-2.5">{item.desc}</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(t => <TagPill key={t.label} {...t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRICKY ITEMS ───────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}` }} className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <SectionLabel>Honest answers to hard questions</SectionLabel>
          <SectionTitle>The tricky items</SectionTitle>
          <SectionDesc>
            Some items don't fit neatly into any bin. Here's our honest guidance —
            including where the system doesn't yet have a good answer.
          </SectionDesc>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTER_BTNS.map(btn => (
              <button
                key={btn.value}
                onClick={() => setActiveFilter(btn.value)}
                style={{
                  padding: '7px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  background: activeFilter === btn.value ? C.text : C.white,
                  border: `1.5px solid ${activeFilter === btn.value ? C.text : C.border}`,
                  color: activeFilter === btn.value ? C.white : C.textSec,
                  transition: 'all 0.15s',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredConflicts.map(item => (
              <div
                key={item.name}
                style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, position: 'relative' }}
                className="p-5"
              >
                <SeverityBar severity={item.severity} />
                <div className="font-semibold text-[14px] mb-1.5 mt-0.5">{item.name}</div>
                <div style={{ color: C.textSec }} className="text-[13px] leading-relaxed mb-2.5">{item.desc}</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(t => <TagPill key={t.label} {...t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}` }} className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <SectionLabel>What not to do</SectionLabel>
          <SectionTitle>Common mistakes</SectionTitle>
          <SectionDesc>
            These are the errors that cause the most downstream harm — to waste workers,
            to recycling rates, and to your neighbourhood.
          </SectionDesc>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {MISTAKES.map(m => (
              <div key={m.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }} className="p-5">
                <span className="text-[28px] mb-2.5 block">{m.icon}</span>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: C.text, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {m.title}
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', background: '#FEE2E2', color: '#991B1B', padding: '2px 7px', borderRadius: 4 }}>
                    NO
                  </span>
                </div>
                <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESCALATION ─────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}` }} className="py-14">
        <div className="max-w-3xl mx-auto px-5">
          <SectionLabel>When things go wrong</SectionLabel>
          <SectionTitle>How to escalate</SectionTitle>
          <SectionDesc>
            Collection missed? Dump forming nearby? Open burning? You have more power
            than you think — here's how to use it.
          </SectionDesc>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
            {ESCALATION_STEPS.map(s => (
              <div key={s.step} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }} className="p-5">
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: C.text }}>{s.title}</div>
                <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Fine callout */}
          <div style={{ background: C.greenDark, borderRadius: 12 }} className="p-6 sm:p-7 flex items-start gap-4 sm:gap-5">
            <div style={{ fontSize: 36, flexShrink: 0 }}>⚖️</div>
            <div>
              <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 6, color: C.white }}>
                What a documented escalation looks like
              </h4>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                On 28 March 2026, a citizen in Bengaluru photographed open garbage burning with GPS coordinates and shared it to their
                marshal's WhatsApp group. The marshal escalated to the CPWD office. A fine of{' '}
                <strong style={{ color: C.greenMid }}>₹2,000</strong> was issued — receipt included. The WhatsApp thread ended:{' '}
                <em>"Fines are definite deterrents. Hopefully there will not be repeats."</em>{' '}
                This is what's possible when citizens document and marshals act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: C.greenDark, color: 'rgba(255,255,255,0.5)' }} className="py-10 px-6 text-center text-[13px]">
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 8 }}>
          GEO<span style={{ color: C.greenMid }}>DHA</span>
        </div>
        <p className="mb-2">Ward-level waste accountability for Bengaluru</p>
        <p>
          <a href="https://geodha.org" style={{ color: C.greenMid, textDecoration: 'none' }}>geodha.org</a>
          {' · '}Sources: SWMRT, BSWML, BAF, CPP / Beautiful Bharat, BBMP SWM Byelaws 2020, SWM 2026 Rules
        </p>
        <p style={{ marginTop: 12, fontSize: 11, opacity: 0.4 }}>
          Last updated April 2026 · Item lists pending finalisation by SWMRT and BSWML
        </p>
      </footer>

      {/* Fade-up keyframe */}
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
