import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Wrench, Building, Truck, HardHat, Shield, Settings, Search, X } from "lucide-react";

const CandidateOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({
    interests: [],
    jobCategory: "",
    equipmentTypes: [],
    licenseCategory: "",
    hasCertificate: null,
    learningPreference: "",
    experience: "",
    positionSearch: "",
    salaryExpectation: [1.5],
    additionalInfo: "",
    contactInfo: {
      phone: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  });

  const steps = [
    {
      title: "Та алиар нь сонгох вэ?",
      type: "interests"
    },
    {
      title: "Ямар мэргэжлээр ажил хайж байгаагаа сонгоно уу.",
      type: "jobCategory"
    },
    {
      title: "Жолоодог тоног техвэрээ сонгоно уу.",
      type: "equipment"
    },
    {
      title: "Жолооны үнэмлэхний ангилал сонгоно уу.",
      type: "license"
    },
    {
      title: "Танд мэргэжлийн сертификат байгаа уу?",
      type: "certificate"
    },
    {
      title: "Өөрийн сурсан сургууль / сургалт бичнэ уу.",
      type: "learning"
    },
    {
      title: "Та хэдэн жилийн ажлын туршлагатай вэ?",
      type: "experience"
    },
    {
      title: "Ажиллах байсан байгууллагуудаа сонгоно уу.",
      type: "search"
    },
    {
      title: "Цалингийн хүлээлтээ оруулна уу.",
      type: "salary"
    },
    {
      title: "Бид танай тухай мэдээллийг авахдаа зарим зүйлийг орхигдуулсан байх магадгүй.",
      type: "feedback"
    },
    {
      title: "Бид тантай эргээд холбогдох тул дараах мэдээллүүдийг оруулаарай.",
      type: "contact"
    }
  ];

  const interests = [
    { id: "engineer", label: "Идэвхитэй ажил хайж байна", icon: "👷" },
    { id: "register", label: "Ростерын амралтаар ажил хайж байна", icon: "💰" },
    { id: "specialist", label: "Туршлагатай мэргэжилтэн", icon: "💎" },
    { id: "career", label: "Ажил хайгаагүй ч бүртгүүлье!", icon: "👨‍💼" }
  ];

  const jobCategories = [
    { id: "machine-operator", label: "Машин механизмын оператор", icon: <Truck className="w-6 h-6" /> },
    { id: "construction-operator", label: "Суурин техвэрэмжийн оператор", icon: <Building className="w-6 h-6" /> },
    { id: "engineer", label: "Инженер", icon: <Settings className="w-6 h-6" /> },
    { id: "mechanic", label: "Механик", icon: <Wrench className="w-6 h-6" /> },
    { id: "security", label: "Аюулгүй ажиллагаа", icon: <Shield className="w-6 h-6" /> },
    { id: "guard", label: "Гагнуур", icon: <HardHat className="w-6 h-6" /> }
  ];

  const equipmentTypes = [
    { id: "excavator", label: "Экскаватор/Excavator", icon: "🚜" },
    { id: "loader", label: "Ковш/Loader", icon: "🚛" },
    { id: "dump-truck", label: "Хөво/Dump truck", icon: "🚚" },
    { id: "mining-truck", label: "Дамп/Mining dump truck", icon: "🚛" }
  ];

  const licenseCategories = ["A", "B", "BE", "C1", "C1E"];
  
  const experienceRanges = [
    "Туршлагагүй",
    "1-5 жил",
    "5-8 жил", 
    "8-10 жил",
    "10-15 жил"
  ];

  const updateProfile = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateContactInfo = (field, value) => {
    setProfile(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const finishOnboarding = () => {
    alert("Профайл амжилттай үүсгэгдлээ!");
    console.log("Profile completed:", profile);
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    switch (step.type) {
      case "interests":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <Card 
                  key={interest.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    profile.interests.includes(interest.id) ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    const newInterests = profile.interests.includes(interest.id)
                      ? profile.interests.filter(i => i !== interest.id)
                      : [...profile.interests, interest.id];
                    updateProfile('interests', newInterests);
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{interest.icon}</div>
                    <h3 className="font-medium">{interest.label}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "jobCategory":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    profile.jobCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => updateProfile('jobCategory', category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-primary">
                      {category.icon}
                    </div>
                    <h3 className="font-medium">{category.label}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "equipment":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipmentTypes.map((equipment) => (
                <Card 
                  key={equipment.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    profile.equipmentTypes.includes(equipment.id) ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    const newEquipment = profile.equipmentTypes.includes(equipment.id)
                      ? profile.equipmentTypes.filter(e => e !== equipment.id)
                      : [...profile.equipmentTypes, equipment.id];
                    updateProfile('equipmentTypes', newEquipment);
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{equipment.icon}</div>
                    <h3 className="font-medium">{equipment.label}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "license":
        return (
          <div className="space-y-4">
            <Label>Сонголт хийгдээгүй байна</Label>
            <Select onValueChange={(value) => updateProfile('licenseCategory', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Сонголт хийгдээгүй байна" />
              </SelectTrigger>
              <SelectContent>
                {licenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "certificate":
        return (
          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Button
                variant={profile.hasCertificate === false ? "default" : "outline"}
                onClick={() => updateProfile('hasCertificate', false)}
                className="px-8"
              >
                Байгаа
              </Button>
              <Button
                variant={profile.hasCertificate === true ? "default" : "outline"}
                onClick={() => updateProfile('hasCertificate', true)}
                className="px-8"
              >
                Байхгүй
              </Button>
            </div>
          </div>
        );

      case "learning":
        return (
          <div className="space-y-4">
            <textarea
              className="w-full p-4 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
              placeholder="Өөрийн сурсан сургууль / сургалт бичнэ уу."
              value={profile.learningPreference}
              onChange={(e) => updateProfile('learningPreference', e.target.value)}
            />
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <Select onValueChange={(value) => updateProfile('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Туршлагагүй" />
              </SelectTrigger>
              <SelectContent>
                {experienceRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "search":
        return (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Эндээс хайна уу."
                value={profile.positionSearch}
                onChange={(e) => updateProfile('positionSearch', e.target.value)}
              />
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-muted-foreground">Одоогоор сонгосон байгууллага байхгүй байна.</p>
            </div>
          </div>
        );

      case "salary":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>1,5 сая-с доош</span>
              <span>1,5 сая-3 сая</span>
              <span>3 сая-5 сая</span>
              <span>5 саяас дээш</span>
            </div>
            <div className="px-4">
              <Slider
                value={profile.salaryExpectation}
                onValueChange={(value) => updateProfile('salaryExpectation', value)}
                max={4}
                min={1}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-orange-500">
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span>🪙</span>
                </div>
                <span>1,5 сая-с доош</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span>💵</span>
                </div>
                <span>1,5 сая-3 сая</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span>💰</span>
                </div>
                <span>3 сая-5 сая</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span>💎</span>
                </div>
                <span>5 саяас дээш</span>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-4 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👷‍♂️</span>
            </div>
            <p className="text-muted-foreground">
              Дараах хэсэгт өөрийн тухай хүваалцсанаар ажил олоход улам давуу талтай дэхэм болох юм.
            </p>
            <textarea
              className="w-full p-4 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
              placeholder="Тийм бол энд бичнэ үү"
              value={profile.additionalInfo || ""}
              onChange={(e) => updateProfile('additionalInfo', e.target.value)}
            />
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Утасны дугаар</Label>
              <Input
                placeholder="9999-9999"
                value={profile.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Овог</Label>
              <Input
                placeholder="Өөрийн овгийг бичнэ үү."
                value={profile.contactInfo.lastName}
                onChange={(e) => updateContactInfo('lastName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Нэр</Label>
              <Input
                placeholder="Өөрийн нэрийг бичнэ үү." 
                value={profile.contactInfo.firstName}
                onChange={(e) => updateContactInfo('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Мэйл хаяг</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                value={profile.contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-6">
              <input 
                type="checkbox" 
                id="newsletter"
                className="w-4 h-4"
              />
              <Label className="text-sm">Хэгжлийн бэрхшээлтэй иргэн</Label>
            </div>
          </div>
        );

      default:
        return <div>Алдаа гарлаа</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Буцах
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1">
            {Array.from({ length: steps.length }).map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-black' : 
                  index < currentStep ? 'bg-gray-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
              {steps[currentStep].title}
            </h1>
            
            {renderStep()}
            
            <div className="flex justify-center mt-8">
              {currentStep === steps.length - 1 ? (
                <Button 
                  onClick={finishOnboarding} 
                  className="px-8"
                  disabled={!profile.contactInfo.phone || !profile.contactInfo.firstName || !profile.contactInfo.email}
                >
                  Үргэлжлүүлэх
                </Button>
              ) : (
                <Button onClick={nextStep} className="px-8">
                  Үргэлжлүүлэх
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateOnboarding;