import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar,
  Download,
  Edit,
  Globe,
  CheckCircle
} from "lucide-react";

interface CVData {
  // Personal Info
  name: string;
  age: string;
  phone: string;
  email: string;
  location: string;
  
  // Professional Info
  profession: string;
  experience: string;
  currentlyEmployed: string;
  availability: string;
  willingToRelocate: string;
  preferredLocation: string;
  
  // Skills & Education
  education: string;
  certifications: string;
  skills: string;
  languages: string;
  
  // Work Preferences
  preferredWorkType: string;
  expectedSalary: string;
  workConditions: string[];
  additionalInfo: string;
}

interface CVDisplayProps {
  data: CVData;
  onEdit?: () => void;
  onDownloadPDF?: () => void;
}

const CVDisplay = ({ data, onEdit, onDownloadPDF }: CVDisplayProps) => {
  // Helper functions to format display values
  const formatProfession = (profession: string) => {
    const professionMap: { [key: string]: string } = {
      "operator": "Машин механизмын оператор",
      "engineer": "Инженер",
      "welder": "Ган гагнуурчин",
      "miner": "Уурхайчин",
      "mechanical": "Механикч",
      "safety": "Аюулгүй ажиллагааны мэргэжилтэн",
      "electrician": "Цахилгаанчин",
      "driver": "Жолооч",
      "technician": "Техникч",
      "supervisor": "Ахлагч",
      "other": "Бусад"
    };
    return professionMap[profession] || profession;
  };

  const formatExperience = (experience: string) => {
    const experienceMap: { [key: string]: string } = {
      "none": "Туршлагагүй",
      "1-2": "1-2 жил",
      "3-5": "3-5 жил",
      "6-10": "6-10 жил",
      "10+": "10+ жил"
    };
    return experienceMap[experience] || experience;
  };

  const formatEducation = (education: string) => {
    const educationMap: { [key: string]: string } = {
      "primary": "Бага боловсрол",
      "secondary": "Дунд боловсрол",
      "vocational": "Мэргэжлийн сургууль",
      "college": "Коллеж",
      "bachelor": "Бакалавр",
      "master": "Магистр",
      "other": "Бусад"
    };
    return educationMap[education] || education;
  };

  const formatWorkType = (workType: string) => {
    const workTypeMap: { [key: string]: string } = {
      "full-time": "Бүтэн цагийн",
      "shift-work": "Ээлжийн ажил",
      "rotation": "Ротаци",
      "contract": "Гэрээт ажил",
      "seasonal": "Улирлын ажил",
      "flexible": "Уян хатан"
    };
    return workTypeMap[workType] || workType;
  };

  const formatWorkConditions = (conditions: string[]) => {
    const conditionMap: { [key: string]: string } = {
      "camp": "Кемпт байрших",
      "transport": "Тээврийн хэрэгсэл",
      "meals": "Хоол хүнс",
      "insurance": "Даатгал",
      "overtime": "Цагийн илүү цалин",
      "training": "Сургалт авах боломж"
    };
    return conditions.map(condition => conditionMap[condition] || condition);
  };

  const formatLocation = (location: string) => {
    const locationMap: { [key: string]: string } = {
      "ulaanbaatar": "Улаанбаатар",
      "dornogovi": "Дорноговь",
      "omnogovi": "Өмнөговь",
      "bayanhongor": "Баянхонгор",
      "huvsgul": "Хөвсгөл",
      "selenge": "Сэлэнгэ",
      "darkhan-uul": "Дархан-Уул",
      "orkhon": "Орхон",
      "other": "Бусад"
    };
    return locationMap[location] || location;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Миний CV</h1>
          <p className="text-muted-foreground">Мэргэжлийн анкет</p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Засах
            </Button>
          )}
          {onDownloadPDF && (
            <Button onClick={onDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF татах
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="w-5 h-5 mr-2" />
                Хувийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{data.name}</h3>
                <p className="text-muted-foreground">{formatProfession(data.profession)}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                {data.age && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{data.age} нас</span>
                  </div>
                )}
                
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{data.phone}</span>
                </div>
                
                {data.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="break-all">{data.email}</span>
                  </div>
                )}
                
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{formatLocation(data.location)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          {data.skills && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2" />
                  Ур чадвар
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{data.skills}</p>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          {data.languages && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Хэл мэдлэг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{data.languages}</Badge>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Professional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Briefcase className="w-5 h-5 mr-2" />
                Мэргэжлийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Мэргэжил</h4>
                  <p className="text-sm text-muted-foreground">{formatProfession(data.profession)}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Туршлага</h4>
                  <p className="text-sm text-muted-foreground">{formatExperience(data.experience)}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Ажиллах бэлэн байдал</h4>
                  <p className="text-sm text-muted-foreground">{data.availability}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Нүүх бэлэн байдал</h4>
                  <p className="text-sm text-muted-foreground">
                    {data.willingToRelocate === "yes" ? "Тийм" : 
                     data.willingToRelocate === "no" ? "Үгүй" : "Нөхцөлөөс хамаарч"}
                  </p>
                </div>
              </div>
              
              {data.preferredLocation && data.willingToRelocate === "yes" && (
                <div>
                  <h4 className="font-medium mb-1">Хүссэн ажиллах байршил</h4>
                  <p className="text-sm text-muted-foreground">{data.preferredLocation}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education & Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <GraduationCap className="w-5 h-5 mr-2" />
                Боловсрол ба гэрчилгээ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Боловсролын түвшин</h4>
                <p className="text-sm text-muted-foreground">{formatEducation(data.education)}</p>
              </div>
              
              {data.certifications && (
                <div>
                  <h4 className="font-medium mb-1">Гэрчилгээ ба удирдамж</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{data.certifications}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Work Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Ажлын нөхцөлийн хүсэлт
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Хүссэн ажлын хуваарь</h4>
                  <p className="text-sm text-muted-foreground">{formatWorkType(data.preferredWorkType)}</p>
                </div>
                
                {data.expectedSalary && (
                  <div>
                    <h4 className="font-medium mb-1">Хүссэн цалин</h4>
                    <p className="text-sm text-muted-foreground">{data.expectedSalary}</p>
                  </div>
                )}
              </div>
              
              {data.workConditions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Шаардлагатай нөхцөл</h4>
                  <div className="flex flex-wrap gap-2">
                    {formatWorkConditions(data.workConditions).map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          {data.additionalInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Нэмэлт мэдээлэл</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{data.additionalInfo}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDisplay;