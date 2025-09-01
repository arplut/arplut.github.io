import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, Send, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateReport = () => {
  const [step, setStep] = useState(1);
  const [reportData, setReportData] = useState({
    title: "",
    description: "",
    category: "",
    photos: [] as string[],
    location: {
      address: "",
      lat: 0,
      lng: 0
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "garbage", label: "Garbage / Waste Management", description: "Overflowing bins, illegal dumping, litter" },
    { value: "sewage", label: "Sewage / Drainage", description: "Blocked drains, sewage overflow, water logging" },
    { value: "burning", label: "Burning / Air Pollution", description: "Waste burning, smoke, air quality issues" },
    { value: "construction", label: "Construction Issues", description: "Illegal construction, debris, noise" },
    { value: "pollution", label: "Environmental Pollution", description: "Water contamination, industrial pollution" },
    { value: "other", label: "Other Issues", description: "Public safety, infrastructure, other civic problems" }
  ];

  const handlePhotoCapture = () => {
    // Simulate photo capture
    const mockPhoto = `/api/placeholder/400/300?random=${Date.now()}`;
    setReportData(prev => ({
      ...prev,
      photos: [...prev.photos, mockPhoto]
    }));
    toast({
      title: "Photo Captured!",
      description: "Photo added to your report.",
    });
  };

  const handleLocationDetect = () => {
    // Simulate GPS location detection
    const mockLocation = {
      address: "Detected: MG Road, Bengaluru, Karnataka 560001",
      lat: 12.9716 + (Math.random() - 0.5) * 0.01,
      lng: 77.5946 + (Math.random() - 0.5) * 0.01
    };
    setReportData(prev => ({
      ...prev,
      location: mockLocation
    }));
    toast({
      title: "Location Detected!",
      description: "GPS coordinates captured successfully.",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep(4); // Success step
    
    toast({
      title: "Report Submitted Successfully!",
      description: "Your report has been sent to the community for validation.",
    });
  };

  const canProceedToStep2 = reportData.photos.length > 0;
  const canProceedToStep3 = reportData.title && reportData.description && reportData.category;
  const canSubmit = reportData.location.address;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4 shadow-glow">
          <CardContent className="text-center p-8">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your report is now live and available for community validation.
            </p>
            <div className="space-y-3">
              <Button variant="hero" className="w-full" onClick={() => window.location.href = '/reports'}>
                View All Reports
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {
                setStep(1);
                setReportData({
                  title: "",
                  description: "",
                  category: "",
                  photos: [],
                  location: { address: "", lat: 0, lng: 0 }
                });
              }}>
                Submit Another Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Report an Issue</h1>
            <p className="text-muted-foreground">Help improve your community by reporting civic problems</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Photo Capture */}
        {step === 1 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Step 1: Capture Evidence
              </CardTitle>
              <CardDescription>
                Take photos of the issue to provide visual evidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Capture Issue</h3>
                <p className="text-muted-foreground mb-4">
                  Take clear photos showing the problem clearly
                </p>
                <div className="space-y-2">
                  <Button onClick={handlePhotoCapture} variant="hero" size="lg">
                    <Camera className="h-5 w-5 mr-2" />
                    Open Camera
                  </Button>
                  <Button onClick={handlePhotoCapture} variant="outline" size="lg" className="w-full">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload from Gallery
                  </Button>
                </div>
              </div>

              {reportData.photos.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Captured Photos ({reportData.photos.length})</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {reportData.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img src={photo} alt={`Captured ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => setReportData(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }))}
                          className="absolute top-2 right-2 bg-destructive text-white rounded-full h-6 w-6 flex items-center justify-center text-sm hover:bg-destructive/90"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                    variant="success"
                    size="lg"
                    className="w-full"
                  >
                    Continue to Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Report Details */}
        {step === 2 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Step 2: Report Details</CardTitle>
              <CardDescription>
                Provide details about the issue to help the community understand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Title*</label>
                <Input
                  placeholder="Brief, descriptive title (e.g., 'Overflowing garbage bin at bus stop')"
                  value={reportData.title}
                  onChange={(e) => setReportData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category*</label>
                <Select value={reportData.category} onValueChange={(value) => setReportData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="py-1">
                          <div className="font-medium">{category.label}</div>
                          <div className="text-sm text-muted-foreground">{category.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description*</label>
                <Textarea
                  placeholder="Provide detailed description of the issue, its impact, and any relevant context..."
                  value={reportData.description}
                  onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedToStep3}
                variant="success"
                size="lg"
                className="w-full"
              >
                Continue to Location
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Step 3: Location
              </CardTitle>
              <CardDescription>
                Confirm the location where the issue was observed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-6 text-center space-y-4">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold mb-2">Auto-detect Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Use GPS to automatically capture your current location
                  </p>
                </div>
                <Button onClick={handleLocationDetect} variant="hero" size="lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  Detect Current Location
                </Button>
              </div>

              {reportData.location.address && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="px-3 py-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      Location Confirmed
                    </Badge>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">{reportData.location.address}</p>
                    <p className="text-sm text-muted-foreground">
                      Coordinates: {reportData.location.lat.toFixed(6)}, {reportData.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Manual Address (Optional)</label>
                <Input
                  placeholder="Enter specific address if different from detected location"
                  value={reportData.location.address.startsWith('Detected:') ? '' : reportData.location.address}
                  onChange={(e) => setReportData(prev => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value }
                  }))}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  variant="success"
                  size="lg"
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateReport;