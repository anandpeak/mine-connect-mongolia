// src/components/JobFilter.tsx
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, ArrowUpDown } from "lucide-react";
import { useVacancies } from "@/hooks/useVacancies";

interface JobFilterProps {
  filters: {
    search: string;
    profession: string;
    location: string;
    workType: string;
    sortBy: string; // New sort filter
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
        workTypes: ["Бүтэн цаг", "Хагас цаг"]
      };
    }

    // Extract unique values from real API data
    const locations = [...new Set(vacancies.map(v => v.location).filter(l => l && l !== 'Тодорхойгүй байршил'))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const professions = [...new Set(vacancies.map(v => v.profession).filter(p => p && p !== 'Бусад'))]
      .sort((a, b) => a.localeCompare(b, 'mn'));
    
    const workTypes = [...new Set(vacancies.map(v => v.workType).filter(w => w))]
      .sort((a, b) => a.localeCompare(b, 'mn'));

    return {
      locations: locations.length > 0 ? locations : ["Байршил олдсонгүй"],
      professions: professions.length > 0 ? professions : ["Мэргэжил олдсонгүй"],
      workTypes: workTypes.length > 0 ? workTypes : ["Бүтэн цаг", "Хагас цаг"]
    };
  }, [vacancies]);

  // Count how many jobs are in each filter category
  const getFilterCount = (field: string, value: string): number => {
    return vacancies.filter(vacancy => vacancy[field] === value).length;
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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

        {/* Location Filter */}
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

        {/* Sort By Filter - NEW */}
        <div className="flex gap-2">
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange("sortBy", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Эрэмбэлэх" />
              <ArrowUpDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Шинэ эхэндээ</SelectItem>
              <SelectItem value="oldest">Хуучин эхэндээ</SelectItem>
              <SelectItem value="salary-high">Цалин өндрөөс доош</SelectItem>
              <SelectItem value="salary-low">Цалин доороос дээш</SelectItem>
              <SelectItem value="company">Компаниар</SelectItem>
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
        filters.workType !== 'all' || filters.sortBy !== 'newest') && (
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
            {filters.sortBy !== 'newest' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                Эрэмбэ: {
                  filters.sortBy === 'oldest' ? 'Хуучин эхэндээ' :
                  filters.sortBy === 'salary-high' ? 'Цалин өндрөөс доош' :
                  filters.sortBy === 'salary-low' ? 'Цалин доороос дээш' :
                  filters.sortBy === 'company' ? 'Компаниар' : filters.sortBy
                }
                <button 
                  onClick={() => onFilterChange("sortBy", "newest")}
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