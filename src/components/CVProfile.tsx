// src/components/CVProfile.tsx
import React, { useState, useEffect } from "react";
import { Mail, Phone, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CVData {
  name: string;
  profession: string;
  experience: string;
  salary: string;
  salaryType: string;
  rouster: string;
  rousterType: string;
  certificat: boolean;
  company: string[];
  license: string[];
  equip: string[];
  skills: string[];
  detailed: string;
  phone: string;
  email: string;
}

const CVProfile = () => {
  const { toast } = useToast();
  
  // Get user authentication status
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
  const userPhone = localStorage.getItem('userPhone') || '';

  // Sample CV data - in real app, this would come from API based on authenticated user
  const [cvData, setCvData] = useState<CVData>({
    name: "Хүрэлбаатар Бат-Орших",
    profession: "Машин механизмын оператор",
    experience: "3-5 жил",
    salary: "₮ 100К-150К",
    salaryType: "өдөрт",
    rouster: "14/14",
    rousterType: "Амралтаар",
    certificat: true,
    company: ["Хан-Алтай ХХК", "Оюу-Толгой ХХК"],
    license: ["B", "C", "M"],
    equip: ["Экскаватор", "Ковш", "Дамп"],
    skills: [
      "Багийн ажиллагаа ба хамтын ажиллагаа",
      "Зөрчил зохицуулах",
      "Шинэ технологид дасан зохицох чадвар",
      "Аюулгүй ажиллагааг сахин мөрдөх",
    ],
    detailed: "Аюулгүй ажиллагааны сургалтуудад бүрэн хамрагдсан. Ямар нэгэн хорт зуршилүй, хариуцлагатай, цаг баримталдаг.",
    phone: userPhone || "+976 9999-9999",
    email: "khurel@gmail.com"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<CVData>({ ...cvData });
  const height = window.innerHeight - 150;

  // Load CV data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      // In real app, you would fetch CV data from API here
      // For now, we'll use the sample data with the user's phone number
      setCvData(prev => ({
        ...prev,
        phone: userPhone || prev.phone
      }));
    }
  }, [isAuthenticated, userPhone]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...cvData });
  };

  const handleSave = () => {
    setCvData({ ...editData });
    setIsEditing(false);
    
    // In real app, you would save to API here
    // localStorage.setItem('cvData', JSON.stringify(editData));
    
    toast({
      title: "Амжилттай хадгалагдлаа",
      description: "Таны CV мэдээлэл шинэчлэгдлээ",
    });
  };

  const handleCancel = () => {
    setEditData({ ...cvData });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof CVData, value: string | boolean) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof CVData, index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof CVData) => {
    setEditData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (field: keyof CVData, index: number) => {
    setEditData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  // Show message if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="pt-11 w-[95%] m-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              Анкет харахын тулд нэвтэрнэ үү
            </h2>
            <p className="text-gray-500">
              "Миний анкет" цэсийг дарж нэвтэрнэ үү
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-11 w-[80%] max-w-4xl m-auto">
      <div className="flex items-center justify-between mb-10">
        <p className="text-[22px] text-[#222]">Миний анкет</p>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-[#324D72] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a3d5c] transition-colors"
            >
              <Edit size={16} />
              Засах
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Хадгалах
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Цуцлах
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{ height: `${height}px` }}
        className="w-full bg-[#fff] rounded-xl py-6 px-8 overflow-y-scroll shadow-lg"
      >
        {/* Header Section */}
        <div className="mb-[56px]">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Овог нэр</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Мэргэжил</label>
                <input
                  type="text"
                  value={editData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-[#1E293B] text-[20px] font-semibold mb-2">
                {cvData.name}
              </p>
              {cvData.certificat && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M3.45455 10L2.59091 8.47619L0.954545 8.09524L1.11364 6.33333L0 5L1.11364 3.66667L0.954545 1.90476L2.59091 1.52381L3.45455 0L5 0.690476L6.54545 0L7.40909 1.52381L9.04545 1.90476L8.88636 3.66667L10 5L8.88636 6.33333L9.04545 8.09524L7.40909 8.47619L6.54545 10L5 9.30952L3.45455 10ZM4.52273 6.69048L7.09091 4L6.45455 3.30952L4.52273 5.33333L3.54545 4.33333L2.90909 5L4.52273 6.69048Z"
                      fill="#F88F00"
                    />
                  </svg>
                  <p className="text-[#636466] text-xs">
                    мэргэжлийн сертификаттай
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Experience and Skills Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-[40%]">
            <div className="flex items-center gap-4">
              <p className="text-[#324D72] text-sm font-semibold">
                Ажлын туршлага
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="p-1 border border-gray-300 rounded text-sm"
                />
              ) : (
                <p className="text-[#324D72] text-sm font-semibold">
                  {cvData.experience}
                </p>
              )}
            </div>
            <hr className="bg-[#E5E6E8] my-3" />
            {isEditing ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Компани</label>
                {editData.company.map((comp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={comp}
                      onChange={(e) => handleArrayChange('company', index, e.target.value)}
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    />
                    <button
                      onClick={() => removeArrayItem('company', index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('company')}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                >
                  + Нэмэх
                </button>
              </div>
            ) : (
              <ul className="text-[#1E293B] text-xs list-disc ms-8">
                {cvData.company?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="w-[2px] bg-[#E5E6E8] h-auto min-h-[100px]" />
          
          <div className="w-[40%]">
            <div className="flex items-center gap-4">
              <p className="text-[#324D72] text-sm font-semibold">
                Мэргэшил
              </p>
            </div>
            <hr className="bg-[#E5E6E8] my-3" />
            
            {/* License Section */}
            {cvData?.license?.length > 0 && (
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center gap-1 text-xs text-[#1E293B]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="2"
                    viewBox="0 0 3 2"
                    fill="none"
                  >
                    <circle cx="1.5" cy="1" r="1" fill="#676767" />
                  </svg>
                  Жолооны үнэмлэх
                </p>
                {isEditing ? (
                  <div className="space-y-1">
                    {editData.license.map((lic, index) => (
                      <div key={index} className="flex gap-1">
                        <input
                          type="text"
                          value={lic}
                          onChange={(e) => handleArrayChange('license', index, e.target.value)}
                          className="w-8 p-1 border border-gray-300 rounded text-xs"
                        />
                        <button
                          onClick={() => removeArrayItem('license', index)}
                          className="px-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('license')}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-[#636466]">
                    {cvData?.license?.map(
                      (item, index) =>
                        `${item}${
                          index + 1 === cvData.license.length ? "" : ", "
                        }`
                    )}
                  </p>
                )}
              </div>
            )}
            
            {/* Equipment Section */}
            <p className="flex items-center gap-1 text-xs text-[#1E293B] mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3"
                height="2"
                viewBox="0 0 3 2"
                fill="none"
              >
                <circle cx="1.5" cy="1" r="1" fill="#676767" />
              </svg>
              Ажилладаг тоног төхөөрөмж
            </p>
            {isEditing ? (
              <div className="space-y-2">
                {editData.equip.map((eq, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={eq}
                      onChange={(e) => handleArrayChange('equip', index, e.target.value)}
                      className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    />
                    <button
                      onClick={() => removeArrayItem('equip', index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('equip')}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                >
                  + Нэмэх
                </button>
              </div>
            ) : (
              <ul className="text-[#1E293B] text-xs list-disc ms-8">
                {cvData.equip?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-6">
          <p className="font-semibold text-[#324D72] text-sm">Хүсэлт</p>
          <hr className="bg-[#E5E6E8] my-3" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#1E293B]">Ажиллахыг хүсч буй цаг:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.rousterType}
                  onChange={(e) => handleInputChange('rousterType', e.target.value)}
                  className="p-1 border border-gray-300 rounded text-xs"
                />
              ) : (
                <p className="text-xs font-light">{cvData.rousterType}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#1E293B]">Ажиллахыг хүсч буй хоног:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.rouster}
                  onChange={(e) => handleInputChange('rouster', e.target.value)}
                  className="p-1 border border-gray-300 rounded text-xs"
                />
              ) : (
                <p className="text-xs font-light">{cvData.rouster}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#1E293B]">Цалингийн хүлээлт:</p>
              {isEditing ? (
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={editData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-xs w-20"
                  />
                  <input
                    type="text"
                    value={editData.salaryType}
                    onChange={(e) => handleInputChange('salaryType', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-xs w-16"
                  />
                </div>
              ) : (
                <p className="text-xs font-light">
                  {cvData.salary} / {cvData.salaryType}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <p className="text-sm text-[#1E293B] font-semibold">
            Хувь хүний ур чадварууд
          </p>
          <hr className="bg-[#E5E6E8] my-3" />
          {isEditing ? (
            <div className="space-y-2">
              {editData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                  />
                  <button
                    onClick={() => removeArrayItem('skills', index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('skills')}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                + Нэмэх
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {cvData.skills?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F9F9F9] rounded-md text-[#636466] text-xs py-[4px] px-[6px]"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <p className="text-sm text-[#1E293B] font-semibold">
            Нэмэлт мэдээлэл
          </p>
          <hr className="bg-[#E5E6E8] my-3" />
          {isEditing ? (
            <textarea
              value={editData.detailed}
              onChange={(e) => handleInputChange('detailed', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-xs min-h-[60px]"
              placeholder="Нэмэлт мэдээлэл оруулна уу..."
            />
          ) : (
            <p className="text-[#636466] text-xs">
              {cvData.detailed}
            </p>
          )}
        </div>

        {/* Certificate Section */}
        {cvData.certificat && (
          <div className="mb-6">
            <p className="text-sm text-[#1E293B] font-semibold">
              Мэргэжлийн сертификат
            </p>
            <hr className="bg-[#E5E6E8] my-3" />
            <div className="w-[255px] h-[141px] border border-[#E5E6E8] rounded-xl bg-gray-50 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Сертификатын зураг</p>
            </div>
            {isEditing && (
              <div className="mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.certificat}
                    onChange={(e) => handleInputChange('certificat', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs">Мэргэжлийн сертификаттай</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Contact Information */}
        <div>
          <div className="flex items-center w-full mb-4">
            <div className="w-[20px] border-t border-gray-300"></div>
            <span className="mx-4 text-sm font-medium text-[#324D72]">
              Холбоо барих
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="border border-[#EFEFEF] w-[48px] h-[48px] rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 font-semibold text-lg">
                  {cvData.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#324d72] font-semibold">
                  {cvData.name}
                </p>
                <p className="text-[10px] text-[#64748B]">
                  {cvData.profession}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#3d4146] text-xs mb-1">
                <Phone size={14} />
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-xs w-32"
                  />
                ) : (
                  <p>{cvData.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-[#1E293B] text-xs">
                <Mail size={14} />
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-xs w-40"
                  />
                ) : (
                  <p>{cvData.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVProfile;