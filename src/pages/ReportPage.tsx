import { useState, useRef, useEffect } from 'react';
import {
  Camera, MapPin, CheckCircle, Locate, Loader2,
  ChevronDown, ChevronUp,
  FileText, Phone, Users, HeartHandshake, Lightbulb,
  Shield, MessageCircle, Layers, Recycle,
} from 'lucide-react';

// TODO: wire to Firebase reporting pipeline
// Endpoint URL comes from env var — never hardcode
const REPORT_FORM_URL = import.meta.env.VITE_REPORT_FORM_URL as string | undefined;

// ── ACTION CARDS ──────────────────────────────────────────────────────────────

interface ActionCardDef {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  type: 'action' | 'expand';
  ctaText: string;
  href?: string;
  contentIntro?: string;
  contentItems?: string[];
  contentOutro?: string;
}

const actionCards: ActionCardDef[] = [
  {
    id: 'bbmp_sahaaya',
    icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Submit an Official Complaint',
    description: 'File a formal grievance with BBMP through Sahaaya for official tracking and resolution.',
    type: 'expand',
    ctaText: 'How to submit',
    contentIntro: 'File a formal complaint through BBMP Sahaaya:',
    contentItems: [
      'Visit bbmpsahaaya.karnataka.gov.in or download the BBMP Sahaaya app',
      'Select "Solid Waste Management" as the complaint category',
      'Describe the issue and upload photos from your GEODHA report',
      'Note your Grievance ID for tracking',
      'Track resolution status at the same portal',
      'Alternatively, call the BBMP helpline: 1533',
    ],
  },
  {
    id: 'ward_marshall',
    icon: Phone,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Contact Ward Marshal',
    description: 'Reach the GBA hotline to report directly to your ward marshal.',
    type: 'action',
    ctaText: 'Call GBA Hotline',
    href: 'tel:+918061914960',
  },
  {
    id: 'volunteer_orgs',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Escalate with Volunteers',
    description: 'Connect with organisations actively working on waste management in Bengaluru.',
    type: 'expand',
    ctaText: 'View organisations',
    contentIntro: 'These organisations work directly on waste management in Bengaluru:',
    contentItems: [
      'Hasiru Dala — Waste picker cooperative and advocacy',
      'Broseph Foundation — Community cleanups and awareness',
      'Daily Dump — Composting solutions',
      'Saahas — Zero waste consulting',
      'SWM Roundtable — Policy advocacy and civic engagement',
    ],
  },
  {
    id: 'volunteer_cleanups',
    icon: HeartHandshake,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    title: 'Volunteer for Cleanups',
    description: 'Join cleanup drives run by organisations active in your area.',
    type: 'expand',
    ctaText: 'Find cleanup drives',
    contentIntro: 'Organisations running regular cleanup drives in Bengaluru:',
    contentItems: [
      'Ugly Indian — Spotfix events for blackspot cleanups',
      'Broseph Foundation — Neighbourhood clean-up drives',
      'SWaCH / Hasiru Dala — Waste picker-led cleanup initiatives',
      'BBMP Ward Committees — Ward-level clean-up coordination',
    ],
    contentOutro: 'Check their social media pages for upcoming events near you.',
  },
  {
    id: 'waste_solutions',
    icon: Lightbulb,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Waste Management Solutions',
    description: 'Explore infrastructure options like Kasa Kiosks and QR-based segregation enforcement.',
    type: 'expand',
    ctaText: 'Explore solutions',
    contentIntro: 'Infrastructure options to improve waste management in your area:',
    contentItems: [
      'Kasa Kiosks — Community dry waste collection centres run by Hasiru Dala; locate one near you',
      'QR Code Segregation — Some wards use QR codes on bins to enforce source segregation',
      'BBMP Dry Waste Collection Centres (DWCCs) — One per ward; accepts segregated dry waste',
      'Composting — Daily Dump and BBMP subsidised home composters for wet waste',
    ],
  },
  {
    id: 'legal_rights',
    icon: Shield,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Know Your Rights',
    description: 'Waste bye-laws, constitutional rights, Karnataka HC rulings, and applicable fines.',
    type: 'expand',
    ctaText: 'View legal provisions',
    contentIntro: 'Key legal provisions relevant to waste management:',
    contentItems: [
      'Article 21 — Right to a clean environment (Supreme Court interpretation)',
      'SWM Rules 2016 — Mandates source segregation; non-compliance is fineable',
      'Karnataka HC — Directed BBMP to ensure scientific disposal of waste',
      'BBMP Bye-laws — Fines up to Rs. 25,000 for open dumping',
      'Open burning — Fineable offence under KSPCB and SWM Rules',
    ],
  },
  {
    id: 'community_group',
    icon: MessageCircle,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Form a Community Group',
    description: 'Organise your neighbours to collectively tackle recurring waste issues.',
    type: 'expand',
    ctaText: 'How to get started',
    contentIntro: 'Steps to form an effective community group:',
    contentItems: [
      'Gather 5 to 10 interested residents from your area',
      'Create a WhatsApp or Telegram group for coordination',
      'Document recurring waste spots with GEODHA reports',
      'Present evidence at your next BBMP Ward Committee meeting',
      'Coordinate with your ward marshal for regular pickups',
    ],
    contentOutro: 'Community pressure is the most effective way to resolve recurring issues.',
  },
  {
    id: 'segregation_guide',
    icon: Layers,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    title: 'Learn Waste Segregation',
    description: '4-stream segregation: Wet, Dry, Sanitary, and Domestic Hazardous (SWM Rules 2016).',
    type: 'expand',
    ctaText: 'View segregation guide',
    contentIntro: 'Bengaluru follows 4-stream segregation under SWM Rules 2016:',
    contentItems: [
      '🟢 Wet Waste — Food scraps, fruit peels, garden waste, coffee grounds',
      '🔵 Dry Waste — Paper, plastic, metal, glass, tetra packs',
      '🟡 Sanitary Waste — Diapers, sanitary pads, masks, bandages (wrap separately)',
      '🔴 Domestic Hazardous — Batteries, bulbs, paint, medicines, e-waste',
    ],
    contentOutro: 'Keep 4 separate bins at home and hand each over to your BBMP waste collector separately.',
  },
  {
    id: 'disposal_guide',
    icon: Recycle,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Responsible Disposal Guide',
    description: 'How to dispose of clothes, textiles, e-waste, furniture, and other hard-to-recycle items.',
    type: 'expand',
    ctaText: 'View disposal guide',
    contentIntro: 'For items that should not go in regular bins:',
    contentItems: [
      'Clothes and Textiles — Donate to Goonj or Pratham; Hasiru Dala runs textile recycling collection drives; do not mix with dry waste',
      'E-waste (phones, batteries, chargers, bulbs) — Use BBMP e-waste collection drives, Attero or Karo Sambhav drop-off points, or Flipkart/Amazon exchange programmes',
      'Furniture and Bulky Items — Sell or donate via OLX or Facebook Marketplace; call BBMP (1533) to schedule bulk waste collection; scrap dealers accept metal items',
      'Cooking Oil — Collect used oil and hand to Hasiru Dala or local recyclers; never pour down drains or mix with wet waste',
      'Hazardous Items (paint, chemicals, medicines) — Contact BBMP or authorised hazardous waste handlers; never dispose in regular bins or drains',
    ],
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

const ReportPage = () => {
  const [photoPreview, setPhotoPreview]         = useState<string | null>(null);
  const [photoFile, setPhotoFile]               = useState<File | null>(null);
  const [locationText, setLocationText]         = useState('');
  const [locationCoords, setLocationCoords]     = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading]   = useState(false);
  const [description, setDescription]           = useState('');
  const [contact, setContact]                   = useState('');
  const [submitted, setSubmitted]               = useState(false);
  const [photoError, setPhotoError]             = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [expandedCards, setExpandedCards]       = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { requestLocation(); }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationLoading(false);
      },
      () => { setLocationLoading(false); },
      { timeout: 8000 }
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoError(false);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!photoFile) { setPhotoError(true); hasError = true; }
    if (!description.trim()) { setDescriptionError(true); hasError = true; }
    if (hasError) return;
    if (REPORT_FORM_URL) { window.location.href = REPORT_FORM_URL; return; }
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhotoPreview(null);
    setPhotoFile(null);
    setLocationText('');
    setLocationCoords(null);
    setDescription('');
    setContact('');
    setPhotoError(false);
    setDescriptionError(false);
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <h2
            className="text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Report received
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you for your report. We will verify the information and follow up by adding it to the civic dashboard, coordinating with the relevant authorities, or reaching out to you directly.
          </p>
          <button
            onClick={resetForm}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            Submit another report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          <h1
            className="text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Report a Problem
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Tell us more about a problem you are facing. We will verify the information and add it to the civic dashboard, coordinate with authorities, or contact you about how to solve it. For garbage dumps or open burning, include the exact location and images of the problem.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* 1. Photo (required) */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Photos <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Take or upload a photo of the problem.</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                  photoError ? 'border-[#EF4444] bg-red-50/40' : 'border-border hover:border-primary/40 hover:bg-muted/40'
                }`}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full max-h-52 object-cover rounded-lg" />
                ) : (
                  <>
                    <Camera className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tap to take or upload a photo</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              {photoError && <p className="text-xs text-[#EF4444] mt-1">At least one photo is required.</p>}
            </div>

            {/* 2. Location picker */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Location <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Drop a pin at the exact location of the problem.</p>

              <div className="rounded-xl overflow-hidden border border-border mb-3">
                {/* Map placeholder */}
                <div
                  className="relative w-full h-40 bg-muted flex items-center justify-center"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(0,0,0,0.06) 19px,rgba(0,0,0,0.06) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(0,0,0,0.06) 19px,rgba(0,0,0,0.06) 20px)',
                  }}
                >
                  {locationLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground">Detecting your location…</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <MapPin
                        className="h-10 w-10 text-primary"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                      />
                      {locationCoords ? (
                        <span className="text-xs bg-card border border-border px-2.5 py-0.5 rounded-full text-foreground font-medium shadow-sm">
                          {locationCoords.lat.toFixed(5)}, {locationCoords.lng.toFixed(5)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Location not set</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Use my location bar */}
                <div className="bg-card border-t border-border px-3 py-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {locationCoords ? 'GPS location captured' : 'Allow location access to pin the problem'}
                  </span>
                  <button
                    type="button"
                    onClick={requestLocation}
                    disabled={locationLoading}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {locationLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Locate className="h-3.5 w-3.5" />}
                    Use my location
                  </button>
                </div>
              </div>

              {/* Address field */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="Street address, landmark, or ward name"
                  className="w-full pl-9 pr-4 py-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>

            {/* 3. Description (required) */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-1">
                Description <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                How long has it been there? How severe is it? Include any relevant details.
              </p>
              <textarea
                id="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value); setDescriptionError(false); }}
                rows={4}
                placeholder="Describe what you see and how long the problem has persisted."
                className={`w-full px-4 py-2.5 rounded-md border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none ${
                  descriptionError ? 'border-[#EF4444]' : 'border-border'
                }`}
              />
              {descriptionError && <p className="text-xs text-[#EF4444] mt-1">A description is required.</p>}
            </div>

            {/* 4. Contact (optional) */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-foreground mb-1">
                Contact Details <span className="text-muted-foreground font-normal">(Optional)</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Include your contact details if you wish to be contacted for more information or receive updates.
              </p>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone number or email address"
                className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 active:bg-primary/80 transition-colors text-sm"
            >
              Submit Report
            </button>

            {/* TODO: wire to Firebase reporting pipeline */}
          </form>
        </div>
      </div>

      {/* ── ACTION CARDS SECTION ── */}
      <section className="py-12 sm:py-16 bg-muted/40 border-t border-border">
        <div className="container px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What can you do about it?
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Whether or not you submitted a report, these resources help you escalate the issue, connect with local organisations, or learn about your rights and responsibilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionCards.map((card) => {
              const isExpanded = expandedCards.has(card.id);
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-card rounded-xl border border-border p-5 flex flex-col hover:border-primary/30 hover:shadow-soft transition-all duration-200"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center mb-3 shrink-0`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-foreground mb-1.5 leading-snug"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {card.description}
                  </p>

                  {/* CTA */}
                  {card.type === 'action' ? (
                    <a
                      href={card.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 w-fit`}
                      style={{ background: `var(--gradient-hero)` }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {card.ctaText}
                    </a>
                  ) : (
                    <button
                      onClick={() => toggleCard(card.id)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-fit"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {isExpanded ? 'Show less' : card.ctaText}
                    </button>
                  )}

                  {/* Expanded content */}
                  {isExpanded && card.type === 'expand' && (
                    <div className="mt-4 pt-4 border-t border-border space-y-3">
                      {card.contentIntro && (
                        <p className="text-xs font-semibold text-foreground">{card.contentIntro}</p>
                      )}
                      {card.contentItems && (
                        <ul className="space-y-2">
                          {card.contentItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {card.contentOutro && (
                        <p className="text-xs text-muted-foreground italic">{card.contentOutro}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ReportPage;
