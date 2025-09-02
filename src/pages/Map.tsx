import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, Camera, Navigation, ZoomIn, ZoomOut, Layers } from "lucide-react";
import { mockReports, statusColors, categoryColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import GoogleMap, { type MapReport } from "@/components/GoogleMap";

const Map = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'street'>('street');
  const [visibleCategories, setVisibleCategories] = useState<string[]>(['all']);
  const { toast } = useToast();

  const filteredReports = mockReports.filter(report => 
    visibleCategories.includes('all') || visibleCategories.includes(report.category)
  );

  // Convert mock reports to map format
  const mapReports: MapReport[] = filteredReports.map((report, index) => ({
    id: report.id,
    position: [
      12.9716 + (Math.random() - 0.5) * 0.1, // Random positions around Bangalore
      77.5946 + (Math.random() - 0.5) * 0.1
    ],
    title: report.title,
    category: report.category,
    status: report.status,
    description: report.description,
    photos: report.photos,
    endorsementCount: report.endorsements
  }));

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId);
  };

  const handleEndorse = (reportId: string) => {
    toast({
      title: "Report Endorsed!",
      description: "Thank you for validating this report.",
    });
  };

  const selectedReportData = mockReports.find(r => r.id === selectedReport);

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: mockReports.length },
    { value: 'garbage', label: 'Garbage', count: mockReports.filter(r => r.category === 'garbage').length },
    { value: 'sewage', label: 'Sewage', count: mockReports.filter(r => r.category === 'sewage').length },
    { value: 'burning', label: 'Burning', count: mockReports.filter(r => r.category === 'burning').length },
    { value: 'construction', label: 'Construction', count: mockReports.filter(r => r.category === 'construction').length },
    { value: 'pollution', label: 'Pollution', count: mockReports.filter(r => r.category === 'pollution').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interactive Map</h1>
            <p className="text-muted-foreground">Explore civic issues across your city</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="lg">
              <Navigation className="h-5 w-5 mr-2" />
              Center on Me
            </Button>
            <Button variant="hero" size="lg" onClick={() => {
              window.history.pushState({}, '', '/create');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}>
              <Camera className="h-5 w-5 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Controls Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Map Controls */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Map Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={mapView === 'street' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setMapView('street')}
                  >
                    Street
                  </Button>
                  <Button
                    variant={mapView === 'satellite' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setMapView('satellite')}
                  >
                    Satellite
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Filters */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleCategories.includes(category.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVisibleCategories([...visibleCategories, category.value]);
                          } else {
                            setVisibleCategories(visibleCategories.filter(c => c !== category.value));
                          }
                        }}
                        className="rounded border-input"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Status Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-warning"></div>
                  <span className="text-sm">Pending Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent"></div>
                  <span className="text-sm">Verified Issue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Resolved</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-soft h-[600px] relative overflow-hidden">
              <CardContent className="p-0 h-full">
                <GoogleMap
                  reports={mapReports}
                  center={[12.9716, 77.5946]} // Bangalore
                  zoom={13}
                  onReportClick={handleReportClick}
                  selectedReportId={selectedReport}
                  className="h-full w-full"
                />

                {/* Selected Report Popup Overlay */}
                {selectedReport && selectedReportData && (
                  <div className="absolute top-4 left-4 max-w-sm z-[1000]">
                    <Card className="shadow-glow border-2 border-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">
                            {selectedReportData.title}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedReport(null)}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={statusColors[selectedReportData.status]} variant="secondary">
                            {selectedReportData.status}
                          </Badge>
                          <Badge className={categoryColors[selectedReportData.category]} variant="outline">
                            {selectedReportData.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {selectedReportData.photos.length > 0 && (
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                            <img 
                              src={selectedReportData.photos[0]} 
                              alt={selectedReportData.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {selectedReportData.description}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{selectedReportData.location.address}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          {!selectedReportData.hasUserEndorsed && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleEndorse(selectedReportData.id)}
                            >
                              Endorse
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;