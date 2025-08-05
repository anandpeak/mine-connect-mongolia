import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Personal Info (Step 1)
  name: string;
  age: string;
  phone: string;
  email: string;
  location: string;
  
  // Professional Info (Step 2)
  profession: string;
  experience: string;
  currentlyEmployed: string;
  availability: string;
  willingToRelocate: string;
  preferredLocation: string;
  
  // Skills & Education (Step 3)
  education: string;
  certifications: string;
  skills: string;
  languages: string;
  
  // Work Preferences (Step 4)
  preferredWorkType: string;
  expectedSalary: string;
  workConditions: string[];
  additionalInfo: string;
}

const CandidateRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    name: "",
    age: "",
    phone: "",
    email: "",
    location: "",
    
    // Professional Info
    profession: "",
    experience: "",
    currentlyEmployed: "",
    availability: "",
    willingToRelocate: "",
    preferredLocation: "",
    
    // Skills & Education
    education: "",
    certifications: "",
    skills: "",
    languages: "",
    
    // Work Preferences
    preferredWorkType: "",
    expectedSalary: "",
    workConditions: [],
    additionalInfo: ""
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkConditionChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      workConditions: checked 
        ? [...prev.workConditions, condition]
        : prev.workConditions.filter(c => c !== condition)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.phone && formData.location);
      case 2:
        return !!(formData.profession && formData.experience && formData.availability);
      case 3:
        return !!(formData.education);
      case 4:
        return !!(formData.preferredWorkType);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      toast({
        title: "Мэдээлэл дутуу байна",
        description: "Шаардлагатай талбаруудыг бөглөнө үү",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Мэдээлэл дутуу байна",
        description: "Шаардлагатай талбаруудыг бөглөнө үү",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsCompleted(true);
      toast({
        title: "Амжилттай бүртгэгдлээ!",
        description: "Таны CV бэлэн боллоо"
      });
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Дахин оролдоно уу",
        variant: "destructive"
      });
    }
  };

  const professionOptions = [
    { value: "operator", label: "Машин механизмын оператор" },
    { value: "engineer", label: "Инженер" },
    { value: "welder", label: "Ган гагнуурчин" },
    { value: "miner", label: "Уурхайчин" },
    { value: "mechanical", label: "Механикч" },
    { value: "safety", label: "Аюулгүй ажиллагааны мэргэжилтэн" },
    { value: "electrician", label: "Цахилгаанчин" },
    { value: "driver", label: "Жолооч" },
    { value: "technician", label: "Техникч" },
    { value: "supervisor", label: "Ахлагч" },
    { value: "other", label: "Бусад" }
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-4">Амжилттай бүртгэгдлээ!</h2>
              <p className="text-muted-foreground mb-6">
                Таны мэдээлэл амжилттай хадгалагдлаа. 
                Одоо та өөрийн мэргэжлийн CV-г харж болно.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/profile")} 
                  className="w-full"
                >
                  Миний CV харах
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/">Ажлын байр хайх</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Хувийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Овог нэр *</Label>
                <Input 
                  id="name"
                  placeholder="Овог нэрээ бичнэ үү"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="age">Нас</Label>
                <Input 
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Утасны дугаар *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone"
                    placeholder="+976-XXXX-XXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">И-мэйл хаяг</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Одоогийн байршил *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={formData.location}
                    onValueChange={(value) => handleInputChange("location", value)}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Аймаг сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                      <SelectItem value="dornogovi">Дорноговь</SelectItem>
                      <SelectItem value="omnogovi">Өмнөговь</SelectItem>
                      <SelectItem value="bayanhongor">Баянхонгор</SelectItem>
                      <SelectItem value="huvsgul">Хөвсгөл</SelectItem>
                      <SelectItem value="selenge">Сэлэнгэ</SelectItem>
                      <SelectItem value="darkhan-uul">Дархан-Уул</SelectItem>
                      <SelectItem value="orkhon">Орхон</SelectItem>
                      <SelectItem value="other">Бусад</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Мэргэжлийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profession">Мэргэжил *</Label>
                <Select 
                  value={formData.profession}
                  onValueChange={(value) => handleInputChange("profession", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Мэргэжил сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience">Ажлын туршлага *</Label>
                <Select 
                  value={formData.experience}
                  onValueChange={(value) => handleInputChange("experience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Туршлага сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Туршлагагүй</SelectItem>
                    <SelectItem value="1-2">1-2 жил</SelectItem>
                    <SelectItem value="3-5">3-5 жил</SelectItem>
                    <SelectItem value="6-10">6-10 жил</SelectItem>
                    <SelectItem value="10+">10+ жил</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentlyEmployed">Одоо ажиллаж байна уу?</Label>
                <Select 
                  value={formData.currentlyEmployed}
                  onValueChange={(value) => handleInputChange("currentlyEmployed", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Тийм</SelectItem>
                    <SelectItem value="no">Үгүй</SelectItem>
                    <SelectItem value="looking">Ажил хайж байна</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Ажиллахад бэлэн байдал *</Label>
                <Select 
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Тэр даруй</SelectItem>
                    <SelectItem value="1-week">1 долоо хоногийн дотор</SelectItem>
                    <SelectItem value="1-month">1 сарын дотор</SelectItem>
                    <SelectItem value="negotiable">Ярилцах боломжтой</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="willingToRelocate">Нүүж ажиллах бэлэн байдал</Label>
                <Select 
                  value={formData.willingToRelocate}
                  onValueChange={(value) => handleInputChange("willingToRelocate", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Тийм</SelectItem>
                    <SelectItem value="no">Үгүй</SelectItem>
                    <SelectItem value="depends">Нөхцөлөөс хамаарч</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.willingToRelocate === "yes" && (
                <div>
                  <Label htmlFor="preferredLocation">Хаана ажиллахыг хүсэж байна?</Label>
                  <Select 
                    value={formData.preferredLocation}
                    onValueChange={(value) => handleInputChange("preferredLocation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Байршил сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anywhere">Хаана ч болно</SelectItem>
                      <SelectItem value="ulaanbaatar">Улаанбаатар ойролцоо</SelectItem>
                      <SelectItem value="gobi">Говийн бүс</SelectItem>
                      <SelectItem value="north">Хойд бүс</SelectItem>
                      <SelectItem value="west">Баруун бүс</SelectItem>
                      <SelectItem value="east">Зүүн бүс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Боловсрол ба ур чадвар
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="education">Боловсролын түвшин *</Label>
                <Select 
                  value={formData.education}
                  onValueChange={(value) => handleInputChange("education", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Боловсрол сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Бага боловсрол</SelectItem>
                    <SelectItem value="secondary">Дунд боловсрол</SelectItem>
                    <SelectItem value="vocational">Мэргэжлийн сургууль</SelectItem>
                    <SelectItem value="college">Коллеж</SelectItem>
                    <SelectItem value="bachelor">Бакалавр</SelectItem>
                    <SelectItem value="master">Магистр</SelectItem>
                    <SelectItem value="other">Бусад</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="certifications">Гэрчилгээ, удирдамж</Label>
                <Textarea 
                  id="certifications"
                  placeholder="Жишээ: Аюулгүй ажиллагааны гэрчилгээ, Машин механизмын жолооны эрх, гэх мэт..."
                  rows={3}
                  value={formData.certifications}
                  onChange={(e) => handleInputChange("certifications", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="skills">Ур чадвар ба мэдлэг</Label>
                <Textarea 
                  id="skills"
                  placeholder="Жишээ: Экскаватор ажиллуулах, ган гагнах, цахилгааны засвар хийх, гэх мэт..."
                  rows={3}
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="languages">Хэл мэдлэг</Label>
                <Select 
                  value={formData.languages}
                  onValueChange={(value) => handleInputChange("languages", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Хэл сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mongolian">Зөвхөн монгол хэл</SelectItem>
                    <SelectItem value="mongolian-basic-english">Монгол + энгийн англи хэл</SelectItem>
                    <SelectItem value="mongolian-good-english">Монгол + сайн англи хэл</SelectItem>
                    <SelectItem value="mongolian-chinese">Монгол + хятад хэл</SelectItem>
                    <SelectItem value="mongolian-russian">Монгол + орос хэл</SelectItem>
                    <SelectItem value="multilingual">Олон хэл мэддэг</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Ажлын нөхцөл ба хүсэлт
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="preferredWorkType">Ажлын хуваарь *</Label>
                <Select 
                  value={formData.preferredWorkType}
                  onValueChange={(value) => handleInputChange("preferredWorkType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Хуваарь сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Бүтэн цагийн</SelectItem>
                    <SelectItem value="shift-work">Ээлжийн ажил</SelectItem>
                    <SelectItem value="rotation">Ротаци (14/14, 21/7 гэх мэт)</SelectItem>
                    <SelectItem value="contract">Гэрээт ажил</SelectItem>
                    <SelectItem value="seasonal">Улирлын ажил</SelectItem>
                    <SelectItem value="flexible">Уян хатан</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expectedSalary">Хүсэж буй цалин (сар бүр)</Label>
                <Select 
                  value={formData.expectedSalary}
                  onValueChange={(value) => handleInputChange("expectedSalary", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Цалингийн хэмжээ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000-800000">500,000 - 800,000₮</SelectItem>
                    <SelectItem value="800000-1200000">800,000 - 1,200,000₮</SelectItem>
                    <SelectItem value="1200000-1800000">1,200,000 - 1,800,000₮</SelectItem>
                    <SelectItem value="1800000-2500000">1,800,000 - 2,500,000₮</SelectItem>
                    <SelectItem value="2500000+">2,500,000₮+</SelectItem>
                    <SelectItem value="negotiable">Ярилцах боломжтой</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Ажлын нөхцөл (олон сонголт боломжтой)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { id: "camp", label: "Кемпт байрших" },
                    { id: "transport", label: "Тээврийн хэрэгсэл" },
                    { id: "meals", label: "Хоол хүнс" },
                    { id: "insurance", label: "Даатгал" },
                    { id: "overtime", label: "Цагийн илүү цалин" },
                    { id: "training", label: "Сургалт авах боломж" }
                  ].map((condition) => (
                    <div key={condition.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={condition.id}
                        checked={formData.workConditions.includes(condition.id)}
                        onCheckedChange={(checked) => 
                          handleWorkConditionChange(condition.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={condition.id} className="text-sm">
                        {condition.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Нэмэлт мэдээлэл</Label>
                <Textarea 
                  id="additionalInfo" 
                  placeholder="Таны талаар нэмж хэлэх зүйл, тусгай хүсэлт зэрэг..."
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ажилчны анкет бүртгэх</h1>
          <p className="text-muted-foreground">
            Дараах алхмуудыг дагаж мэргэжлийн CV-гаа бүтээнэ үү
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Алхам {currentStep} / {totalSteps}</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% дуусгасан
              </span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
            
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span className={currentStep >= 1 ? "text-primary font-medium" : ""}>
                Хувийн мэдээлэл
              </span>
              <span className={currentStep >= 2 ? "text-primary font-medium" : ""}>
                Мэргэжлийн мэдээлэл
              </span>
              <span className={currentStep >= 3 ? "text-primary font-medium" : ""}>
                Боловсрол ба ур чадвар
              </span>
              <span className={currentStep >= 4 ? "text-primary font-medium" : ""}>
                Ажлын нөхцөл
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Өмнөх
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Дараах
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Дуусгах
                </Button>
              )}
            </div>
            
            <div className="text-center mt-4">
              <Button variant="ghost" asChild>
                <Link to="/">Цуцлах</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CandidateRegistration;