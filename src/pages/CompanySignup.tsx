import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Mail, Phone, MapPin, Globe, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanySignup = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    industry: "",
    companySize: "",
    website: "",
    description: "",
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Алдаа",
        description: "Үйлчилгээний нөхцөлийг зөвшөөрнө үү",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Амжилттай бүртгэгдлээ!",
        description: "И-мэйл хаягаар баталгаажуулах холбоос илгээлээ"
      });
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Дахин оролдоно уу",
        variant: "destructive"
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-4">Амжилттай бүртгэгдлээ!</h2>
              <p className="text-muted-foreground mb-6">
                Таны и-мэйл хаяг руу баталгаажуулах холбоос илгээлээ. 
                И-мэйлээ шалгаж баталгаажуулаарай.
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link to="/">Нүүр хуудас руу буцах</Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  И-мэйл ирээгүй бол spam хавтас шалгана уу
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Компани бүртгүүлэх</h1>
          <p className="text-muted-foreground">
            Ажилчин хайж олохын тулд компанийн мэдээллээ бүртгүүлнэ үү
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Компанийн мэдээлэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Компанийн нэр *</Label>
                  <Input 
                    id="companyName"
                    placeholder="Компанийн нэр"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Үйл ажиллагааны салбар *</Label>
                  <Select 
                    value={formData.industry} 
                    onValueChange={(value) => handleInputChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Салбар сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mining">Уул уурхай</SelectItem>
                      <SelectItem value="construction">Барилгын материал</SelectItem>
                      <SelectItem value="energy">Эрчим хүч</SelectItem>
                      <SelectItem value="logistics">Тээвэр ложистик</SelectItem>
                      <SelectItem value="manufacturing">Үйлдвэрлэл</SelectItem>
                      <SelectItem value="other">Бусад</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="companySize">Ажилчдын тоо</Label>
                  <Select 
                    value={formData.companySize} 
                    onValueChange={(value) => handleInputChange("companySize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ажилчдын тоо" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 хүн</SelectItem>
                      <SelectItem value="11-50">11-50 хүн</SelectItem>
                      <SelectItem value="51-200">51-200 хүн</SelectItem>
                      <SelectItem value="201-500">201-500 хүн</SelectItem>
                      <SelectItem value="500+">500+ хүн</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="website">Вэб сайт</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="website"
                      placeholder="https://company.mn"
                      className="pl-10"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Холбоо барих мэдээлэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson">Холбогдох хүний нэр *</Label>
                  <Input 
                    id="contactPerson"
                    placeholder="Овог нэр"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">И-мэйл хаяг *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="company@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
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
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Байршил *</Label>
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
                        <SelectItem value="bulgan">Булган</SelectItem>
                        <SelectItem value="arkhangai">Архангай</SelectItem>
                        <SelectItem value="zavkhan">Завхан</SelectItem>
                        <SelectItem value="govi-altai">Говь-Алтай</SelectItem>
                        <SelectItem value="bayanulgii">Баян-Өлгий</SelectItem>
                        <SelectItem value="khovd">Ховд</SelectItem>
                        <SelectItem value="uvs">Увс</SelectItem>
                        <SelectItem value="tuv">Төв</SelectItem>
                        <SelectItem value="dundgovi">Дундговь</SelectItem>
                        <SelectItem value="dornod">Дорнод</SelectItem>
                        <SelectItem value="sukhbaatar">Сүхбаатар</SelectItem>
                        <SelectItem value="khentii">Хэнтий</SelectItem>
                        <SelectItem value="govisumber">Говьсүмбэр</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Description */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Компанийн танилцуулга</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Компанийн тухай товч мэдээлэл</Label>
                <Textarea 
                  id="description"
                  placeholder="Компанийн үйл ажиллагаа, зорилго, ачаар мэдээллийг энд бичнэ үү..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Би <Link to="/terms" className="text-primary hover:underline">үйлчилгээний нөхцөл</Link> болон{" "}
                    <Link to="/privacy" className="text-primary hover:underline">нууцлалын бодлого</Link>-тай танилцаж зөвшөөрч байна
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={!formData.agreeToTerms}>
                    Бүртгүүлэх
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" asChild>
                    <Link to="/">Цуцлах</Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Аль хэдийн бүртгэлтэй юу?{" "}
                  <Link to="/company-login" className="text-primary hover:underline">
                    Нэвтрэх
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default CompanySignup;