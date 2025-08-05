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
    sortBy: "newest" // New sort filter, removed workCondition and experience
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
      sortBy: "newest"
    });
  };

  // Helper function to extract salary number for sorting
  const extractSalaryNumber = (salary: string): number => {
    if (!salary || salary === 'Тохиролцоно') return 0;
    
    // Extract numbers from salary string like "1,500,000₮ - 2,000,000₮"
    const numbers = salary.match(/[\d,]+/g);
    if (!numbers || numbers.length === 0) return 0;
    
    // Use the first number (minimum salary) for sorting
    const minSalary = numbers[0].replace(/,/g, '');
    return parseInt(minSalary) || 0;
  };

  // Helper function to parse date for sorting
  const parseDateForSorting = (dateString?: string): number => {
    if (!dateString) return 0;
    
    try {
      return new Date(dateString).getTime();
    } catch {
      return 0;
    }
  };

  const filteredAndSortedJobs = useMemo(() => {
    // First filter the jobs
    let filtered = vacancies.filter((job: Vacancy) => {
      const matchesSearch = filters.search === "" || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesProfession = filters.profession === "all" || job.profession === filters.profession;
      const matchesLocation = filters.location === "all" || job.location === filters.location;
      const matchesWorkType = filters.workType === "all" || job.workType === filters.workType;

      return matchesSearch && matchesProfession && matchesLocation && matchesWorkType;
    });

    // Then sort the filtered results
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => parseDateForSorting(a.createdDate) - parseDateForSorting(b.createdDate));
        break;
      case 'salary-high':
        filtered.sort((a, b) => extractSalaryNumber(b.salary) - extractSalaryNumber(a.salary));
        break;
      case 'salary-low':
        filtered.sort((a, b) => extractSalaryNumber(a.salary) - extractSalaryNumber(b.salary));
        break;
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company, 'mn'));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => parseDateForSorting(b.createdDate) - parseDateForSorting(a.createdDate));
        break;
    }

    return filtered;
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
            Уул уурхайн салбарын {filteredAndSortedJobs.length} ажлын байр
          </p>
        </div>

        <JobFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedJobs.length > 0 ? (
            filteredAndSortedJobs.map((job: Vacancy) => (
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
              {filteredAndSortedJobs.length === 0 && vacancies.length > 0 && (
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