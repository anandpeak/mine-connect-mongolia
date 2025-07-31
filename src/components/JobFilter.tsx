import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

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
  const professions = [
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
  ];

  const locations = [
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
  ];

  const workTypes = ["Бүтэн цаг", "Хагас цаг"];
  const workConditions = ["Уурхай", "Оффис", "Зайнаас"];
  const experiences = ["Туршлага шаардахгүй", "1-2 жил", "3-5 жил", "5+ жил"];

  return (
    <div className="bg-white p-4 rounded-lg border border-border shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Ажлын байр хайх..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filters.profession} onValueChange={(value) => onFilterChange("profession", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Мэргэжил" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх мэргэжил</SelectItem>
            {professions.map((profession) => (
              <SelectItem key={profession} value={profession}>
                {profession}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(value) => onFilterChange("location", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Байршил" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх байршил</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.workType} onValueChange={(value) => onFilterChange("workType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Ажлын цаг" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх төрөл</SelectItem>
            {workTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.workCondition} onValueChange={(value) => onFilterChange("workCondition", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Ажлын нөхцөл" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх нөхцөл</SelectItem>
            {workConditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Select value={filters.experience} onValueChange={(value) => onFilterChange("experience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Туршлага" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх туршлага</SelectItem>
              {experiences.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onClearFilters}
            title="Шүүлтүүрийг арилгах"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;