import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ThumbsUp, Eye } from "lucide-react";
import { Report, categoryColors, statusColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface ReportCardProps {
  report: Report;
  onViewDetails: (reportId: string) => void;
  onEndorse?: (reportId: string) => void;
}

const ReportCard = ({ report, onViewDetails, onEndorse }: ReportCardProps) => {
  const { toast } = useToast();

  const handleEndorse = () => {
    if (onEndorse) {
      onEndorse(report.id);
      toast({
        title: "Report Endorsed!",
        description: "Thank you for validating this report.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{report.title}</CardTitle>
          <Badge className={statusColors[report.status]} variant="secondary">
            {report.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={categoryColors[report.category]} variant="outline">
            {report.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {report.photos.length > 0 && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img 
              src={report.photos[0]} 
              alt={report.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <p className="text-muted-foreground line-clamp-3">{report.description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{report.location.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Reported on {formatDate(report.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>By {report.reportedBy}</span>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{report.endorsements}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(report.id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {!report.hasUserEndorsed && (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleEndorse}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Endorse
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;