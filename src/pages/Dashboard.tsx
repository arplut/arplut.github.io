import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Award, TrendingUp, Users, Calendar, Loader2 } from "lucide-react";
import { reportsService, Report } from "@/services/reportsService";
import ReportCard from "@/components/ReportCard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
// TEMP_WIP_OVERLAY: Import for temporary work-in-progress overlay - remove when page is ready
import WorkInProgressOverlay from "@/components/WorkInProgressOverlay";

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const fetchReports = async () => {
        try {
          setLoading(true);
          const userReports = await reportsService.getReports({ authorId: user.uid });
          setReports(userReports);
          setError(null);
        } catch (err) {
          setError("Failed to fetch reports. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchReports();
    }
  }, [user]);

  const handleEndorse = async (reportId: string) => {
    if (!user) {
      toast({ title: "Authentication Required", description: "You must be logged in to endorse reports.", variant: "destructive" });
      return;
    }
    try {
      await reportsService.endorseReport(reportId, user.uid);
      toast({
        title: "Report Endorsed!",
        description: "Thank you for validating this report.",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Endorsement Failed", description: "There was an error endorsing the report.", variant: "destructive" });
    }
  };

  const stats = [
    {
      title: "Reports Submitted",
      value: userProfile?.totalReports ?? 0,
      icon: Camera,
      description: "Total issues reported",
      color: "text-primary"
    },
    {
      title: "Endorsements Given",
      value: 0,
      icon: Users,
      description: "Reports you've validated",
      color: "text-accent"
    },
    {
      title: "Endorsements Received",
      value: userProfile?.totalEndorsements ?? 0,
      icon: TrendingUp,
      description: "Community trust score",
      color: "text-warning"
    },
    {
      title: "Badges Earned",
      value: userProfile?.badges.length ?? 0,
      icon: Award,
      description: "Achievement milestones",
      color: "text-primary"
    }
  ];

  if (!user && !loading) {
    return (
      <div className="container px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to view your dashboard.</p>
        <Button asChild>
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* TEMP_WIP_OVERLAY: Temporary work-in-progress overlay - remove when page is ready */}
      <WorkInProgressOverlay />
      <div className="container px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || 'User'}!</h1>
            <p className="text-muted-foreground">Here's your civic engagement overview</p>
          </div>
          <Button asChild variant="hero" size="lg">
            <Link to="/create">
              <Camera className="h-5 w-5 mr-2" />
              New Report
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Your Achievements
            </CardTitle>
            <CardDescription>Recognition for your civic contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile?.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {badge}
                </Badge>
              )) || <p className="text-sm text-muted-foreground">No badges earned yet.</p>}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Member since {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="my-reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-reports" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Your Reports</CardTitle>
                <CardDescription>Issues you've reported to the community</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Loading your reports...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-destructive">
                    <p>{error}</p>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
                    <p className="text-muted-foreground mb-4">Start making a difference in your community</p>
                    <Button asChild variant="hero">
                      <Link to="/create">
                        <Camera className="h-4 w-4 mr-2" />
                        Create First Report
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {reports.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onViewDetails={() => {}}
                        onEndorse={handleEndorse}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest civic engagement actions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Recent activity feed coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;