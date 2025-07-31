import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Phone, Banknote, HardHat, Home, Utensils } from "lucide-react";
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
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailsDialog = ({ job, open, onOpenChange }: JobDetailsDialogProps) => {
  const [hasProfile] = useState(Math.random() > 0.5); // Mock profile check
  const { toast } = useToast();

  const handleApply = () => {
    if (hasProfile) {
      toast({
        title: "Өргөдөл амжилттай илгээгдлээ",
        description: "Таны өргөдлийг хянаж байна. Удахгүй холбогдох болно.",
      });
      onOpenChange(false);
    } else {
      // Redirect to registration
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
    // This would normally map to actual images of the 21 aimags
    return `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop`;
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Header Info */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.roster}
                </div>
                {job.salary && (
                  <div className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    {job.salary}
                  </div>
                )}
              </div>
              <Badge variant="secondary">{job.profession}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{job.phone}</span>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Дэлгэрэнгүй</TabsTrigger>
              <TabsTrigger value="location">Байршил</TabsTrigger>
              <TabsTrigger value="camp">Кемп</TabsTrigger>
              <TabsTrigger value="ppe">Хангамж</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Гүйцэтгэх үндсэн үүрэг</h3>
                <p className="text-muted-foreground">{job.responsibilities}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Ажлын байранд тавигдах шаардлага</h3>
                <p className="text-muted-foreground">{job.requirements}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Нэмэлт мэдээлэл</h3>
                <p className="text-muted-foreground">{job.additionalInfo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Туршлага:</span>
                  <p className="text-muted-foreground">{job.experience}</p>
                </div>
                <div>
                  <span className="font-medium">Ажлын нөхцөл:</span>
                  <p className="text-muted-foreground">{job.workCondition}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Ажлын байршил - {job.location}</h3>
                <img 
                  src={getLocationImage(job.location)} 
                  alt={`${job.location} байршил`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {job.location} аймгийн уурхайн бүс
                </p>
              </div>
            </TabsContent>

            <TabsContent value="camp" className="space-y-4">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Кемп мэдээлэл
                </h3>
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
                    Хангамж
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Фитнес заалтай</li>
                    <li>• 3 цагийн хооллолт</li>
                    <li>• Wi-Fi интернет</li>
                    <li>• Цэвэрлэгээний үйлчилгээ</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ppe" className="space-y-4">
              <div>
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
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;