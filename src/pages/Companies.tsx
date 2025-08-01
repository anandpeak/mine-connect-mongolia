// src/pages/Companies.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Users, Briefcase, Loader2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { getCompanies, Company } from "@/services/api";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch companies using React Query
  const { 
    data: companies = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Filter companies based on search
  const filteredCompanies = companies.filter((company: Company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Компаниудын мэдээлэл ачааллаж байна...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-destructive text-lg mb-4">
              Компаниудын мэдээллийг ачаалахад алдаа гарлаа
            </p>
            <button 
              onClick={() => refetch()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Дахин оролдох
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Компаниуд</h1>
          <p className="text-muted-foreground">
            Уул уурхайн салбарын {filteredCompanies.length} компани
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Компани хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company: Company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {company.photoUrl && (
                          <img 
                            src={company.photoUrl} 
                            alt={`${company.name} logo`}
                            className="w-10 h-10 rounded-lg object-contain bg-white border"
                            onError={(e) => {
                              // Hide image if it fails to load
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {company.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{company.industry}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                  
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

                  {/* Contact Information */}
                  {company.email && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">И-мэйл:</span> {company.email}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link 
                      to={`/jobs?company=${encodeURIComponent(company.name)}`}
                      className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                    >
                      Ажлын байрууд ({company.openPositions})
                    </Link>
                    {company.website && (
                      <a 
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
                        title="Вэб сайт"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg mb-2">
                {searchTerm ? 'Хайлтад тохирох компани олдсонгүй' : 'Компани олдсонгүй'}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-primary hover:underline"
                >
                  Хайлтыг арилгах
                </button>
              )}
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        {filteredCompanies.length > 0 && (
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{filteredCompanies.length}</p>
                <p className="text-sm text-muted-foreground">Нийт компани</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {filteredCompanies.reduce((sum, company) => sum + company.openPositions, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Нийт ажлын байр</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {new Set(filteredCompanies.map(c => c.location)).size}
                </p>
                <p className="text-sm text-muted-foreground">Аймаг, хот</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Companies;