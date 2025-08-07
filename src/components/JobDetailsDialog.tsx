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

  // Get aimag map image based on location
  const getAimagMap = (location: string): string => {
    if (!location) return '/map-mongolia.html';
    
    // Mapping from aimag names to map file names (using .html extension as per your files)
    const aimagMappings: { [key: string]: string } = {
      // Main aimags
      'Архангай': '/map-arkhangai.html',
      'Баян-Өлгий': '/map-bayn-ulgii.html', 
      'Баянхонгор': '/map-baynkhongor.html',
      'Булган': '/map-bulgan.html',
      'Говь-Алтай': '/map-govi-altai.html',
      'Говьсүмбэр': '/map-govisumber-altai.html',
      'Дархан-Уул': '/map-darkhan-uul.html',
      'Дорноговь': '/map-dornogovi.html',
      'Дорнод': '/map-dornod.html',
      'Дундговь': '/map-dundgovi.html',
      'Завхан': '/map-zavkhan.html',
      'Орхон': '/map-orkhon.html',
      'Өвөрхангай': '/map-uvurkhangai.html',
      'Өмнөговь': '/map-umnugovi.html',
      'Сүхбаатар': '/map-sukhbaatar.html',
      'Сэлэнгэ': '/map-selenge.html',
      'Төв': '/map-tuv.html',
      'Увс': '/map-uvs.html',
      'Ховд': '/map-khovd.html',
      'Хөвсгөл': '/map-khuvsgul.html',
      'Хэнтий': '/map-khentii.html',
      'Улаанбаатар': '/map-ulaanbaatar.html',
      
      // Alternative spellings that might come from API
      'Ulaanbaatar': '/map-ulaanbaatar.html',
      'Darkhan-Uul': '/map-darkhan-uul.html',
      'Govi-Altai': '/map-govi-altai.html',
      'Govisumber': '/map-govisumber-altai.html',
      'Khentii': '/map-khentii.html',
      'Khovd': '/map-khovd.html',
      'Khuvsgul': '/map-khuvsgul.html',
      'Orkhon': '/map-orkhon.html',
      'Selenge': '/map-selenge.html',
      'Sukhbaatar': '/map-sukhbaatar.html',
      'Tuv': '/map-tuv.html',
      'Uvurkhangai': '/map-uvurkhangai.html',
      'Uvs': '/map-uvs.html',
      'Zavkhan': '/map-zavkhan.html'
    };

    // Try exact match first
    if (aimagMappings[location]) {
      return aimagMappings[location];
    }

    // Try partial match (case insensitive)
    const locationLower = location.toLowerCase();
    for (const [key, value] of Object.entries(aimagMappings)) {
      if (key.toLowerCase().includes(locationLower) || locationLower.includes(key.toLowerCase())) {
        return value;
      }
    }

    // Default to general Mongolia map
    return '/map-mongolia.html';
  };

  // Get location image (fallback for general mining images)
  const getLocationImage = (location: string) => {
    // Default mining landscape image as fallback
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

  // Debug logging to identify object rendering issues
  console.log('JobData for rendering:', {
    responsibilities: typeof jobData.responsibilities,
    requirements: typeof jobData.requirements,
    additionalInfo: typeof jobData.additionalInfo,
    supplies: jobData.supplies,
    suppliesType: typeof jobData.supplies,
    location: jobData.location
  });

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
          <DialogTitle className="text-lg sm:text-xl md:text-2xl line-clamp-2">{String(jobData.title || 'Тодорхойгүй ажил')}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Дэлгэрэнгүй мэдээлэл ачааллаж байна...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Хаах
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Company and Basic Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                {/* Company Logo */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-200 rounded">
                  {jobData.cphotoUrl || jobData._raw?.cphotoUrl ? (
                    <img 
                      src={jobData.cphotoUrl || jobData._raw?.cphotoUrl}
                      alt={`${jobData.company} logo`}
                      className="w-full h-full object-contain rounded"
                      onError={(e) => {
                        console.error('Company logo failed to load');
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                      onLoad={() => console.log('Company logo loaded for:', jobData.company)}
                    />
                  ) : null}
                  <Building2 className={`w-6 h-6 sm:w-8 sm:h-8 text-primary ${(jobData.cphotoUrl || jobData._raw?.cphotoUrl) ? 'hidden' : ''}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{String(jobData.company || 'Тодорхойгүй компани')}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{String(jobData.location || 'Тодорхойгүй')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{String(jobData.workType || 'Бүтэн цаг')}</span>
                    </div>
                    {jobData.salary && (
                      <div className="flex items-center gap-1">
                        <Banknote className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{String(jobData.salary)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {jobData.phone && (
                <div className="flex items-center gap-2 bg-secondary p-2 sm:p-3 rounded-lg">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-sm sm:text-base font-medium">{String(jobData.phone)}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              <Badge variant="secondary" className="text-xs sm:text-sm">
                {String(jobData.profession || 'Ерөнхий ажилтан')}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                {String(jobData.experience || 'Туршлага шаардахгүй')}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                {String(jobData.roster || 'Стандарт цагийн хуваарь')}
              </Badge>
              {jobData.hasCamp && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <Home className="w-3 h-3 mr-1" />
                  Кемптэй
                </Badge>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger value="details" className="text-xs sm:text-sm">Дэлгэрэнгүй мэдээлэл</TabsTrigger>
                <TabsTrigger value="camp" className="text-xs sm:text-sm">Кемп & Хангамж</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-3 sm:space-y-4 mt-3">
                <div>
                  <h3 className="font-medium mb-2 text-sm sm:text-base">Ажлын байршил - {String(jobData.location || 'Тодорхойгүй')}</h3>
                  
                  {/* Display the aimag map as image instead of iframe */}
                  <div className="w-full h-48 sm:h-64 md:h-80 border rounded-lg overflow-hidden bg-gray-50">
                    <img 
                      src={getAimagMap(jobData.location)}
                      alt={`${String(jobData.location || 'Тодорхойгүй')} аймгийн газрын зураг`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Map failed to load, falling back to default image');
                        (e.target as HTMLImageElement).src = getLocationImage(jobData.location);
                      }}
                      onLoad={() => console.log('Map loaded successfully for:', jobData.location)}
                    />
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-3">
                    {String(jobData.location || 'Тодорхойгүй')} аймгийн уурхайн бүс
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 text-sm sm:text-base">Гүйцэтгэх үндсэн үүрэг</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {typeof jobData.responsibilities === 'string' 
                        ? jobData.responsibilities 
                        : 'Дэлгэрэнгүй үүрэг тодорхойлогдоогүй'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-sm sm:text-base">Ажлын байранд тавигдах шаардлага</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {typeof jobData.requirements === 'string' 
                        ? jobData.requirements 
                        : 'Шаардлага тодорхойлогдоогүй'}
                    </p>
                  </div>
                  {jobData.additionalInfo && (
                    <div>
                      <h3 className="font-medium mb-2 text-sm sm:text-base">Нэмэлт мэдээлэл</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {typeof jobData.additionalInfo === 'string' 
                          ? jobData.additionalInfo 
                          : String(jobData.additionalInfo || '')}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="camp" className="space-y-3 sm:space-y-4 mt-3">
                <div>
                  {jobData.hasCamp ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          Кемп байршилтай
                        </h4>
                        <p className="text-green-700 text-xs sm:text-sm">
                          Энэ ажлын байр кемп байршилтай тул хоол хүнс, байр орон хангагдана.
                        </p>
                      </div>
                      
                      {jobData.supplies && jobData.supplies.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                            <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                            Хангамж
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {jobData.supplies.map((supply: any, index: number) => {
                              // Safely extract text from supply object
                              const supplyText = typeof supply === 'string' 
                                ? supply 
                                : supply?.name || supply?.text || supply?.title || 'Хангамж';
                              
                              return (
                                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>{supplyText}</span>
                                </div>
                              );
                            })}
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