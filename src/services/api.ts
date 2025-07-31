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

// Helper function to parse XML to JavaScript object
const parseXML = (xmlString: string): any => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const xmlToObj = (node: Element): any => {
    const result: any = {};
    
    // Handle child elements
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const tagName = child.tagName;
      
      if (child.children.length > 0) {
        // If has children, recursively parse
        if (tagName === 'supplies' && child.children.length > 0) {
          // Special handling for supplies array
          result[tagName] = Array.from(child.children).map(c => xmlToObj(c as Element));
        } else {
          result[tagName] = xmlToObj(child);
        }
      } else {
        // If no children, get text content
        result[tagName] = child.textContent || '';
      }
    }
    
    return result;
  };
  
  return xmlToObj(xmlDoc.documentElement);
};

// Helper function to clean HTML tags from text
const cleanHtmlTags = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

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

// Helper function to format roster
const formatRoster = (roster: string): string => {
  if (!roster) return 'Стандарт цагийн хуваарь';
  
  // If it's in format "14/14", convert to readable format
  if (roster.includes('/')) {
    const [work, rest] = roster.split('/');
    return `${work}/${rest} (${work} хоног ажил, ${rest} хоног амралт)`;
  }
  
  return roster;
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
        roster: formatRoster(item.roster), // API has "roster" field
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
    
    // Get XML response as text
    const xmlText = await response.text();
    console.log('Raw XML Response:', xmlText);
    
    // Parse XML to JavaScript object
    const data = parseXML(xmlText);
    console.log('Parsed Detail Data:', data);
    
    return {
      id: data.id?.toString() || id.toString(),
      title: data.title || 'Тодорхойгүй ажил',
      company: data.cname || 'Тодорхойгүй компани', // XML uses "cname" for company name
      location: data.aimagName || 'Тодорхойгүй байршил', // XML uses "aimagName"
      workType: formatWorkTime(data.workTime), // XML uses "workTime"
      roster: formatRoster(data.roster), // XML has "roster"
      experience: 'Туршлага шаардахгүй', // Not specified in XML
      profession: 'Уурхайчин', // Default profession
      workCondition: formatWorkRange(data.workRange), // XML uses "workRange"
      responsibilities: cleanHtmlTags(data.responsibility) || 'Дэлгэрэнгүй үүрэг тодорхойлогдоогүй', // XML uses "responsibility"
      requirements: cleanHtmlTags(data.requirement) || 'Шаардлага тодорхойлогдоогүй', // XML uses "requirement" 
      additionalInfo: data.campInfo || '',
      phone: data.phoneNumber || '', // XML uses "phoneNumber"
      salary: formatSalary(parseInt(data.minSalary) || 0, parseInt(data.maxSalary) || 0),
      supply: data.supplies?.length > 0 ? 'Хангамжтай' : '',
      description: cleanHtmlTags(data.responsibility) || '',
      benefits: data.campInfo || '',
      applicationDeadline: '',
      // Keep additional XML fields
      companyId: data.companyId,
      locationId: data.locationId,
      mapName: data.mapName,
      campInfo: data.campInfo,
      supplies: data.supplies,
      images: data.images,
      workRange: data.workRange,
      hasSent: data.hasSent === 'true',
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