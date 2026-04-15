import { useState, useRef } from 'react';
import { Camera, MapPin, ChevronDown, CheckCircle } from 'lucide-react';

// TODO: wire to Firebase reporting pipeline
// Endpoint URL comes from env var — never hardcode
const REPORT_FORM_URL = import.meta.env.VITE_REPORT_FORM_URL as string | undefined;

const PROBLEM_TYPES = [
  'Open Burning',
  'Uncollected Waste',
  'Illegal Dump',
  'Mosquito Breeding',
  'Foul Smell',
  'Other',
];

const ReportPage = () => {
  const [photoPreview, setPhotoPreview]   = useState<string | null>(null);
  const [photoFile, setPhotoFile]         = useState<File | null>(null);
  const [location, setLocation]           = useState('');
  const [problemType, setProblemType]     = useState('');
  const [description, setDescription]    = useState('');
  const [contact, setContact]             = useState('');
  const [submitted, setSubmitted]         = useState(false);
  const [photoError, setPhotoError]       = useState(false);
  const [typeError, setTypeError]         = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Validate required fields
    let hasError = false;
    if (!photoFile) { setPhotoError(true); hasError = true; }
    if (!problemType) { setTypeError(true); hasError = true; }
    if (hasError) return;

    // TODO: wire to Firebase reporting pipeline
    // If an external form URL is configured, redirect there
    if (REPORT_FORM_URL) {
      window.location.href = REPORT_FORM_URL;
      return;
    }

    // Placeholder submission — show success state
    setSubmitted(true);
    window.scrollTo(0, 0);
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
            We will verify this report. Once verified, you can track its status on the Dashboard map.
          </p>
          <button
            onClick={() => { setSubmitted(false); setPhotoPreview(null); setPhotoFile(null); setLocation(''); setProblemType(''); setDescription(''); setContact(''); }}
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
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <h1
            className="text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Report a Problem
          </h1>
          <p className="text-muted-foreground mt-1 max-w-md">
            Photograph the issue. Drop a pin. We'll verify it and add it to the map.
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* 1. Photo upload (required) */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Photo <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Take or upload a photo of the problem.</p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                  photoError ? 'border-[#EF4444] bg-red-50/40' : 'border-border hover:border-primary/40 hover:bg-muted/40'
                }`}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full max-h-52 object-cover rounded-lg"
                  />
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
              {photoError && <p className="text-xs text-[#EF4444] mt-1">A photo is required.</p>}
            </div>

            {/* 2. Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-2">
                Location
              </label>
              <p className="text-xs text-muted-foreground mb-2">Street address, landmark, or ward name.</p>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near Konanakunte Circle, Bannerghatta Road"
                  className="w-full pl-9 pr-4 py-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              {/* PLACEHOLDER — wire map pin drop (LocationPicker component) when Firebase pipeline confirmed */}
            </div>

            {/* 3. Problem type (required) */}
            <div>
              <label htmlFor="problem-type" className="block text-sm font-semibold text-foreground mb-2">
                Problem type <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <select
                  id="problem-type"
                  value={problemType}
                  onChange={(e) => { setProblemType(e.target.value); setTypeError(false); }}
                  className={`w-full appearance-none px-4 py-2.5 rounded-md border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                    typeError ? 'border-[#EF4444]' : 'border-border'
                  } ${!problemType ? 'text-muted-foreground' : ''}`}
                >
                  <option value="" disabled>Select a problem type…</option>
                  {PROBLEM_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              {typeError && <p className="text-xs text-[#EF4444] mt-1">Please select a problem type.</p>}
            </div>

            {/* 4. Description (optional) */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Description <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe what you see — how long has it been there? How bad is it?"
                className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              />
            </div>

            {/* 5. Contact (optional) */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-foreground mb-2">
                Contact <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">So we can update you on the status of your report.</p>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone number or email"
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

            {/* Verification note */}
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              We will verify this report. Once verified, you can track its status on the Dashboard map.
            </p>

            {/* TODO: wire to Firebase reporting pipeline */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
