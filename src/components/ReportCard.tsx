import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ThumbsUp, Eye } from "lucide-react";
import { Report } from "@/services/reportsService";
import { categoryColors, statusColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import OptimizedImage from './OptimizedImage';

interface ReportCardProps {
  report: Report;
  onViewDetails: (reportId: string) => void;
  onEndorse?: (reportId: string) => void;
}

// Memoized component to prevent unnecessary re-renders
const ReportCard = React.memo(({ report, onViewDetails, onEndorse }: ReportCardProps) => {
  const { toast } = useToast();

  // Memoize computed values to prevent unnecessary recalculations
  const formattedDate = useMemo(() => {
    if (report.createdAt && report.createdAt.toDate) {
      return report.createdAt.toDate().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    return new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }, [report.createdAt]);

  const displayLocation = useMemo(() => {
    return report.location.address || report.location.ward || '-';
  }, [report.location.address, report.location.ward]);

  const handleEndorse = () => {
    if (onEndorse) {
      onEndorse(report.id);
      toast({
        title: "Report Endorsed!",
        description: "Thank you for validating this report.",
      });
    }
  };

  return (
    <Card className="hover:shadow-glow transition-all duration-300 cursor-pointer transform-gpu"> {/* Add hardware acceleration */}
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
          <OptimizedImage
            src={report.photos[0]}
            alt={report.title}
            className="rounded-lg"
            aspectRatio="video"
          />
        )}
        
        <p className="text-muted-foreground line-clamp-3">{report.description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1 truncate">{displayLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Reported on {formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="truncate">{report.authorName || (report.isAnonymous ? 'Anonymous' : 'Unknown')}</span>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{report.endorsementCount || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(report.id || '')}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleEndorse}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Endorse
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

ReportCard.displayName = 'ReportCard';

export default ReportCard;