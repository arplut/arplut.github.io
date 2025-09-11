import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, ThumbsUp, Loader2, ServerCrash, Layers, Map, List } from "lucide-react";
import { reportsService, Report } from "@/services/reportsService";
import { useToast } from "@/hooks/use-toast";
// TEMP_WIP_OVERLAY: OpenStreetMap import temporarily disabled to prevent z-index conflict with overlay - restore when page is ready
// import OpenStreetMap, { type MapReport } from "@/components/OpenStreetMap";
import { statusColors, categoryColors } from "@/data/mockData"; // Keep for colors
import { formatDistanceToNow } from 'date-fns';
// TEMP_WIP_OVERLAY: Import for temporary work-in-progress overlay - remove when page is ready
import WorkInProgressOverlay from "@/components/WorkInProgressOverlay";

const MapReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<string[]>(['all']);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { toast } = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const fetchedReports = await reportsService.getReports();
        // Filter out anonymous reports if needed, or handle based on privacy rules
        const publicReports = fetchedReports.filter(r => !r.isAnonymous || (r.isAnonymous && r.status !== 'pending'));
        setReports(publicReports);
        setFilteredReports(publicReports);
        setError(null);
      } catch (err) {
        setError("Failed to load reports. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.category === categoryFilter));
    }
  }, [categoryFilter, reports]);

  const handleReportClick = (reportId: string) => {
    setSelectedReportId(reportId);
  };

  const handleEndorse = async (reportId: string) => {
    try {
      // Use anonymous user ID for public endorsements
      await reportsService.endorseReport(reportId, 'anonymous-user');
      // Refresh reports to update endorsement count
      const updatedReports = await reportsService.getReports();
      const publicReports = updatedReports.filter(r => !r.isAnonymous || (r.isAnonymous && r.status !== 'pending'));
      setReports(publicReports);
      setFilteredReports(categoryFilter === 'all' ? publicReports : publicReports.filter(report => report.category === categoryFilter));
      toast({ title: "Thank you!", description: "Your endorsement has been recorded." });
    } catch (error) {
      toast({ title: "Error", description: "Unable to endorse the report. Please try again.", variant: "destructive" });
    }
  };

  const selectedReportData = selectedReportId ? reports.find(r => r.id === selectedReportId) : null;

  // TEMP_WIP_OVERLAY: Convert reports to map format when OpenStreetMap is restored
  // const mapReports: MapReport[] = filteredReports
  //   .filter(report => report.location && report.location.latitude && report.location.longitude)
  //   .map(report => ({
  //     id: report.id!,
  //     lat: report.location.latitude,
  //     lng: report.location.longitude,
  //     title: report.title,
  //     category: report.category,
  //     status: report.status,
  //   }));

  return (
    <div className="min-h-screen bg-gradient-subtle relative">
      <WorkInProgressOverlay />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reports & Map</h1>
            <p className="text-gray-600 mt-2">View environmental reports and their locations</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg overflow-hidden border">
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="rounded-none"
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="water-pollution">Water Pollution</SelectItem>
                  <SelectItem value="air-pollution">Air Pollution</SelectItem>
                  <SelectItem value="waste-management">Waste Management</SelectItem>
                  <SelectItem value="noise-pollution">Noise Pollution</SelectItem>
                  <SelectItem value="illegal-dumping">Illegal Dumping</SelectItem>
                  <SelectItem value="deforestation">Deforestation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <ServerCrash className="h-10 w-10 mb-4 mx-auto" />
            <p className="font-semibold">{error}</p>
            <p className="text-sm">Please try refreshing the page.</p>
          </div>
        ) : (
          <>
            {viewMode === 'map' ? (
              <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                {/* Report Details Panel */}
                <div className="lg:w-80 flex-shrink-0">
                  {selectedReportData ? (
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{selectedReportData.title}</CardTitle>
                        <CardDescription>{selectedReportData.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge style={{ backgroundColor: statusColors[selectedReportData.status] }} className="text-white">
                            {selectedReportData.status}
                          </Badge>
                          <Badge style={{ backgroundColor: categoryColors[selectedReportData.category] }} className="text-white">
                            {selectedReportData.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Reported {formatDistanceToNow(selectedReportData.createdAt.toDate(), { addSuffix: true })}
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleEndorse(selectedReportData.id!)}
                          disabled={selectedReportData.endorsements.includes('anonymous-user')}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {selectedReportData.endorsements.includes('anonymous-user') ? 'Endorsed' : `Endorse (${selectedReportData.endorsementCount})`}
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center text-muted-foreground p-8 h-full flex flex-col justify-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p>Click on a map pin to see report details.</p>
                    </div>
                  )}
                </div>

                {/* Map Area */}
                <div className="flex-1 h-full w-full">
                  {/* TEMP_WIP_OVERLAY: OpenStreetMap component temporarily disabled to prevent z-index conflict with overlay */}
                  {/* <OpenStreetMap
                    reports={mapReports}
                    onReportClick={handleReportClick}
                    selectedReportId={selectedReportId}
                    className="h-full w-full"
                  /> */}
                  
                  {/* TEMP_WIP_OVERLAY: Placeholder div while OpenStreetMap is disabled - remove when page is ready */}
                  <div className="h-full w-full flex items-center justify-center bg-muted/20 text-muted-foreground rounded-lg border">
                    <div className="text-center">
                      <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Map Component Disabled</p>
                      <p className="text-sm">Will be available after work in progress</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <List className="h-5 w-5 mr-2" />
                    Reports List
                  </CardTitle>
                  <CardDescription>
                    {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
                    {categoryFilter !== 'all' && ` for "${categoryFilter}"`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredReports.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-semibold">No reports found</h3>
                      <p className="text-muted-foreground">
                        {categoryFilter === 'all' ? "No reports have been submitted yet." : `No reports found for the category "${categoryFilter}".`}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredReports.map((report) => (
                        <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{report.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge style={{ backgroundColor: statusColors[report.status] }} className="text-white">
                                {report.status}
                              </Badge>
                              <Badge style={{ backgroundColor: categoryColors[report.category] }} className="text-white">
                                {report.category}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              Reported {formatDistanceToNow(report.createdAt.toDate(), { addSuffix: true })}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedReportId(report.id!);
                                  setViewMode('map');
                                }}
                              >
                                View on Map
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleEndorse(report.id!)}
                                disabled={report.endorsements.includes('anonymous-user')}
                              >
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                {report.endorsements.includes('anonymous-user') ? 'Endorsed' : `${report.endorsementCount}`}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MapReports;
