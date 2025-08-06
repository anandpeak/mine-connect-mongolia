// src/components/JobDetailsDialog.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Phone, Banknote, HardHat, Home, Utensils, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobDetailsDialogProps {
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
    hasCamp?: boolean;
    createdDate?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailsDialog = ({ job, open, onOpenChange }: JobDetailsDialogProps) => {
  const [hasProfile] = useState(Math.random() > 0.5);
  const [detailedJob, setDetailedJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Helper function to clean HTML tags
  const cleanHtmlTags = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // Get location image
  const getLocationImage = (location: string) => {
    // Default mining landscape image
    return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center";
  };

  // Fetch detailed job information when dialog opens
  useEffect(() => {
    if (open && job.id) {
      setIsLoading(true);
      setError(null);
      
      fetch(`https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/vacancy/get-detail?id=${job.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Detail API Response:', data);
          
          const transformedData = {
            ...job,
            id: data.id?.toString() || job.id,
            title: data.title || job.title,
            company: data.cname || data.companyName || job.company,
            location: data.aimagName || data.location || job.location,
            phone: data.phoneNumber || data.phone || job.phone || '',
            responsibilities: cleanHtmlTags(data.responsibility) || 'Дэлгэрэнгүй үүрэг тодорхойлогдоогүй',
            requirements: cleanHtmlTags(data.requirement) || 'Шаардлага тодорхойлогдоогүй',
            additionalInfo: data.campInfo || data.additionalInfo || job.additionalInfo || '',
            workCondition: data.workRange === 'onsite' ? 'Уурхай' : (data.workRange || job.workCondition),
            hasCamp: !!data.campInfo || !!data.hasCamp,
            supplies: data.supplies || [],
            _raw: data
          };
          
          setDetailedJob(transformedData);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching job details:', error);
          setError('Дэлгэрэнгүй мэдээллийг ачаалахад алдаа гарлаа');
          setIsLoading(false);
        });
    }
  }, [open, job.id]);

  const jobData = detailedJob || job;

  const handleApply = () => {
    if (hasProfile) {
      toast({
        title: "Өргөдөл амжилттай илгээгдлээ",
        description: "Таны өргөдлийг хянаж байна. Удахгүй холбогдох болно.",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Бүртгүүлэх шаардлагатай",
        description: "Өргөдөл гаргахын тулд эхлээд бүртгүүлнэ үү.",
      });
    }
  };

  const handleAIInterview = () => {
    window.open('https://your-ai-interview-link.com', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl line-clamp-2">{jobData.title}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Дэлгэрэнгүй мэдээлэл ачааллаж байна...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
            {/* Job Header Info - Compact on Mobile */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="font-medium text-sm sm:text-base">{jobData.company}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">{jobData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{jobData.roster}</span>
                  </div>
                  {jobData.salary && (
                    <div className="flex items-center gap-1">
                      <Banknote className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium text-primary text-xs sm:text-sm">{jobData.salary}</span>
                    </div>
                  )}
                </div>
                <Badge variant="secondary" className="text-xs w-fit">{jobData.profession}</Badge>
              </div>
              {jobData.phone && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{jobData.phone}</span>
                </div>
              )}
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-8 sm:h-10">
                <TabsTrigger value="details" className="text-xs sm:text-sm">Дэлгэрэнгүй</TabsTrigger>
                <TabsTrigger value="camp" className="text-xs sm:text-sm">Кемп & Хангамж</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-3 sm:space-y-4 mt-3">
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Ажлын байршил - {jobData.location}</h3>
                  <img 
                    src={getLocationImage(jobData.location)} 
                    alt={`${jobData.location} байршил`}
                    className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-lg"
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-3">
                    {jobData.location} аймгийн уурхайн бүс
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 text-sm sm:text-base">Гүйцэтгэх үндсэн үүрэг</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {jobData.responsibilities}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-sm sm:text-base">Ажлын байранд тавигдах шаардлага</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {jobData.requirements}
                    </p>
                  </div>
                  {jobData.additionalInfo && (
                    <div>
                      <h3 className="font-medium mb-2 text-sm sm:text-base">Нэмэлт мэдээлэл</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">{jobData.additionalInfo}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-medium">Туршлага:</span>
                      <p className="text-muted-foreground">{jobData.experience}</p>
                    </div>
                    <div>
                      <span className="font-medium">Ажлын нөхцөл:</span>
                      <p className="text-muted-foreground">{jobData.workCondition}</p>
                    </div>
                    <div>
                      <span className="font-medium">Ажлын цаг:</span>
                      <p className="text-muted-foreground">{jobData.workType}</p>
                    </div>
                    <div>
                      <span className="font-medium">Утас:</span>
                      <p className="text-muted-foreground">{jobData.phone || 'Тодорхойгүй'}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="camp" className="space-y-3 sm:space-y-4 mt-3">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    Кемп мэдээлэл
                  </h3>
                  
                  {jobData.hasCamp ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <HardHat className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          <span className="font-medium text-green-800 text-sm sm:text-base">Кемптэй ажлын байр</span>
                        </div>
                        <p className="text-green-700 text-xs sm:text-sm">
                          Энэ ажлын байр кемп байршилтай тул хоол, унтлагын газар хангагдана.
                        </p>
                      </div>
                      
                      {jobData.supplies && jobData.supplies.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                            <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                            Хангамж
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {jobData.supplies.map((supply: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span>{supply.name || supply}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Энэ ажлын байрын хувьд кемпын мэдээлэл байхгүй байна.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons - Better Mobile Layout */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t">
              <Button 
                onClick={handleApply}
                className="flex-1 h-10 sm:h-11 text-sm"
                variant={hasProfile ? "default" : "outline"}
              >
                {hasProfile ? "Өргөдөл гаргах" : "Бүртгүүлж өргөдөл гаргах"}
              </Button>
              <Button 
                onClick={handleAIInterview}
                variant="outline" 
                className="flex-1 h-10 sm:h-11 text-sm"
              >
                AI ярилцлага хийх
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;