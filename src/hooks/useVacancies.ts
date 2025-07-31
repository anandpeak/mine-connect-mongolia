// src/hooks/useVacancies.ts
import { useQuery } from '@tanstack/react-query';
import { getAllVacancies, getVacancyDetail, Vacancy, VacancyDetail } from '@/services/api';

// Hook for fetching all vacancies
export const useVacancies = () => {
  return useQuery({
    queryKey: ['vacancies'],
    queryFn: getAllVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook for fetching vacancy detail by ID
export const useVacancyDetail = (id: string) => {
  return useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => getVacancyDetail(parseInt(id)),
    enabled: !!id, // Only run query if id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
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