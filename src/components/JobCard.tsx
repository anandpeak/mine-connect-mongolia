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
    cphotoUrl?: string; // Company logo URL
    photoUrl?: string; // Alternative logo field
    createdDate?: string; // Real creation date
    [key: string]: any;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Format the published date properly
  const formatPublishedDate = (dateString?: string) => {
    if (!dateString) return 'Саяхан нийтлэгдсэн';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Өнөөдөр нийтлэгдсэн';
      if (diffInDays === 1) return '1 өдрийн өмнө';
      if (diffInDays < 7) return `${diffInDays} өдрийн өмнө`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} долоо хоногийн өмнө`;
      
      // Format as "MM сарын dd"
      const mongolianMonths = [
        '01 сарын', '02 сарын', '03 сарын', '04 сарын', '05 сарын', '06 сарын',
        '07 сарын', '08 сарын', '09 сарын', '10 сарын', '11 сарын', '12 сарын'
      ];
      
      return `${mongolianMonths[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`;
    } catch (error) {
      return 'Саяхан нийтлэгдсэн';
    }
  };

  // Clean up roster format - remove explanation text
  const formatRoster = (roster: string) => {
    if (!roster) return 'Стандарт';
    
    // If it contains "/" just return the ratio part
    if (roster.includes('/')) {
      const match = roster.match(/(\d+\/\d+)/);
      return match ? match[1] : roster;
    }
    
    return roster;
  };

  // Get company logo URL with fallbacks
  const getCompanyLogoUrl = () => {
    // Try multiple possible logo fields
    const possibleUrls = [
      job.cphotoUrl,
      job.photoUrl,
      job._raw?.cphotoUrl,
      job._raw?.photoUrl
    ].filter(Boolean);

    return possibleUrls.length > 0 ? possibleUrls[0] : null;
  };

  const logoUrl = getCompanyLogoUrl();

  // Debug logging (remove in production)
  console.log('Job data for logo:', {
    company: job.company,
    cphotoUrl: job.cphotoUrl,
    photoUrl: job.photoUrl,
    logoUrl,
    rawData: job._raw
  });

  const handleLogoError = () => {
    console.log('Logo failed to load for:', job.company, logoUrl);
    setLogoError(true);
  };

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
              {formatRoster(job.roster)}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm">
              {/* Company Logo with better fallback logic */}
              <div className="w-6 h-6 mr-2 flex items-center justify-center">
                {logoUrl && !logoError ? (
                  <img 
                    src={logoUrl} 
                    alt={`${job.company} logo`}
                    className="w-6 h-6 rounded object-contain bg-white border border-gray-200"
                    onError={handleLogoError}
                    onLoad={() => console.log('Logo loaded successfully for:', job.company)}
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-primary" />
                )}
              </div>
              <div>
                <div className="font-medium">{job.company}</div>
                <div className="text-muted-foreground text-xs">
                  Нийтлэгдсэн: {formatPublishedDate(job.createdDate)}
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