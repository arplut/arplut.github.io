import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Loader2, ServerCrash } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { reportsService, Report } from "@/services/reportsService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
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
        setError("Failed to load reports. The server might be busy.");
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

  const handleEndorse = async (reportId: string) => {
    if (!user) {
      toast({ title: "Login Required", description: "Please log in to endorse a report.", variant: "destructive" });
      return;
    }
    try {
      await reportsService.endorseReport(reportId, user.uid);
      toast({ title: "Success", description: "Report endorsed successfully!" });
      // Optionally, update the specific report's endorsement count in the state
    } catch (err) {
      toast({ title: "Error", description: "Failed to endorse the report.", variant: "destructive" });
      console.error(err);
    }
  };

  const categoryOptions = ['all', 'garbage', 'sewage', 'burning', 'construction', 'pollution', 'other'];

  return (
    <div className="container px-4 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Reports</CardTitle>
          <CardDescription>Browse all public civic issues reported by the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Filter by category..." />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Fetching community reports...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-12 text-destructive">
              <ServerCrash className="h-10 w-10 mb-4" />
              <p className="font-semibold">{error}</p>
              <p className="text-sm">Please try refreshing the page.</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No reports found</h3>
              <p className="text-muted-foreground">
                {categoryFilter === 'all' ? "Be the first to report an issue!" : `No reports found for the category "${categoryFilter}".`}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onViewDetails={() => { /* Implement later */ }}
                  onEndorse={handleEndorse}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;