import { useState } from 'react';
import {
  CheckCircle, ChevronDown, ChevronUp,
  FileText, Phone, Users, HeartHandshake, Lightbulb,
  Shield, MessageCircle, Layers, Recycle, Loader2,
} from 'lucide-react';

const WEB3FORMS_KEY = '445de55d-332c-4925-8ad4-94e0daff1929';

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
    description: 'File a formal grievance with the GBA through Namma Bengaluru (Sahaaya 2.0) for official tracking and resolution.',
    type: 'expand',
    ctaText: 'How to submit',
    contentIntro: 'File a formal complaint through Namma Bengaluru Sahaaya 2.0:',
    contentItems: [
      'Visit nammabengaluru.org.in or download the Namma Bengaluru (Sahaaya 2.0) app',
      'Select "Solid Waste Management" as the complaint category',
      'Describe the issue, upload photos, and select the location',
      'Track resolution status on the same portal',
      'You will receive an SMS with a complaint ID for follow-up',
      'Alternatively, call the GBA helpline: 1533',
    ],
  },
  {
    id: 'ward_marshall',
    icon: Phone,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Civic Hotline',
    description: 'If there is no response to your complaint or no action taken, call the GBA helpline at 1533 to escalate and get the direct contact of your ward marshal.',
    type: 'action',
    ctaText: 'Call GBA Helpline',
    href: 'tel:1533',
  },
  {
    id: 'volunteer_orgs',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Stuck? Get Help For Escalating Issues',
    description: 'If your complaint is being ignored or you are not getting a response from authorities, Broseph Foundation volunteers will follow up and escalate on your behalf.',
    type: 'action',
    ctaText: 'Visit broseph.in',
    href: 'https://broseph.in/contact.html',
  },
  {
    id: 'volunteer_cleanups',
    icon: HeartHandshake,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    title: 'Volunteer for Cleanups',
    description: 'Join cleanup drives run by organisations active across Bengaluru.',
    type: 'expand',
    ctaText: 'Find cleanup drives',
    contentIntro: 'Organisations running regular cleanup drives in Bengaluru:',
    contentItems: [
      'Youth For Parivarthan — Weekend spot-fixes and neighbourhood drives. Fill the volunteer form at youthforparivarthan.org.in, pay ₹200 membership fee, and join their WhatsApp community for event updates',
      'The Ugly Indian — Invitation-only weekend spotfixes, 7–10 AM. Email theuglyindian@gmail.com to sign up as a volunteer and get invited to a fix near you',
      'Indian Ploggers Army — Plogging runs combining jogging with litter pickup. Follow @theindianploggersarmy on Instagram for upcoming Bengaluru events',
      'Team Everest — Beginner-friendly Trek & Plog events. Sign up event-by-event at teameverest.ngo — no ongoing commitment required',
    ],
    contentOutro: 'Most events are on weekends. Check their Instagram pages for upcoming drives near you.',
  },
  {
    id: 'waste_solutions',
    icon: Lightbulb,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Waste Management Solutions',
    description: 'Explore infrastructure options like Kasa Kiosks, Dry Waste Collection Centres, and composting.',
    type: 'expand',
    ctaText: 'Explore solutions',
    contentIntro: 'Infrastructure options to improve waste management in your area:',
    contentItems: [
      'Kasa Kiosks — Community dry waste drop-off points run by Hasiru Dala; locate one near you at hasirudala.in',
      'Dry Waste Collection Centres (DWCCs) — One per ward; accepts segregated dry waste for recycling',
      'Composting — Daily Dump and GBA-subsidised home composters available for wet waste processing',
      'QR Segregation Tracking — Waste Samaritan has developed a QR-based system for waste collectors to track and enforce source segregation',
    ],
  },
  {
    id: 'legal_rights',
    icon: Shield,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Know Your Rights',
    description: 'Waste rules, constitutional rights, Karnataka HC rulings, and applicable fines.',
    type: 'expand',
    ctaText: 'View legal provisions',
    contentIntro: 'Key legal provisions relevant to waste management:',
    contentItems: [
      'Article 21 — Right to a clean environment (Supreme Court interpretation)',
      'SWM Rules 2026 — In force from April 1, 2026; mandates 4-stream source segregation and financial penalties for non-compliance',
      'Karnataka HC — Has directed civic bodies to ensure scientific disposal of waste',
      'GBA Bye-laws — Fines up to ₹25,000 for open dumping',
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
      'Attend your ward office public grievance meeting, held every Wednesday, and present your evidence',
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
    description: '4-stream segregation: Wet, Dry, Sanitary, and Domestic Hazardous (SWM Rules 2026).',
    type: 'expand',
    ctaText: 'View segregation guide',
    contentIntro: 'Bengaluru follows 4-stream segregation under SWM Rules 2026:',
    contentItems: [
      '🟢 Green Bin — Wet Waste: food scraps, vegetable peels, fruit rinds, garden waste, cooked food',
      '🔵 Blue Bin — Dry Waste: paper, plastic, metal, glass, cardboard, tetra packs',
      '🔴 Red Bin — Sanitary Waste: diapers, sanitary pads, tampons, masks, bandages (wrap securely before placing)',
      '⬛ Black Bin — Domestic Hazardous: batteries, bulbs, paint cans, medicines, e-waste',
    ],
    contentOutro: 'Keep 4 separate bins at home and hand each to your waste collector separately. Do not use plastic bag liners inside bins.',
  },
  {
    id: 'disposal_guide',
    icon: Recycle,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Responsible Disposal Guide',
    description: 'How to dispose of clothes, e-waste, furniture, cooking oil, and other hard-to-recycle items.',
    type: 'expand',
    ctaText: 'View disposal guide',
    contentIntro: 'For items that should not go in regular bins:',
    contentItems: [
      'Clothes and Textiles — Donate to Goonj or Pratham; Hasiru Dala runs textile recycling drives; do not mix with dry waste',
      'E-waste (phones, batteries, chargers, bulbs) — Use GBA e-waste collection drives, Attero or Karo Sambhav drop-off points, or Flipkart/Amazon exchange programmes',
      'Furniture and Bulky Items — Sell or donate via OLX or Facebook Marketplace; call GBA (1533) to schedule bulk waste pickup; scrap dealers accept metal items',
      'Cooking Oil — Collect used oil and hand to Hasiru Dala or local recyclers; never pour down drains or mix with wet waste',
      'Hazardous Items (paint, chemicals, medicines) — Contact GBA or authorised hazardous waste handlers; never dispose in regular bins or drains',
    ],
  },
]

// ── COMPONENT ─────────────────────────────────────────────────────────────────

const ReportPage = () => {
  const [description, setDescription]           = useState('');
  const [location, setLocation]                 = useState('');
  const [contact, setContact]                   = useState('');
  const [submitting, setSubmitting]             = useState(false);
  const [submitted, setSubmitted]               = useState(false);
  const [error, setError]                       = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [contactError, setContactError]         = useState(false);
  const [expandedCards, setExpandedCards]       = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) { setDescriptionError(true); return; }
    if (!contact.trim()) { setContactError(true); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Problem Report — GEODHA',
          description,
          location,
          contact,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setError('Something went wrong. Please try again or email us at contact@geodha.org.');
      }
    } catch {
      setError('Could not send your report. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setDescription('');
    setLocation('');
    setContact('');
    setError('');
    setDescriptionError(false);
    setContactError(false);
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
            Explore other solutions.
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
            Tell us more about a problem (garbage related) you are facing. We will verify the information and add it to the civic dashboard, coordinate with authorities, or contact you about how to solve it. Your identity will remain confidential.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-1">
                Describe the problem <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                What is the issue? How long has it been there? How severe is it?
              </p>
              <textarea
                id="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value); setDescriptionError(false); }}
                rows={5}
                placeholder="e.g. There is a large illegal garbage dump near the entrance to our street. It has been there for over two weeks and is attracting stray animals."
                className={`w-full px-4 py-3 rounded-md border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none ${
                  descriptionError ? 'border-[#EF4444]' : 'border-border'
                }`}
              />
              {descriptionError && <p className="text-xs text-[#EF4444] mt-1">A description is required.</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-1">
                Where are you located?
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Your area, street, ward, or nearest landmark.
              </p>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Near Konanakunte Circle, Bannerghatta Road, Ward 173"
                className="w-full px-4 py-3 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-foreground mb-1">
                Contact Details <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Include your phone number or email address so we can reach you for more information or to provide updates.
              </p>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => { setContact(e.target.value); setContactError(false); }}
                placeholder="Phone number or email address"
                className={`w-full px-4 py-3 rounded-md border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                  contactError ? 'border-[#EF4444]' : 'border-border'
                }`}
              />
              {contactError && <p className="text-xs text-[#EF4444] mt-1">Contact details are required.</p>}
            </div>

            {error && (
              <p className="text-sm text-[#EF4444] bg-red-50 border border-red-200 rounded-md px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 active:bg-primary/80 transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Submitting…' : 'Submit Report'}
            </button>

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
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center mb-3 shrink-0`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>

                  <h3
                    className="font-bold text-foreground mb-1.5 leading-snug"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {card.description}
                  </p>

                  {card.type === 'action' ? (
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 w-fit"
                      style={{ background: 'var(--gradient-hero)' }}
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
