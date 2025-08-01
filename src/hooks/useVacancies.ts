// src/hooks/useVacancies.ts
import { useQuery } from '@tanstack/react-query';
import { 
  getAllVacancies, 
  getVacancyDetail, 
  getCompanies, 
  getCompanyDetail,
  getCompaniesFromVacancies,
  Vacancy, 
  VacancyDetail, 
  Company 
} from '@/services/api';

// Hook for fetching all vacancies
export const useVacancies = () => {
  return useQuery({
    queryKey: ['vacancies'],
    queryFn: getAllVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for fetching vacancy detail by ID
export const useVacancyDetail = (id: string) => {
  return useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => getVacancyDetail(parseInt(id)),
    enabled: !!id && !isNaN(parseInt(id)), // Only run query if id is valid
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Hook for fetching vacancies by company
export const useVacanciesByCompany = (companyName: string) => {
  const { data: allVacancies, ...queryResult } = useVacancies();
  
  const vacanciesByCompany = allVacancies?.filter(
    (vacancy: Vacancy) => 
      vacancy.company.toLowerCase().includes(companyName.toLowerCase())
  ) || [];

  return {
    ...queryResult,
    data: vacanciesByCompany,
  };
};

// Hook for fetching all companies
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for fetching companies derived from vacancies only (for comparison/fallback)
export const useCompaniesFromVacancies = () => {
  return useQuery({
    queryKey: ['companies-from-vacancies'],
    queryFn: getCompaniesFromVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Hook for fetching company detail by ID
export const useCompanyDetail = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompanyDetail(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Hook for getting companies with their vacancy counts (enriched data)
export const useCompaniesWithStats = () => {
  const { data: companies, ...companiesQuery } = useCompanies();
  const { data: vacancies } = useVacancies();

  // Enrich companies with real-time vacancy statistics
  const enrichedCompanies = companies?.map((company: Company) => {
    const companyVacancies = vacancies?.filter(
      (vacancy: Vacancy) => vacancy.company === company.name
    ) || [];

    return {
      ...company,
      openPositions: companyVacancies.length,
      latestJobs: companyVacancies.slice(0, 3), // Most recent jobs
      avgSalary: calculateAverageSalary(companyVacancies),
    };
  });

  return {
    ...companiesQuery,
    data: enrichedCompanies,
  };
};

// Hook for searching vacancies with advanced filters
export const useVacancySearch = (filters: {
  search?: string;
  company?: string;
  location?: string;
  profession?: string;
  workType?: string;
  workCondition?: string;
  experience?: string;
  minSalary?: number;
  maxSalary?: number;
}) => {
  const { data: allVacancies, ...queryResult } = useVacancies();

  const filteredVacancies = allVacancies?.filter((vacancy: Vacancy) => {
    // Text search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        vacancy.title.toLowerCase().includes(searchTerm) ||
        vacancy.company.toLowerCase().includes(searchTerm) ||
        vacancy.location.toLowerCase().includes(searchTerm) ||
        vacancy.responsibilities.toLowerCase().includes(searchTerm) ||
        vacancy.requirements.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) return false;
    }

    // Company filter
    if (filters.company && filters.company !== 'all') {
      if (!vacancy.company.toLowerCase().includes(filters.company.toLowerCase())) {
        return false;
      }
    }

    // Location filter
    if (filters.location && filters.location !== 'all') {
      if (vacancy.location !== filters.location) return false;
    }

    // Profession filter
    if (filters.profession && filters.profession !== 'all') {
      if (vacancy.profession !== filters.profession) return false;
    }

    // Work type filter
    if (filters.workType && filters.workType !== 'all') {
      if (vacancy.workType !== filters.workType) return false;
    }

    // Work condition filter
    if (filters.workCondition && filters.workCondition !== 'all') {
      if (vacancy.workCondition !== filters.workCondition) return false;
    }

    // Experience filter
    if (filters.experience && filters.experience !== 'all') {
      if (vacancy.experience !== filters.experience) return false;
    }

    // Salary range filter
    if (filters.minSalary || filters.maxSalary) {
      const salaryNumbers = extractSalaryNumbers(vacancy.salary);
      if (salaryNumbers.min && filters.minSalary && salaryNumbers.min < filters.minSalary) {
        return false;
      }
      if (salaryNumbers.max && filters.maxSalary && salaryNumbers.max > filters.maxSalary) {
        return false;
      }
    }

    return true;
  }) || [];

  return {
    ...queryResult,
    data: filteredVacancies,
  };
};

// Hook for getting vacancy statistics
export const useVacancyStats = () => {
  const { data: vacancies, ...queryResult } = useVacancies();

  const stats = vacancies ? {
    total: vacancies.length,
    byLocation: getCountByField(vacancies, 'location'),
    byCompany: getCountByField(vacancies, 'company'),
    byProfession: getCountByField(vacancies, 'profession'),
    byWorkType: getCountByField(vacancies, 'workType'),
    byWorkCondition: getCountByField(vacancies, 'workCondition'),
    salaryRanges: getSalaryRanges(vacancies),
    recentJobs: vacancies.slice(0, 5), // Most recent 5 jobs
  } : null;

  return {
    ...queryResult,
    data: stats,
  };
};

// Hook for getting company statistics
export const useCompanyStats = () => {
  const { data: companies, ...queryResult } = useCompanies();

  const stats = companies ? {
    total: companies.length,
    totalOpenPositions: companies.reduce((sum, company) => sum + company.openPositions, 0),
    byLocation: getCountByField(companies, 'location'),
    byIndustry: getCountByField(companies, 'industry'),
    topEmployers: companies
      .sort((a, b) => b.openPositions - a.openPositions)
      .slice(0, 5),
  } : null;

  return {
    ...queryResult,
    data: stats,
  };
};

// Utility functions
const calculateAverageSalary = (vacancies: Vacancy[]): string => {
  const salaries = vacancies
    .map(v => extractSalaryNumbers(v.salary))
    .filter(s => s.min || s.max);
  
  if (salaries.length === 0) return 'Тодорхойгүй';
  
  const avgMin = salaries.reduce((sum, s) => sum + (s.min || 0), 0) / salaries.length;
  const avgMax = salaries.reduce((sum, s) => sum + (s.max || 0), 0) / salaries.length;
  
  if (avgMin && avgMax) {
    return `${Math.round(avgMin).toLocaleString()}₮ - ${Math.round(avgMax).toLocaleString()}₮`;
  }
  
  return 'Тодорхойгүй';
};

const extractSalaryNumbers = (salary: string): { min?: number; max?: number } => {
  if (!salary) return {};
  
  // Extract numbers from salary string like "2,000,000₮ - 3,000,000₮"
  const numbers = salary.match(/[\d,]+/g);
  if (!numbers) return {};
  
  const parsedNumbers = numbers.map(n => parseInt(n.replace(/,/g, '')));
  
  if (parsedNumbers.length >= 2) {
    return { min: parsedNumbers[0], max: parsedNumbers[1] };
  } else if (parsedNumbers.length === 1) {
    return { min: parsedNumbers[0] };
  }
  
  return {};
};

const getCountByField = (items: any[], field: string): Record<string, number> => {
  return items.reduce((acc, item) => {
    const value = item[field] || 'Тодорхойгүй';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const getSalaryRanges = (vacancies: Vacancy[]): Record<string, number> => {
  const ranges = {
    '0-1,000,000₮': 0,
    '1,000,000-2,000,000₮': 0,
    '2,000,000-3,000,000₮': 0,
    '3,000,000₮+': 0,
    'Тодорхойгүй': 0,
  };

  vacancies.forEach(vacancy => {
    const salaryNumbers = extractSalaryNumbers(vacancy.salary);
    const avgSalary = salaryNumbers.min 
      ? (salaryNumbers.max ? (salaryNumbers.min + salaryNumbers.max) / 2 : salaryNumbers.min)
      : null;

    if (!avgSalary) {
      ranges['Тодорхойгүй']++;
    } else if (avgSalary < 1000000) {
      ranges['0-1,000,000₮']++;
    } else if (avgSalary < 2000000) {
      ranges['1,000,000-2,000,000₮']++;
    } else if (avgSalary < 3000000) {
      ranges['2,000,000-3,000,000₮']++;
    } else {
      ranges['3,000,000₮+']++;
    }
  });

  return ranges;
};