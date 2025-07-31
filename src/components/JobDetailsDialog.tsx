// src/components/JobDetailsDialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Phone, Banknote, HardHat, Home, Utensils, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVacancyDetail } from "@/hooks/useVacancies";

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
  const [hasProfile] = useState(Math.random() > 0.5); // Mock profile check
  const { toast } = useToast();
  
  // Fetch detailed vacancy information
  const { 
    data: detailedJob, 
    isLoading, 
    error 
  } = useVacancyDetail(job.id);

  // Use detailed data if available, fallback to basic job data
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

  // Mock location image based on job.location
  const getLocationImage = (location: string) => {
    const locationImages = {
      'Өвөрхангай': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      'Улаанбаатар': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      'Дорноговь': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop',
      'Өмнөговь': 'https://images.unsplash.com/photo-1447958272669-9c562446304f?w=400&h=200&fit=crop',
    };
    return locationImages[location as keyof typeof locationImages] || 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop';
  };

  const getCampImages = () => {
    return [
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop"
    ];
  };

  const getPPEItems = () => [
    { name: "Каск", icon: "👷" },
    { name: "Куртик", icon: "🧥" },
    { name: "Хамгаалалтын хантааз", icon: "🥾" },
    { name: "Бээлий", icon: "🧤" },
    { name: "Ажлын гутал", icon: "👞" }
  ];

  const formatCreatedDate = (dateString?: string) => {
    if (!dateString) return 'Тодорхойгүй';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Тодорхойгүй';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{jobData.title}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Дэлгэрэнгүй мэдээлэл ачааллаж байна...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Дэлгэрэнгүй мэдээллийг ачаалахад алдаа гарлаа</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Job Header Info */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{jobData.company}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {jobData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {jobData.roster}
                  </div>
                  {jobData.salary && (
                    <div className="flex items-center gap-1">
                      <Banknote className="w-4 h-4" />
                      {jobData.salary}
                    </div>
                  )}
                </div>
                <Badge variant="secondary">{jobData.profession}</Badge>
              </div>
              {jobData.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{jobData.phone}</span>
                </div>
              )}
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Дэлгэрэнгүй</TabsTrigger>
                <TabsTrigger value="camp">Кемп & Хангамж</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                {/* Location section at the top */}
                <div>
                  <h3 className="font-medium mb-3">Ажлын байршил - {jobData.location}</h3>
                  <img 
                    src={getLocationImage(jobData.location)} 
                    alt={`${jobData.location} байршил`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-2 mb-6">
                    {jobData.location} аймгийн уурхайн бүс
                  </p>
                </div>

                {/* Job details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Гүйцэтгэх үндсэн үүрэг</h3>
                    <p className="text-muted-foreground">
                      {jobData.responsibilities && jobData.responsibilities !== 'Дэлгэрэнгүй мэдээллийг харах товчийг дарна уу' 
                        ? jobData.responsibilities 
                        : `${jobData.title} байрны үндсэн үүрэг болох тоног төхөөрөмжийн ашиглалт, аюулгүй байдлын дүрмийг дагаж мөрдөх, өдөр тутмын тайланг бэлтгэх зэрэг үүрэг гүйцэтгэнэ.`}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Ажлын байранд тавигдах шаардлага</h3>
                    <p className="text-muted-foreground">
                      {jobData.requirements && jobData.requirements !== 'Дэлгэрэнгүй мэдээллийг харах товчийг дарна уу'
                        ? jobData.requirements
                        : `Техникийн дээд боловсрол эсвэл ижил төстэй туршлага, багаар ажиллах чадвар, аюулгүй байдлын дүрмийг мөрдөх хариуцлагатай хандлага шаардлагатай.`}
                    </p>
                  </div>
                  {jobData.additionalInfo && (
                    <div>
                      <h3 className="font-medium mb-2">Нэмэлт мэдээлэл</h3>
                      <p className="text-muted-foreground">{jobData.additionalInfo}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
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
                      <span className="font-medium">Нийтлэгдсэн:</span>
                      <p className="text-muted-foreground">{formatCreatedDate(jobData.createdDate)}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="camp" className="space-y-4">
                {/* Camp information */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Кемп мэдээлэл
                  </h3>
                  
                  {jobData.hasCamp ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        {getCampImages().map((image, index) => (
                          <div key={index}>
                            <img 
                              src={image} 
                              alt={`Кемп ${index + 1}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          Кемпийн хангамж
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Фитнес заалтай</li>
                          <li>• 3 цагийн хооллолт</li>
                          <li>• Wi-Fi интернет</li>
                          <li>• Цэвэрлэгээний үйлчилгээ</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Энэ ажлын байрт кемп байршил байхгүй</p>
                      <p className="text-sm text-muted-foreground mt-2">Ажилчид өөрсдийн байранд амьдрах эсвэл тээврээр ажилдаа явах</p>
                    </div>
                  )}
                </div>

                {/* PPE section */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <HardHat className="w-5 h-5" />
                    Хамгаалалтын хэрэгсэл
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {getPPEItems().map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Бүх хамгаалалтын хэрэгслийг компани хангана
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={handleApply}
                className="flex-1"
                variant={hasProfile ? "default" : "outline"}
              >
                {hasProfile ? "Өргөдөл гаргах" : "Бүртгүүлж өргөдөл гаргах"}
              </Button>
              <Button 
                onClick={handleAIInterview}
                variant="outline" 
                className="flex-1"
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