// src/services/api.ts
const API_BASE_URL = 'https://oneplace-hr-326159028339.asia-southeast1.run.app/v1';

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: string;
  roster: string;
  experience: string;
  profession: string;
  workCondition: string;
  responsibilities: string;
  requirements: string;
  additionalInfo: string;
  phone: string;
  salary: string;
  supply?: string;
  // Add other fields as they come from the API
  [key: string]: any;
}

export interface VacancyDetail extends Vacancy {
  // Additional fields that might be in the detail endpoint
  description?: string;
  benefits?: string;
  applicationDeadline?: string;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  description: string;
  employees: string;
  openPositions: number;
  industry: string;
  website: string;
  photoUrl?: string;
  email?: string;
  // Add other fields as they come from the API
  [key: string]: any;
}

// Helper function to format salary
const formatSalary = (minSalary?: number, maxSalary?: number): string => {
  if (minSalary && maxSalary) {
    return `${minSalary.toLocaleString()}₮ - ${maxSalary.toLocaleString()}₮`;
  } else if (minSalary) {
    return `${minSalary.toLocaleString()}₮+`;
  } else if (maxSalary) {
    return `${maxSalary.toLocaleString()}₮ хүртэл`;
  }
  return 'Тохиролцоно';
};

// Helper function to format work time
const formatWorkTime = (workTime: string): string => {
  switch (workTime) {
    case 'full-time':
      return 'Бүтэн цаг';
    case 'part-time':
      return 'Хагас цаг';
    case 'contract':
      return 'Гэрээт';
    default:
      return workTime || 'Бүтэн цаг';
  }
};

// Helper function to format work range
const formatWorkRange = (workRange: string): string => {
  switch (workRange) {
    case 'onsite':
      return 'Уурхай';
    case 'remote':
      return 'Зайнаас';
    case 'hybrid':
      return 'Холимог';
    default:
      return workRange || 'Уурхай';
  }
};

// Helper function to format roster - UPDATED to remove explanation
const formatRoster = (roster: string): string => {
  if (!roster) return 'Стандарт';
  
  // If it's in format "14/14", just return it as is without explanation
  if (roster.includes('/')) {
    const match = roster.match(/(\d+\/\d+)/);
    return match ? match[1] : roster;
  }
  
  return roster;
};

// Helper function to clean HTML tags from text
const cleanHtmlTags = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

// Get all open vacancies
export const getAllVacancies = async (): Promise<Vacancy[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vacancy/get-many-open`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the actual API response structure
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title || 'Тодорхойгүй ажил',
        company: item.name || 'Тодорхойгүй компани', // API uses "name" for company
        location: item.aimagName || 'Тодорхойгүй байршил', // API uses "aimagName" for location
        workType: formatWorkTime(item.workTime), // API uses "workTime"
        roster: formatRoster(item.roster), // API has "roster" field - now cleaned
        experience: 'Туршлага шаардахгүй', // Not in basic API response
        profession: 'Уурхайчин', // Default since not in basic response
        workCondition: item.hasCamp ? 'Кемптэй' : 'Уурхай', // Use camp info
        responsibilities: 'Дэлгэрэнгүй мэдээллийг харах товчийг дарна уу', // Not in basic response
        requirements: 'Дэлгэрэнгүй мэдээллийг харах товчийг дарна уу', // Not in basic response
        additionalInfo: item.hasCamp ? 'Кемп байршилтай' : '',
        phone: '', // Not in basic response, might be in detail
        salary: formatSalary(item.minSalary, item.maxSalary),
        supply: item.hasCamp ? 'Кемп, хоол хүнс' : '',
        // Keep additional API fields
        createdDate: item.createdDate,
        photoUrl: item.photoUrl,
        hasCamp: item.hasCamp,
        hasSent: item.hasSent,
        minSalary: item.minSalary,
        maxSalary: item.maxSalary,
        cphotoUrl: item.cphotoUrl, // Company logo URL
        // Keep original data for reference
        _raw: item
      }));
    }
    
    return [];
    
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return [];
  }
};

// Get vacancy detail by ID
export const getVacancyDetail = async (id: number): Promise<VacancyDetail | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vacancy/get-detail?id=${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get JSON response
    const data = await response.json();
    console.log('Vacancy Detail Response:', data);
    
    return {
      id: data.id?.toString() || id.toString(),
      title: data.title || 'Тодорхойгүй ажил',
      company: data.cname || data.companyName || 'Тодорхойгүй компани',
      location: data.aimagName || data.location || 'Тодорхойгүй байршил',
      workType: formatWorkTime(data.workTime),
      roster: formatRoster(data.roster), // Updated formatting
      experience: data.experience || data.experienceRequired || 'Туршлага шаардахгүй',
      profession: data.profession || data.category || 'Уурхайчин',
      workCondition: formatWorkRange(data.workRange),
      responsibilities: cleanHtmlTags(data.responsibility) || 'Дэлгэрэнгүй үүрэг тодорхойлогдоогүй',
      requirements: cleanHtmlTags(data.requirement) || 'Шаардлага тодорхойлогдоогүй',
      additionalInfo: data.campInfo || data.additionalInfo || '',
      phone: data.phoneNumber || data.phone || '',
      salary: formatSalary(parseInt(data.minSalary) || 0, parseInt(data.maxSalary) || 0),
      supply: data.supplies?.length > 0 ? 'Хангамжтай' : '',
      description: cleanHtmlTags(data.responsibility) || '',
      benefits: data.campInfo || '',
      applicationDeadline: '',
      // Keep additional fields
      companyId: data.companyId,
      locationId: data.locationId,
      mapName: data.mapName,
      campInfo: data.campInfo,
      supplies: data.supplies,
      images: data.images,
      workRange: data.workRange,
      hasSent: data.hasSent === 'true' || data.hasSent === true,
      cphotoUrl: data.cphotoUrl,
      cemail: data.cemail,
      // Keep original data for reference
      _raw: data
    };
    
  } catch (error) {
    console.error('Error fetching vacancy detail:', error);
    return null;
  }
};

// Get companies from vacancies data (primary method)
export const getCompaniesFromVacancies = async (): Promise<Company[]> => {
  try {
    const vacancies = await getAllVacancies();
    
    // Group vacancies by company
    const companiesMap = new Map<string, Company>();
    
    vacancies.forEach((vacancy: Vacancy) => {
      const companyKey = vacancy.company;
      
      if (companiesMap.has(companyKey)) {
        // Update existing company
        const existingCompany = companiesMap.get(companyKey)!;
        existingCompany.openPositions += 1;
        
        // Update location if current company location is more specific
        if (vacancy.location && vacancy.location !== 'Тодорхойгүй байршил') {
          existingCompany.location = vacancy.location;
        }
        
        // Update photo URL if available and not already set
        if (vacancy.cphotoUrl && !existingCompany.photoUrl) {
          existingCompany.photoUrl = vacancy.cphotoUrl;
        }
      } else {
        // Create new company entry
        const company: Company = {
          id: `company-${companiesMap.size + 1}`,
          name: vacancy.company,
          location: vacancy.location,
          description: `${vacancy.company} компани нь уул уурхайн салбарт үйл ажиллагаа явуулдаг.`,
          employees: "500+", // Default since we don't have this data
          openPositions: 1,
          industry: "Уул уурхай",
          website: `https://${vacancy.company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.mn`,
          photoUrl: vacancy.cphotoUrl || vacancy.photoUrl || '',
          email: '',
          // Keep original vacancy data for reference
          _rawVacancy: vacancy
        };
        
        companiesMap.set(companyKey, company);
      }
    });
    
    return Array.from(companiesMap.values()).sort((a, b) => 
      b.openPositions - a.openPositions
    );
    
  } catch (error) {
    console.error('Error creating companies from vacancies:', error);
    return [];
  }
};

// Main companies function - use getCompaniesFromVacancies by default to avoid 403 error
export const getCompanies = async (): Promise<Company[]> => {
  // Skip the problematic companies endpoint that returns 403
  // Use getCompaniesFromVacancies as the primary method
  console.log('Getting companies from vacancies data...');
  return await getCompaniesFromVacancies();
};

// Get company details by ID
export const getCompanyDetail = async (id: string): Promise<Company | null> => {
  try {
    // Try to find company in the companies list first
    const companies = await getCompanies();
    const company = companies.find(company => company.id === id);
    
    if (company) {
      return company;
    }
    
    // If not found, try the detail endpoint (might also return 403)
    try {
      const response = await fetch(`${API_BASE_URL}/company/get-detail?id=${id}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Company Detail Response:', data);
        
        return {
          id: data.id?.toString() || id,
          name: data.name || data.companyName || 'Тодорхойгүй компани',
          location: data.location || data.aimagName || 'Тодорхойгүй байршил',
          description: data.description || `${data.name} - уул уурхайн салбарын компани`,
          employees: data.employees || data.employeeCount || '500+',
          openPositions: data.openPositions || data.vacancyCount || 0,
          industry: data.industry || data.sector || 'Уул уурхай',
          website: data.website || data.url || '',
          photoUrl: data.photoUrl || data.logo || data.cphotoUrl || '',
          email: data.email || data.cemail || '',
          _raw: data
        };
      }
    } catch (detailError) {
      console.log('Company detail endpoint also not available, using companies list only');
    }
    
    return null;
    
  } catch (error) {
    console.error('Error fetching company detail:', error);
    return null;
  }
};