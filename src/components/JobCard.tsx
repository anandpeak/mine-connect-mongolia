import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Phone, Banknote } from "lucide-react";

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
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Building2 className="w-4 h-4 mr-1" />
              {job.company}
            </div>
          </div>
          <Badge variant="secondary">{job.profession}</Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.workType}
          </div>
          {job.salary && (
            <div className="flex items-center">
              <Banknote className="w-4 h-4 mr-1" />
              {job.salary}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium">Ажиллах нөхцөл:</span>
            <p className="text-muted-foreground">{job.workCondition}</p>
          </div>
          <div>
            <span className="font-medium">Ростер:</span>
            <p className="text-muted-foreground">{job.roster}</p>
          </div>
          <div>
            <span className="font-medium">Туршлага:</span>
            <p className="text-muted-foreground">{job.experience}</p>
          </div>
          <div>
            <span className="font-medium">Утас:</span>
            <div className="flex items-center text-muted-foreground">
              <Phone className="w-4 h-4 mr-1" />
              {job.phone}
            </div>
          </div>
        </div>

        <div className="text-sm">
          <span className="font-medium">Үндсэн үүрэг:</span>
          <p className="text-muted-foreground mt-1 line-clamp-2">{job.responsibilities}</p>
        </div>

        <div className="text-sm">
          <span className="font-medium">Шаардлага:</span>
          <p className="text-muted-foreground mt-1 line-clamp-2">{job.requirements}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">
            Өргөдөл гаргах
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            AI ярилцлага хийх
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;