import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Camera } from "lucide-react";
import { mockReports, Report, categoryColors } from "@/data/mockData";
import ReportCard from "@/components/ReportCard";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetails = (reportId: string) => {
    toast({
      title: "Feature Coming Soon",
      description: "Report details view will be available soon!",
    });
  };

  const handleEndorse = (reportId: string) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, endorsements: report.endorsements + 1, hasUserEndorsed: true }
          : report
      )
    );
    toast({
      title: "Report Endorsed!",
      description: "Thank you for validating this report.",
    });
  };

  const categoryStats = {
    all: reports.length,
    garbage: reports.filter(r => r.category === 'garbage').length,
    sewage: reports.filter(r => r.category === 'sewage').length,
    burning: reports.filter(r => r.category === 'burning').length,
    construction: reports.filter(r => r.category === 'construction').length,
    pollution: reports.filter(r => r.category === 'pollution').length,
    other: reports.filter(r => r.category === 'other').length,
  };

  const statusStats = {
    all: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    verified: reports.filter(r => r.status === 'verified').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community Reports</h1>
            <p className="text-muted-foreground">Browse and validate civic issues reported by citizens</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="lg" onClick={() => {
              window.history.pushState({}, '', '/map');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}>
              <MapPin className="h-5 w-5 mr-2" />
              Map View
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

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{reports.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{statusStats.pending}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{statusStats.verified}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{statusStats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports, locations, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories ({categoryStats.all})</SelectItem>
                  <SelectItem value="garbage">Garbage ({categoryStats.garbage})</SelectItem>
                  <SelectItem value="sewage">Sewage ({categoryStats.sewage})</SelectItem>
                  <SelectItem value="burning">Burning ({categoryStats.burning})</SelectItem>
                  <SelectItem value="construction">Construction ({categoryStats.construction})</SelectItem>
                  <SelectItem value="pollution">Pollution ({categoryStats.pollution})</SelectItem>
                  <SelectItem value="other">Other ({categoryStats.other})</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status ({statusStats.all})</SelectItem>
                  <SelectItem value="pending">Pending ({statusStats.pending})</SelectItem>
                  <SelectItem value="verified">Verified ({statusStats.verified})</SelectItem>
                  <SelectItem value="resolved">Resolved ({statusStats.resolved})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Active Filters */}
            {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
              <div className="flex flex-wrap gap-2 pt-2">
                {searchTerm && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Category: {categoryFilter}
                    <button
                      onClick={() => setCategoryFilter("all")}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Status: {statusFilter}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredReports.length} Report{filteredReports.length !== 1 ? 's' : ''} Found
            </h2>
          </div>
          
          {filteredReports.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onViewDetails={handleViewDetails}
                  onEndorse={handleEndorse}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;