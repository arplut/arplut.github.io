import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, ThumbsUp, Loader2, ServerCrash, Layers } from "lucide-react";
import { reportsService, Report } from "@/services/reportsService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import OpenStreetMap, { type MapReport } from "@/components/OpenStreetMap";
import { statusColors, categoryColors } from "@/data/mockData"; // Keep for colors
import { formatDistanceToNow } from 'date-fns';

const MapPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<string[]>(['all']);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const fetchedReports = await reportsService.getReports();
        setReports(fetchedReports);
        setError(null);
      } catch (err) {
        setError("Failed to load map data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleReportClick = (reportId: string) => {
    setSelectedReportId(reportId);
  };

  const handleEndorse = async (reportId: string) => {
    if (!user) {
      toast({ title: "Login Required", description: "Please log in to endorse a report.", variant: "destructive" });
      return;
    }
    try {
      await reportsService.endorseReport(reportId, user.uid);
      // Optimistically update the UI
      setReports(prevReports => prevReports.map(r => 
        r.id === reportId 
          ? { ...r, endorsementCount: r.endorsementCount + 1, endorsements: [...r.endorsements, user.uid] }
          : r
      ));
      toast({ title: "Success", description: "Report endorsed successfully!" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to endorse the report.", variant: "destructive" });
      console.error(err);
    }
  };

  const filteredReports = reports.filter(report => 
    visibleCategories.includes('all') || visibleCategories.includes(report.category)
  );

  const mapReports: MapReport[] = filteredReports.map(report => ({
    id: report.id!,
    position: [report.location.coordinates.latitude, report.location.coordinates.longitude],
    title: report.title,
    category: report.category,
    status: report.status,
    description: report.description,
    photos: report.photos,
    endorsementCount: report.endorsementCount,
  }));

  const selectedReportData = reports.find(r => r.id === selectedReportId);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'garbage', label: 'Garbage' },
    { value: 'sewage', label: 'Sewage' },
    { value: 'burning', label: 'Burning' },
    { value: 'construction', label: 'Construction' },
    { value: 'pollution', label: 'Pollution' },
    { value: 'other', label: 'Other' },
  ];

  const toggleCategory = (category: string) => {
    if (category === 'all') {
      setVisibleCategories(['all']);
      return;
    }
    const newCategories = visibleCategories.includes('all') 
      ? [category] 
      : visibleCategories.includes(category)
        ? visibleCategories.filter(c => c !== category)
        : [...visibleCategories, category];
    
    if (newCategories.length === 0) {
      setVisibleCategories(['all']);
    } else {
      setVisibleCategories(newCategories.filter(c => c !== 'all'));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-background border-r overflow-y-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Map Filters</CardTitle>
            <CardDescription>Select categories to display on the map.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(cat => (
                <Button
                  key={cat.value}
                  variant={visibleCategories.includes(cat.value) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedReportData ? (
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>{selectedReportData.title}</CardTitle>
              <CardDescription>{selectedReportData.location.address}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReportData.photos.length > 0 && (
                <img src={selectedReportData.photos[0]} alt={selectedReportData.title} className="rounded-lg w-full h-40 object-cover mb-4" />
              )}
              <p className="text-sm text-muted-foreground mb-4">{selectedReportData.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge style={{ backgroundColor: statusColors[selectedReportData.status] }} className="text-white">{selectedReportData.status}</Badge>
                <Badge style={{ backgroundColor: categoryColors[selectedReportData.category] }} className="text-white">{selectedReportData.category}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                Reported {formatDistanceToNow(selectedReportData.createdAt.toDate(), { addSuffix: true })}
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleEndorse(selectedReportData.id!)}
                disabled={!user || selectedReportData.endorsements.includes(user.uid)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                {selectedReportData.endorsements.includes(user?.uid || '') ? 'Endorsed' : `Endorse (${selectedReportData.endorsementCount})`}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Click on a map pin to see report details.</p>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="flex-1 h-full w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="h-full w-full flex items-center justify-center bg-destructive/10 text-destructive">
            <ServerCrash className="h-12 w-12 mr-4" />
            <div>
              <p className="font-bold">Could not load map</p>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <OpenStreetMap
            reports={mapReports}
            onReportClick={handleReportClick}
            selectedReportId={selectedReportId}
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;