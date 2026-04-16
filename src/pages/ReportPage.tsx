import { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, CheckCircle, Locate, Loader2 } from 'lucide-react';

// TODO: wire to Firebase reporting pipeline
// Endpoint URL comes from env var — never hardcode
const REPORT_FORM_URL = import.meta.env.VITE_REPORT_FORM_URL as string | undefined;

const ReportPage = () => {
  const [photoPreview, setPhotoPreview]     = useState<string | null>(null);
  const [photoFile, setPhotoFile]           = useState<File | null>(null);
  const [locationText, setLocationText]     = useState('');
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [description, setDescription]       = useState('');
  const [contact, setContact]               = useState('');
  const [submitted, setSubmitted]           = useState(false);
  const [photoError, setPhotoError]         = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-request location on mount
  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
      },
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

    // TODO: wire to Firebase reporting pipeline
    if (REPORT_FORM_URL) {
      window.location.href = REPORT_FORM_URL;
      return;
    }

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
            Thank you for your report. We will verify the information and follow up — either by adding it to the civic dashboard, coordinating with the relevant authorities, or reaching out to you directly.
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
              {photoError && <p className="text-xs text-[#EF4444] mt-1">At least one photo is required.</p>}
            </div>

            {/* 2. Location picker */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Location <span className="text-[#EF4444]">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Drop a pin at the exact location of the problem.</p>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-border mb-3">
                <div
                  className="relative w-full h-40 bg-muted flex items-center justify-center"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(0,0,0,0.06) 19px,rgba(0,0,0,0.06) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(0,0,0,0.06) 19px,rgba(0,0,0,0.06) 20px)',
                  }}
                >
                  {locationLoading ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-xs">Detecting your location…</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <MapPin
                          className="h-10 w-10 text-primary drop-shadow"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                        />
                      </div>
                      {locationCoords ? (
                        <span className="text-xs bg-card border border-border px-2 py-0.5 rounded-full text-foreground font-medium shadow-sm">
                          {locationCoords.lat.toFixed(5)}, {locationCoords.lng.toFixed(5)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Location not set</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Use my location button */}
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
                    {locationLoading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Locate className="h-3.5 w-3.5" />
                    )}
                    Use my location
                  </button>
                </div>
              </div>

              {/* Address description */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  id="location"
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
    </div>
  );
};

export default ReportPage;
