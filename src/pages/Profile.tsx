import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CVDisplay from "@/components/CVDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, UserPlus, Building2, Briefcase, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CVData {
  name: string;
  age: string;
  phone: string;
  email: string;
  location: string;
  profession: string;
  experience: string;
  currentlyEmployed: string;
  availability: string;
  willingToRelocate: string;
  preferredLocation: string;
  education: string;
  certifications: string;
  skills: string;
  languages: string;
  preferredWorkType: string;
  expectedSalary: string;
  workConditions: string[];
  additionalInfo: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed registration
    const savedCVData = localStorage.getItem('candidateCV');
    if (savedCVData) {
      setCvData(JSON.parse(savedCVData));
    }
    setIsLoading(false);
  }, []);

  const handleEditProfile = () => {
    navigate('/candidate-registration');
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF татаж байна...",
      description: "Таны CV-г PDF форматаар бэлтгэж байна"
    });
    
    // Here you would implement PDF generation
    // For now, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Амжилттай!",
        description: "CV-г PDF форматаар татаж авлаа"
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  // If no CV data exists, show registration options
  if (!cvData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Миний анкет</h1>
            <p className="text-muted-foreground">
              Ажлын байр хайхын тулд анкетаа бүртгүүлнэ үү
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Registration */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-6 h-6 mr-3 text-primary" />
                  Ажилчны анкет
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ажил хайж буй ажилчин бол энд дарж анкетаа бүртгүүлнэ үү. 
                  Энгийн алхмуудыг дагаж мэргэжлийн CV бүтээнэ үү.
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>✓ Хувийн мэдээлэл оруулах</div>
                  <div>✓ Мэргэжил ба туршлага</div>
                  <div>✓ Боловсрол ба ур чадвар</div>
                  <div>✓ Ажлын нөхцөлийн хүсэлт</div>
                  <div>✓ Мэргэжлийн CV автоматаар бүтээгдэх</div>
                </div>
                
                <Button asChild className="w-full">
                  <Link to="/candidate-registration">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ажилчны анкет бүртгүүлэх
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Company Registration */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-primary" />
                  Компанийн бүртгэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Компанийн нэрээр ажилчин хайж буй бол энд дарж 
                  компанийн мэдээллээ бүртгүүлнэ үү.
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>✓ Компанийн мэдээлэл оруулах</div>
                  <div>✓ Холбоо барих мэдээлэл</div>
                  <div>✓ И-мэйл баталгаажуулалт</div>
                  <div>✓ Ажлын байр нийтлэх эрх</div>
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/company-signup">
                    <Building2 className="w-4 h-4 mr-2" />
                    Компани бүртгүүлэх
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Яагаад Uurkhaichin.mn сонгох вэ?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Хялбар бүртгэл</h4>
                    <p className="text-muted-foreground">Энгийн алхмуудыг дагаж хурдан бүртгүүлээрэй</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Олон ажлын байр</h4>
                    <p className="text-muted-foreground">Уул уурхайн салбарын олон төрлийн ажил</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Мэргэжлийн CV</h4>
                    <p className="text-muted-foreground">Автоматаар мэргэжлийн CV бүтээгдэнэ</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // If CV data exists, show the professional CV
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <CVDisplay 
          data={cvData}
          onEdit={handleEditProfile}
          onDownloadPDF={handleDownloadPDF}
        />
      </main>
    </div>
  );
};

export default Profile;