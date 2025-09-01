import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Award, TrendingUp, Users, MapPin, Calendar } from "lucide-react";
import { mockUser, mockReports } from "@/data/mockData";
import ReportCard from "@/components/ReportCard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [reports] = useState(mockReports.filter(report => report.reportedBy === mockUser.name));
  const { toast } = useToast();

  const handleViewDetails = (reportId: string) => {
    toast({
      title: "Feature Coming Soon",
      description: "Report details view will be available soon!",
    });
  };

  const handleEndorse = (reportId: string) => {
    toast({
      title: "Report Endorsed!",
      description: "Thank you for validating this report.",
    });
  };

  const stats = [
    {
      title: "Reports Submitted",
      value: mockUser.reportsSubmitted,
      icon: Camera,
      description: "Total issues reported",
      color: "text-primary"
    },
    {
      title: "Endorsements Given",
      value: mockUser.endorsementsGiven,
      icon: Users,
      description: "Reports you've validated",
      color: "text-accent"
    },
    {
      title: "Endorsements Received",
      value: mockUser.endorsementsReceived,
      icon: TrendingUp,
      description: "Community trust score",
      color: "text-warning"
    },
    {
      title: "Badges Earned",
      value: mockUser.badges.length,
      icon: Award,
      description: "Achievement milestones",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {mockUser.name}!</h1>
            <p className="text-muted-foreground">Here's your civic engagement overview</p>
          </div>
          <Button variant="hero" size="lg">
            <Camera className="h-5 w-5 mr-2" />
            New Report
          </Button>
        </div>

        {/* Stats Grid */}
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

        {/* Profile Section */}
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
              {mockUser.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {badge}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Member since {new Date(mockUser.joinedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
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
                {reports.length === 0 ? (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
                    <p className="text-muted-foreground mb-4">Start making a difference in your community</p>
                    <Button variant="hero">
                      <Camera className="h-4 w-4 mr-2" />
                      Create First Report
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {reports.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onViewDetails={handleViewDetails}
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
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Endorsed a sewage report</p>
                      <p className="text-sm text-muted-foreground">Koramangala area • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                      <Camera className="h-4 w-4 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Submitted garbage overflow report</p>
                      <p className="text-sm text-muted-foreground">MG Road • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Earned "Community Champion" badge</p>
                      <p className="text-sm text-muted-foreground">For 20+ report endorsements • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;