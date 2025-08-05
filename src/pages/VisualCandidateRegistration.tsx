import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  User,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Step 1: Basic info (minimal text input)
  name: string;
  phone: string;
  location: string;
  
  // Step 2: Vehicle/Equipment type (visual selection)
  equipmentType: string;
  
  // Step 3: Specific profession (visual selection) 
  profession: string;
  
  // Step 4: Job preferences (visual selection)
  jobType: string;
}

const VisualCandidateRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    location: "",
    equipmentType: "",
    profession: "",
    jobType: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.phone && formData.location);
      case 2:
        return !!(formData.equipmentType);
      case 3:
        return !!(formData.profession);
      case 4:
        return !!(formData.jobType);
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
        title: "Сонголт хийнэ үү",
        description: "Дараах алхам руу шилжихийн тулд сонголт хийнэ үү",
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
        title: "Сонголт хийнэ үү",
        description: "Бүх шаардлагатай сонголтуудыг хийнэ үү",
        variant: "destructive"
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create CV data from visual selections
      const cvData = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        profession: formData.profession,
        equipmentType: formData.equipmentType,
        jobType: formData.jobType,
        // Set defaults for other fields
        age: "",
        email: "",
        experience: "Туршлагатай",
        currentlyEmployed: "",
        availability: "Тэр даруй",
        willingToRelocate: "Тийм",
        preferredLocation: "",
        education: "Мэргэжлийн сургууль",
        certifications: "Машин механизмын жолооны эрх",
        skills: `${formData.equipmentType} ажиллуулах`,
        languages: "Монгол хэл",
        preferredWorkType: formData.jobType,
        expectedSalary: "Ярилцах боломжтой",
        workConditions: ["camp", "transport", "meals"],
        additionalInfo: `${formData.equipmentType} ажиллуулахад туршлагатай`
      };
      
      localStorage.setItem('candidateCV', JSON.stringify(cvData));
      
      setIsCompleted(true);
      toast({
        title: "Амжилттай бүртгэгдлээ!",
        description: "Таны анкет бэлэн боллоо"
      });
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Дахин оролдоно уу",
        variant: "destructive"
      });
    }
  };

  // Equipment/Vehicle options (Step 2)
  const equipmentOptions = [
    {
      id: "excavator",
      name: "Экскаватор/Excavator",
      emoji: "🚜",
      image: "🏗️"
    },
    {
      id: "loader",
      name: "Ковш/Loader", 
      emoji: "🚛",
      image: "🏗️"
    },
    {
      id: "dump-truck",
      name: "Хово/Dump truck",
      emoji: "🚚",
      image: "🚛"
    },
    {
      id: "mining-truck",
      name: "Дэмп/Mining dump truck",
      emoji: "🚚",
      image: "🚛"
    }
  ];

  // Profession options (Step 3)  
  const professionOptions = [
    {
      id: "machine-operator",
      name: "Машин механизмын оператор",
      emoji: "🚜",
      image: "👷‍♂️"
    },
    {
      id: "drilling-operator", 
      name: "Сүүрин техвээрэмжийн оператор",
      emoji: "🏗️",
      image: "⚒️"
    },
    {
      id: "engineer",
      name: "Инженер",
      emoji: "👷‍♂️",
      image: "📋"
    },
    {
      id: "mechanic",
      name: "Механик", 
      emoji: "🔧",
      image: "🔧"
    },
    {
      id: "safety",
      name: "Аюулгүй ажиллагаа",
      emoji: "🦺",
      image: "⚠️"
    },
    {
      id: "welder",
      name: "Гагнуур",
      emoji: "⚡",
      image: "🔥"
    }
  ];

  // Job type options (Step 4)
  const jobTypeOptions = [
    {
      id: "experienced-job",
      name: "Идэвхитэй ажил хайж байна",
      emoji: "👷‍♂️",
      description: ""
    },
    {
      id: "roster-job",
      name: "Ростерын амралттай ажил хайж байна", 
      emoji: "💰",
      description: ""
    },
    {
      id: "experienced-professional",
      name: "Туршлагатай мэргэжилтэн",
      emoji: "💎",
      description: "Тэргэвээр гарсан ч ажил хайж байгаа"
    },
    {
      id: "job-seeker",
      name: "Ажил хайгаагүй ч бүртгүүлье!",
      emoji: "🙋‍♂️",
      description: ""
    }
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-4">Амжилттай бүртгэгдлээ!</h2>
              <p className="text-muted-foreground mb-6">
                Таны анкет бэлэн боллоо. Одоо ажил олгогчид таныг олж харах боломжтой.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/profile")} 
                  className="w-full"
                >
                  Миний анкет харах
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
              <CardTitle className="flex items-center text-xl">
                <User className="w-6 h-6 mr-2" />
                Хувийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Таны нэр</label>
                <Input 
                  placeholder="Овог нэрээ бичнэ үү"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Утасны дугаар</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="+976-XXXX-XXXX"
                    className="pl-12 text-lg py-3"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Байршил</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "ulaanbaatar", name: "Улаанбаатар" },
                    { id: "dornogovi", name: "Дорноговь" },
                    { id: "omnogovi", name: "Өмнөговь" },
                    { id: "bayanhongor", name: "Баянхонгор" },
                    { id: "huvsgul", name: "Хөвсгөл" },
                    { id: "other", name: "Бусад" }
                  ].map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => handleInputChange("location", location.name)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        formData.location === location.name
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <MapPin className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{location.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Хэлоодэг төлөв техьееремжээ сонгоно уу.</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {equipmentOptions.map((equipment) => (
                  <button
                    key={equipment.id}
                    type="button"
                    onClick={() => handleInputChange("equipmentType", equipment.name)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                      formData.equipmentType === equipment.name
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-6xl mb-4">{equipment.image}</div>
                    <h3 className="font-medium text-gray-900">{equipment.name}</h3>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Ямар мэргэжлээр ажил хайж байгаагаа сонгоно уу.</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {professionOptions.map((profession) => (
                  <button
                    key={profession.id}
                    type="button"
                    onClick={() => handleInputChange("profession", profession.name)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                      formData.profession === profession.name
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-4xl mb-3">{profession.image}</div>
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">
                      {profession.name}
                    </h3>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Та алийг нь сонгох вэ?</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {jobTypeOptions.map((jobType) => (
                  <button
                    key={jobType.id}
                    type="button"
                    onClick={() => handleInputChange("jobType", jobType.name)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                      formData.jobType === jobType.name
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-4xl mb-3">{jobType.emoji}</div>
                    <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                      {jobType.name}
                    </h3>
                    {jobType.description && (
                      <p className="text-xs text-gray-600">{jobType.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <button 
            onClick={() => navigate("/profile")}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Буцах
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index + 1 === currentStep
                    ? "bg-black"
                    : index + 1 < currentStep
                    ? "bg-gray-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Өмнөх
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="px-8">
              Дараах
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="px-8">
              <CheckCircle className="w-4 h-4 mr-2" />
              Дуусгах
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default VisualCandidateRegistration;