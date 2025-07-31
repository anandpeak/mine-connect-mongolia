import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const mockCompanies = [
  {
    id: "1",
    name: "Оюу Толгой",
    location: "Өмнөговь",
    description: "Дэлхийн томоохон зэс, алтны уурхай",
    employees: "15,000+",
    openPositions: 12,
    industry: "Зэс, алт",
    website: "https://ot.mn"
  },
  {
    id: "2", 
    name: "Эрдэнэс Монгол",
    location: "Дорноговь", 
    description: "Нүүрсний олборлолт, экспортын тэргүүлэгч компани",
    employees: "8,000+",
    openPositions: 8,
    industry: "Нүүрс",
    website: "https://erdenes.mn"
  },
  {
    id: "3",
    name: "Монгол Алт",
    location: "Баянхонгор",
    description: "Алтны олборлолт, боловсруулалтын компани", 
    employees: "3,500+",
    openPositions: 5,
    industry: "Алт",
    website: "https://mongolgold.mn"
  },
  {
    id: "4",
    name: "Тавантолгой",
    location: "Өмнөговь",
    description: "Нүүрсний томоохон ордын хөгжүүлэлт",
    employees: "6,000+", 
    openPositions: 15,
    industry: "Нүүрс",
    website: "https://ttjsc.mn"
  },
  {
    id: "5",
    name: "МАК",
    location: "Дундговь",
    description: "Уран, цайрын олборлолт",
    employees: "2,200+",
    openPositions: 3,
    industry: "Уран, цайр",
    website: "https://mac.mn"
  },
  {
    id: "6",
    name: "Энержи Ресурс",
    location: "Төв",
    description: "Цахиурын олборлолт, экспорт",
    employees: "1,800+",
    openPositions: 7,
    industry: "Цахиур",
    website: "https://energyresources.mn"
  }
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Компаниуд</h1>
          <p className="text-muted-foreground">
            Уул уурхайн салбарын {mockCompanies.length} компани
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompanies.map(company => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{company.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {company.location}
                    </div>
                  </div>
                  <Badge variant="secondary">{company.industry}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{company.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">Ажилчин</p>
                      <p className="text-muted-foreground">{company.employees}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">Нээлттэй байр</p>
                      <p className="text-muted-foreground">{company.openPositions}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    to={`/company/${company.id}`}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                  >
                    Ажлын байрууд
                  </Link>
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-secondary/80 transition-colors"
                  >
                    Вэб сайт
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Companies;