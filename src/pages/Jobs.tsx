// src/pages/Jobs.tsx
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import JobFilter from "@/components/JobFilter";
import { getAllVacancies, Vacancy } from "@/services/api";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: "",
    profession: "all",
    location: "all",
    workType: "all",
    workCondition: "all",
    experience: "all"
  });

  // Fetch vacancies using React Query
  const { 
    data: vacancies = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: getAllVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Handle company filter from URL parameter
  useEffect(() => {
    const companyParam = searchParams.get('company');
    if (companyParam) {
      setFilters(prev => ({ ...prev, search: companyParam }));
    }
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      profession: "all",
      location: "all",
      workType: "all",
      workCondition: "all",
      experience: "all"
    });
  };

  const filteredJobs = useMemo(() => {
    return vacancies.filter((job: Vacancy) => {
      const matchesSearch = filters.search === "" || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesProfession = filters.profession === "all" || job.profession === filters.profession;
      const matchesLocation = filters.location === "all" || job.location === filters.location;
      const matchesWorkType = filters.workType === "all" || job.workType === filters.workType;
      const matchesWorkCondition = filters.workCondition === "all" || job.workCondition === filters.workCondition;
      const matchesExperience = filters.experience === "all" || job.experience === filters.experience;

      return matchesSearch && matchesProfession && matchesLocation && 
             matchesWorkType && matchesWorkCondition && matchesExperience;
    });
  }, [vacancies, filters]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Ажлын байрнууд ачааллаж байна...</p>
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
              Ажлын байрнуудыг ачаалахад алдаа гарлаа
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Ажлын байрнууд</h1>
          <p className="text-muted-foreground">
            Уул уурхайн салбарын {filteredJobs.length} ажлын байр
          </p>
        </div>

        <JobFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: Vacancy) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                {vacancies.length === 0 
                  ? "Одоогоор ажлын байр байхгүй байна"
                  : "Хайлтын шалгуурт тохирох ажлын байр олдсонгүй"
                }
              </p>
              {filteredJobs.length === 0 && vacancies.length > 0 && (
                <button 
                  onClick={handleClearFilters}
                  className="text-primary hover:underline mt-2"
                >
                  Шүүлтүүрийг арилгах
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;