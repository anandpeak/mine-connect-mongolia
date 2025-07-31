import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Building2, Banknote, Bookmark } from "lucide-react";
import JobDetailsDialog from "./JobDetailsDialog";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    workType: string;
    roster: string;
    experience: string;
    profession: string;
    workCondition: string;
    responsibilities: string;
    requirements: string;
    additionalInfo: string;
    phone: string;
    salary?: string;
    supply?: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow p-4">
        <CardContent className="p-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
              {job.salary && (
                <div className="text-primary font-bold text-lg mb-2">
                  {job.salary}
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {job.roster}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm">
              <Building2 className="w-6 h-6 mr-2 text-primary" />
              <div>
                <div className="font-medium">{job.company}</div>
                <div className="text-muted-foreground text-xs">
                  Нийтлэгдсэн: 01 сарын 01
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => setShowDetails(true)}
              className="flex-1" 
              size="sm"
            >
              Дэлгэрэнгүй
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              size="sm"
              onClick={() => window.open('https://your-ai-interview-link.com', '_blank')}
            >
              AI ярилцлага хийх
            </Button>
          </div>
        </CardContent>
      </Card>

      <JobDetailsDialog 
        job={job} 
        open={showDetails} 
        onOpenChange={setShowDetails}
      />
    </>
  );
};

export default JobCard;