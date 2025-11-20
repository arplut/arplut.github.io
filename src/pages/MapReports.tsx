// TODO: Heatmap + Ward Overlay Visualization Plan
// -------------------------------------------------
// Visualization Goals:
// 1. Show a point-based HEATMAP layer (gradient: green → yellow → red)
//    - Data source: Firestore reports (latitude, longitude, endorsementCount, status).
//    - Weight function: More endorsements = stronger heat intensity.
// 2. Overlay WARD BOUNDARIES (GeoJSON polygons).
//    - Initially outlines only (thin border, semi-transparent fill).
//    - Later optional choropleth mode: fill wards with color intensity based on report density.
// 3. UX Toggles (top-right controls):
//    - [Heatmap] <-> [Cluster Pins] switch
//    - [Show Ward Boundaries] toggle
//    - (Future) [Ward Summary] toggle for choropleth view
// 4. Mobile UI: 
//    - Heatmap fills ~50% of screen height
//    - Ward outlines visible at all zoom levels
//    - Tapping inside a ward (future) could show summary of reports
// 5. Desktop UI:
//    - Heatmap + ward outlines visible by default
//    - Sidebar shows either report details (when pin selected) or ward summary (future).
//
// Notes:
// - Until updated ward maps are available, keep placeholder GeoJSON import disabled.
// - Store ward GeoJSON in a `/data/wards.json` file when ready.
// - Implementation Reference: Leaflet/Mapbox heatmap layers + polygon overlays.


import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MapPin, Filter, ThumbsUp, Loader2, ServerCrash, Layers, Grid, Map, ToggleLeft, ToggleRight, Calendar, CheckCircle2, Camera } from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";
import MapErrorBoundary from "@/components/MapErrorBoundary";
import { reportsService, Report } from "@/services/reportsService";
import { initializeAuth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import OpenStreetMap, { type MapReport } from "@/components/OpenStreetMap";
import { categoryColors, categoryColorHex } from "@/data/mockData";
import { sampleReports } from "@/data/sampleReports";
import { formatDistanceToNow } from 'date-fns';

// ⚠️ DEVELOPMENT MODE FLAG ⚠️
// Set to true to use sample data for heatmap testing
// Set to false to use live Firebase data
const USE_SAMPLE_DATA_FOR_TESTING = false;

const MapReports = () => {
  const isMobile = useIsMobile();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('map');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  // Initialize Firebase authentication when MapReports component loads
  useEffect(() => {
    const initAuth = async () => {
      try {
        await initializeAuth();
        setAuthReady(true);
        console.log('🔥 Firebase authentication initialized for map page');
      } catch (error) {
        console.error('Failed to initialize Firebase auth:', error);
        setAuthReady(true); // Still proceed, will fall back to sample data
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    // Only fetch reports after auth is ready
    if (!authReady) return;

    const fetchReports = async () => {
      try {
        setLoading(true);

        if (USE_SAMPLE_DATA_FOR_TESTING) {
          // Using sample data for heatmap testing
          console.log('🔧 DEVELOPMENT MODE: Using sample data for heatmap testing');
          const transformedSampleReports = sampleReports.map(report => ({
            ...report,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt
          })) as Report[];

          setReports(transformedSampleReports);
          setFilteredReports(transformedSampleReports);
        } else {
          // Using live Firebase data
          console.log('🔥 PRODUCTION MODE: Using live Firebase data');
          try {
            const fetchedReports = await reportsService.getReports();
            console.log('📊 Total fetched reports:', fetchedReports.length);

            // Log status distribution for debugging
            const statusCounts = fetchedReports.reduce((acc, r) => {
              acc[r.status] = (acc[r.status] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
            console.log('📊 Status distribution:', statusCounts);

            // Show all reports (including anonymous ones for legacy data)
            setReports(fetchedReports);
            setFilteredReports(fetchedReports);
          } catch (firebaseError) {
            console.error('🔥 Firebase Error Details:', firebaseError);
            console.log('🔧 Falling back to sample data due to Firebase connection issues');

            // Fallback to sample data if Firebase fails
            const transformedSampleReports = sampleReports.map(report => ({
              ...report,
              createdAt: report.createdAt,
              updatedAt: report.updatedAt
            })) as Report[];

            setReports(transformedSampleReports);
            setFilteredReports(transformedSampleReports);

            toast({
              title: "Using Sample Data",
              description: "Firebase connection failed. Showing sample data for demonstration.",
              variant: "default",
            });
          }
        }

        setError(null);
      } catch (err) {
        setError("Failed to load reports and map data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [authReady]); // Only run when auth is ready

  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.category === categoryFilter));
    }
  }, [categoryFilter, reports]);

  // Memoize expensive computations
  const mapReports: MapReport[] = useMemo(() =>
    filteredReports
      .filter(report =>
        report.location?.coordinates?.latitude &&
        report.location?.coordinates?.longitude &&
        !isNaN(report.location.coordinates.latitude) &&
        !isNaN(report.location.coordinates.longitude)
      )
      .map(report => ({
        id: report.id!,
        position: [report.location.coordinates.latitude, report.location.coordinates.longitude],
        title: report.title,
        category: report.category,
        status: report.status as 'pending' | 'verified' | 'resolved' | 'archived',
        description: report.description,
        photos: report.photos,
        endorsementCount: report.endorsementCount,
        ward: report.location.ward || report.location.address?.split(',')[0], // Extract ward from address
        createdAt: report.createdAt.toDate().toISOString(),
      })),
    [filteredReports]
  );

  // Memoize status colors to prevent object recreation
  const statusColors = useMemo(() => ({
    pending: 'hsl(0 84% 60%)', // red
    verified: 'hsl(45 93% 47%)', // yellow  
    resolved: 'hsl(142 71% 45%)', // green
    archived: 'hsl(215 16% 47%)' // gray
  }), []);

  // Memoized callback for report click handling
  const handleReportClick = useCallback((reportId: string) => {
    setSelectedReportId(reportId);
    if (isMobile) {
      setSheetOpen(true);
    }
  }, [isMobile]);

  // Memoized callback for view details
  const handleViewDetails = useCallback((reportId: string) => {
    setSelectedReportId(reportId);
    setActiveView('map');
    if (isMobile) {
      setSheetOpen(true);
    }
  }, [isMobile]);

  // Debug logging
  console.log('MapReports - Total reports:', reports.length);
  console.log('MapReports - Filtered reports:', filteredReports.length);
  console.log('MapReports - Map reports:', mapReports.length);
  console.log('MapReports - Show heatmap:', showHeatmap);

  const selectedReportData = useMemo(() =>
    reports.find(r => r.id === selectedReportId),
    [reports, selectedReportId]
  );

  const categoryOptions = useMemo(() =>
    ['all', 'garbage', 'sewage', 'burning', 'construction', 'pollution', 'other'],
    []
  );

  const getStatusColor = useCallback((status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  }, [statusColors]);

  const ReportDetailsContent = ({ report }: { report: Report }) => (
    <div className="space-y-6">
      {report.status !== 'archived' && report.photos.length > 0 && (
        <div className="rounded-xl overflow-hidden shadow-sm">
          <PhotoCarousel photos={report.photos} title={report.title} />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            style={{ backgroundColor: getStatusColor(report.status) }}
            className="text-white px-3 py-1 text-sm font-medium shadow-sm"
          >
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </Badge>
          <Badge
            variant="outline"
            className="text-foreground border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium"
          >
            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{report.description}</p>
        </div>

        {/* Add ward info to description if available */}
        {report.location.ward && (
          <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
            <p className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Ward: {report.location.ward}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Reported</p>
            <p className="text-sm flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {formatDistanceToNow(report.createdAt.toDate(), { addSuffix: true })}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Endorsements</p>
            <p className="text-sm flex items-center gap-2">
              <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
              {report.endorsementCount}
            </p>
          </div>
        </div>

        {report.status === 'archived' && report.photos.length > 0 && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
            📷 {report.photos.length} image(s) archived
          </p>
        )}
      </div>
    </div>
  );

  // Show Firebase authentication loading screen
  if (!authReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-background p-4 rounded-full shadow-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
          <p className="text-lg font-medium text-muted-foreground">Connecting to GEODHA...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading community data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
          <div className="bg-destructive/10 p-4 rounded-full">
            <ServerCrash className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Refreshing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {USE_SAMPLE_DATA_FOR_TESTING && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-sm">
          <strong>Development Mode:</strong> Using sample data. Set <code>USE_SAMPLE_DATA_FOR_TESTING = false</code> to use live data.
        </div>
      )}

      <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust for navbar height */}
        <div className="container px-4 py-6 flex-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Community Map</h1>
              <p className="text-muted-foreground">Real-time insights into civic issues across the city</p>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border/50">
              <Tabs value={activeView} onValueChange={setActiveView} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-2 h-9">
                  <TabsTrigger value="map" className="text-xs sm:text-sm">
                    <Map className="h-3.5 w-3.5 mr-2" />
                    Map View
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="text-xs sm:text-sm">
                    <Grid className="h-3.5 w-3.5 mr-2" />
                    List View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="flex-1 container px-4 pb-6 min-h-0">
          <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
            <TabsContent value="map" className="h-full mt-0 data-[state=active]:flex flex-col">
              {isMobile ? (
                // Mobile Layout
                <div className="flex-1 flex flex-col gap-4 min-h-0">
                  <div className="relative flex-1 rounded-xl overflow-hidden border border-border shadow-soft bg-muted/20">
                    {/* Map Controls */}
                    <div className="absolute top-3 right-3 z-[1000] flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className="shadow-md bg-background/90 backdrop-blur-sm border border-border/50"
                      >
                        {showHeatmap ? (
                          <>
                            <Grid className="h-3.5 w-3.5 mr-1.5" />
                            Pins
                          </>
                        ) : (
                          <>
                            <Layers className="h-3.5 w-3.5 mr-1.5" />
                            Heatmap
                          </>
                        )}
                      </Button>
                    </div>

                    <MapErrorBoundary>
                      <OpenStreetMap
                        reports={mapReports}
                        onReportClick={handleReportClick}
                        selectedReportId={selectedReportId}
                        showHeatmap={showHeatmap}
                        enableClustering={!showHeatmap}
                        zoom={isMobile ? 11 : undefined}
                        className="h-full w-full"
                      />
                    </MapErrorBoundary>
                  </div>

                  {!selectedReportData && (
                    <div className="bg-muted/30 border border-border/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Tap a pin to view details
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Desktop Layout
                <div className="flex-1 flex gap-6 h-full min-h-0">
                  {/* Sidebar */}
                  <div className="w-96 flex-none flex flex-col bg-card border rounded-xl shadow-sm overflow-hidden h-full">
                    {selectedReportData ? (
                      <div className="flex flex-col h-full">
                        <div className="p-4 border-b bg-muted/10">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedReportId(null)}
                            className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                          >
                            ← Back to list
                          </Button>
                          <h2 className="font-bold text-xl leading-tight">{selectedReportData.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {selectedReportData.location.address || selectedReportData.location.ward || '-'}
                          </p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                          <ReportDetailsContent report={selectedReportData} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground space-y-4">
                        <div className="bg-secondary/50 p-4 rounded-full">
                          <MapPin className="h-8 w-8 text-primary/60" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Select a Report</p>
                          <p className="text-sm mt-1">Click on a map marker to view details</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Map Area */}
                  <div className="flex-1 relative rounded-xl overflow-hidden border border-border shadow-soft bg-muted/20">
                    <div className="absolute top-4 right-4 z-[1000]">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className="shadow-md bg-background/90 backdrop-blur-sm border border-border/50"
                      >
                        {showHeatmap ? (
                          <>
                            <Grid className="h-4 w-4 mr-2" />
                            Show Pins
                          </>
                        ) : (
                          <>
                            <Layers className="h-4 w-4 mr-2" />
                            Show Heatmap
                          </>
                        )}
                      </Button>
                    </div>

                    <MapErrorBoundary>
                      <OpenStreetMap
                        reports={mapReports}
                        onReportClick={handleReportClick}
                        selectedReportId={selectedReportId}
                        showHeatmap={showHeatmap}
                        enableClustering={!showHeatmap}
                        zoom={9}
                        className="h-full w-full"
                      />
                    </MapErrorBoundary>
                  </div>
                </div>
              )}

              {/* Mobile Bottom Sheet */}
              {isMobile && selectedReportData && (
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetContent side="bottom" className="h-[75vh] rounded-t-[20px] p-0 overflow-hidden flex flex-col z-[2000]">
                    <SheetHeader className="p-6 pb-2 text-left border-b bg-background/95 backdrop-blur">
                      <SheetTitle className="text-lg font-bold leading-tight pr-8">
                        {selectedReportData.title}
                      </SheetTitle>
                      <SheetDescription className="text-sm truncate">
                        {selectedReportData.location.address || selectedReportData.location.ward || '-'}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-6 pt-4">
                      <ReportDetailsContent report={selectedReportData} />
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </TabsContent>

            <TabsContent value="reports" className="h-full mt-0 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredReports.length} reports
                </div>
                {/* Filter dropdown could go here */}
              </div>

              <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                {filteredReports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-muted/30 p-6 rounded-full mb-4">
                      <Filter className="h-10 w-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold">No reports found</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                      Try adjusting your filters or check back later for new community reports.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {filteredReports.map((report) => (
                      <Card
                        key={report.id}
                        className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card"
                      >
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          {report.status !== 'archived' && report.photos.length > 0 ? (
                            <img
                              src={report.photos[0]}
                              alt={report.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/30">
                              <Camera className="h-8 w-8 opacity-50" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Badge
                              className="shadow-sm backdrop-blur-md bg-background/80 text-foreground hover:bg-background/90"
                            >
                              {report.category}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-5 space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                variant="outline"
                                className="text-xs font-normal"
                                style={{
                                  borderColor: getStatusColor(report.status),
                                  color: getStatusColor(report.status),
                                  backgroundColor: `${getStatusColor(report.status)}10`
                                }}
                              >
                                {report.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(report.createdAt.toDate(), { addSuffix: true })}
                              </span>
                            </div>
                            <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                              {report.title}
                            </h3>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {report.description}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-border/50">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="truncate max-w-[120px]">
                                {report.location.ward || 'Unknown Location'}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/5"
                              onClick={() => handleViewDetails(report.id!)}
                            >
                              Details →
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MapReports;
