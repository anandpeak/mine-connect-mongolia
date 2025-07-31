import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import JobFilter from "@/components/JobFilter";

// Mock data for jobs
const mockJobs = [
  {
    id: "1",
    title: "Уурхайн оператор",
    company: "Оюу Толгой",
    location: "Өмнөговь",
    workType: "Бүтэн цаг",
    roster: "2/1 (2 долоо хоног ажил, 1 долоо хоног амралт)",
    experience: "3-5 жил",
    profession: "Уурхайчин",
    workCondition: "Уурхай",
    responsibilities: "Уурхайн тоног төхөөрөмжийг удирдах, аюулгүй байдлын дүрмийг дагаж мөрдөх, өдөр тутмын тайланг хөтлөх",
    requirements: "Техникийн дээд боловсрол, уурхайн талаарх мэдлэг, багаар ажиллах чадвар",
    additionalInfo: "Компанийн автобусаар тээвэрлэх, хоол хүнсээр хангах",
    phone: "+976-88776655",
    salary: "2,500,000₮",
    supply: "Хоол хүнс, байр"
  },
  {
    id: "2", 
    title: "Машин механизмын засварчин",
    company: "Эрдэнэс Монгол",
    location: "Дорноговь",
    workType: "Бүтэн цаг",
    roster: "3/1 (3 долоо хоног ажил, 1 долоо хоног амралт)",
    experience: "1-2 жил",
    profession: "Техникч",
    workCondition: "Уурхай",
    responsibilities: "Уурхайн машин механизмын засвар үйлчилгээ, урьдчилан сэргийлэх засвар",
    requirements: "Машин механизмын мэргэжлийн боловсрол, туршлага",
    additionalInfo: "Ажлын хувцас, хамгаалалтын хэрэгслээр хангах",
    phone: "+976-99887766",
    salary: "2,200,000₮"
  },
  {
    id: "3",
    title: "Аюулгүй байдлын инженер",
    company: "Монгол Алт",
    location: "Баянхонгор",
    workType: "Бүтэн цаг", 
    roster: "Өдөр тутмын (5/2)",
    experience: "5+ жил",
    profession: "Инженер",
    workCondition: "Оффис",
    responsibilities: "Аюулгүй байдлын стандартыг хэрэгжүүлэх, ажилчдад сургалт явуулах, аюулгүй байдлын тайлан бэлтгэх",
    requirements: "Аюулгүй байдлын инженерийн зэрэг, олон улсын сертификат",
    additionalInfo: "Компанийн машинтай",
    phone: "+976-77665544",
    salary: "3,000,000₮"
  },
  {
    id: "4",
    title: "Геологич",
    company: "Тавантолгой",
    location: "Өмнөговь",
    workType: "Бүтэн цаг",
    roster: "2/2 (2 долоо хоног ажил, 2 долоо хоног амралт)",
    experience: "3-5 жил",
    profession: "Геологич",
    workCondition: "Уурхай",
    responsibilities: "Геологийн судалгаа хийх, дээжийн шинжилгээ, геологийн тайлан бэлтгэх",
    requirements: "Геологийн боловсрол, далайн геологийн мэдлэг, багаар ажиллах чадвар",
    additionalInfo: "Онгоцоор тээвэрлэх, байртай",
    phone: "+976-88990011",
    salary: "2,800,000₮"
  }
];

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
    return mockJobs.filter(job => {
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
  }, [filters]);

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
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                Хайлтын шалгуурт тохирох ажлын байр олдсонгүй
              </p>
              <button 
                onClick={handleClearFilters}
                className="text-primary hover:underline mt-2"
              >
                Шүүлтүүрийг арилгах
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;