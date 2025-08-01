// src/components/JobFilter.tsx
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { useVacancies } from "@/hooks/useVacancies";

interface JobFilterProps {
  filters: {
    search: string;
    profession: string;
    location: string;
    workType: string;
    workCondition: string;
    experience: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const JobFilter = ({ filters, onFilterChange, onClearFilters }: JobFilterProps) => {
  // Fetch real vacancies data to extract unique values
  const { data: vacancies = [], isLoading } = useVacancies();

  // Extract unique values from real API data
  const filterOptions = useMemo(() => {
    if (!vacancies.length) {
      // Fallback data while loading or if no data
      return {
        locations: [
          "Улаанбаатар",
          "Дорноговь", 
          "Өмнөговь",
          "Баянхонгор",
          "Архангай",
          "Дундговь",
          "Говь-Алтай",
          "Хэнтий",
          "Селенге",
          "Орхон"
        ],
        professions: [
          "Уурхайчин",
          "Машин механизмын оператор",
          "Инженер",
          "Техникч",
          "Цахилгаанчин",
          "Ган гагнуурчин",
          "Тээврийн хэрэгслийн жолооч",
          "Аюулгүй байдлын мэргэжилтэн",
          "Геологич",
          "Лабораторийн ажилтан"
        ],
        workTypes: ["Бүтэн цаг", "Хагас цаг"],
        workConditions: ["Уурхай", "Оффис", "Зайнаас"],
        experiences: ["Туршлага шаардахгүй", "1-2 жил", "3-5 жил", "5+ жил"]
      };
    }

    // Extract unique values from real API data
    const locations = [...new Set(vacancies.map(v => v.location).filter(l => l && l !== 'Тодорхойгүй байршил'))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const professions = [...new Set(vacancies.map(v => v.profession).filter(p => p && p !== 'Бусад'))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const workTypes = [...new Set(vacancies.map(v => v.workType).filter(w => w))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const workConditions = [...new Set(vacancies.map(v => v.workCondition).filter(w => w))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const experiences = [...new Set(vacancies.map(v => v.experience).filter(e => e))]
      .sort((a, b) => {
        // Custom sort for experience levels
        const order = ["Туршлага шаардахгүй", "1-2 жил", "3-5 жил", "5+ жил"];
        return order.indexOf(a) - order.indexOf(b);
      });

    return {
      locations: locations.length > 0 ? locations : ["Байршил олдсонгүй"],
      professions: professions.length > 0 ? professions : ["Мэргэжил олдсонгүй"],
      workTypes: workTypes.length > 0 ? workTypes : ["Бүтэн цаг", "Хагас цаг"],
      workConditions: workConditions.length > 0 ? workConditions : ["Уурхай", "Оффис"],
      experiences: experiences.length > 0 ? experiences : ["Туршлага шаардахгүй"]
    };
  }, [vacancies]);

  // Count how many jobs are in each filter category
  const getFilterCount = (field: string, value: string): number => {
    return vacancies.filter(vacancy => vacancy[field] === value).length;
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Ажлын байр хайх..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Profession Filter */}
        <Select value={filters.profession} onValueChange={(value) => onFilterChange("profession", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Мэргэжил" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Бүх мэргэжил ({vacancies.length})
            </SelectItem>
            {filterOptions.professions.map((profession) => (
              <SelectItem key={profession} value={profession}>
                {profession} ({getFilterCount('profession', profession)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter - Now with real data */}
        <Select value={filters.location} onValueChange={(value) => onFilterChange("location", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Байршил" />
            {isLoading && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Бүх байршил ({vacancies.length})
            </SelectItem>
            {filterOptions.locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location} ({getFilterCount('location', location)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Work Type Filter */}
        <Select value={filters.workType} onValueChange={(value) => onFilterChange("workType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Ажлын цаг" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Бүх төрөл ({vacancies.length})
            </SelectItem>
            {filterOptions.workTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type} ({getFilterCount('workType', type)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Work Condition Filter */}
        <Select value={filters.workCondition} onValueChange={(value) => onFilterChange("workCondition", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Ажлын нөхцөл" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Бүх нөхцөл ({vacancies.length})
            </SelectItem>
            {filterOptions.workConditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition} ({getFilterCount('workCondition', condition)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Experience Filter and Clear Button */}
        <div className="flex gap-2">
          <Select value={filters.experience} onValueChange={(value) => onFilterChange("experience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Туршлага" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                Бүх туршлага ({vacancies.length})
              </SelectItem>
              {filterOptions.experiences.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp} ({getFilterCount('experience', exp)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onClearFilters}
            title="Шүүлтүүрийг арилгах"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Filter Summary */}
      {(filters.search || filters.profession !== 'all' || filters.location !== 'all' || 
        filters.workType !== 'all' || filters.workCondition !== 'all' || filters.experience !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                Хайлт: "{filters.search}"
                <button 
                  onClick={() => onFilterChange("search", "")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.profession !== 'all' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {filters.profession}
                <button 
                  onClick={() => onFilterChange("profession", "all")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.location !== 'all' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {filters.location}
                <button 
                  onClick={() => onFilterChange("location", "all")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.workType !== 'all' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {filters.workType}
                <button 
                  onClick={() => onFilterChange("workType", "all")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.workCondition !== 'all' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {filters.workCondition}
                <button 
                  onClick={() => onFilterChange("workCondition", "all")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.experience !== 'all' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {filters.experience}
                <button 
                  onClick={() => onFilterChange("experience", "all")}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter;