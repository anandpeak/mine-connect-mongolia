import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Briefcase, GraduationCap, Award, Phone, Mail, MapPin } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Миний хувь хэрэг</h1>
          <p className="text-muted-foreground">
            Өөрийн мэдээллийг засварлаж, CV-гаа бүтээнэ үү
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Хувийн мэдээлэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Нэр</Label>
                  <Input id="name" placeholder="Таны нэр" />
                </div>
                <div>
                  <Label htmlFor="phone">Утасны дугаар</Label>
                  <Input id="phone" placeholder="+976-xxxx-xxxx" />
                </div>
                <div>
                  <Label htmlFor="email">И-мэйл</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="location">Байршил</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Аймаг сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                      <SelectItem value="dornogovi">Дорноговь</SelectItem>
                      <SelectItem value="omnogovi">Өмнөговь</SelectItem>
                      <SelectItem value="bayanhongor">Баянхонгор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Нас</Label>
                  <Input id="age" type="number" placeholder="25" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Ажлын туршлага
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profession">Мэргэжил</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Мэргэжил сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miner">Уурхайчин</SelectItem>
                        <SelectItem value="operator">Машин механизмын оператор</SelectItem>
                        <SelectItem value="engineer">Инженер</SelectItem>
                        <SelectItem value="technician">Техникч</SelectItem>
                        <SelectItem value="electrician">Цахилгаанчин</SelectItem>
                        <SelectItem value="welder">Ган гагнуурчин</SelectItem>
                        <SelectItem value="driver">Тээврийн хэрэгслийн жолооч</SelectItem>
                        <SelectItem value="safety">Аюулгүй байдлын мэргэжилтэн</SelectItem>
                        <SelectItem value="geologist">Геологич</SelectItem>
                        <SelectItem value="lab">Лабораторийн ажилтан</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Туршлага</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Туршлага сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Туршлага шаардахгүй</SelectItem>
                        <SelectItem value="1-2">1-2 жил</SelectItem>
                        <SelectItem value="3-5">3-5 жил</SelectItem>
                        <SelectItem value="5+">5+ жил</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="work-description">Ажлын дэлгэрэнгүй</Label>
                  <Textarea 
                    id="work-description" 
                    placeholder="Таны ажлын туршлага, хийж байсан ажлуудын тухай..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Боловсрол
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education-level">Боловсролын түвшин</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Боловсрол сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">Дунд боловсрол</SelectItem>
                        <SelectItem value="technical">Техник, мэргэжлийн</SelectItem>
                        <SelectItem value="bachelor">Бакалавр</SelectItem>
                        <SelectItem value="master">Магистр</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school">Боловсролын байгууллага</Label>
                    <Input id="school" placeholder="Сургууль, коллеж, их сургууль" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="field-of-study">Мэргэжлийн чиглэл</Label>
                  <Input id="field-of-study" placeholder="Судалсан мэргэжил" />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Ур чадвар & Гэрчилгээ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Ур чадвар</Label>
                  <Textarea 
                    id="skills" 
                    placeholder="Таны ур чадвар, мэдлэг (жишээ: Экскаватор удирдах, AutoCAD, аюулгүй байдлын сургалт)"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="certificates">Гэрчилгээ, лиценз</Label>
                  <Textarea 
                    id="certificates" 
                    placeholder="Таны авсан гэрчилгээ, лиценз, сертификатууд"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="languages">Хэл мэдлэг</Label>
                  <Input id="languages" placeholder="Монгол (эх хэл), Англи (дунд түвшин)" />
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Нэмэлт мэдээлэл</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="availability">Ажиллахад бэлэн байдал</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Тэр даруй</SelectItem>
                      <SelectItem value="1-month">1 сарын дотор</SelectItem>
                      <SelectItem value="negotiable">Ярилцах боломжтой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="willing-to-relocate">Нүүж ажиллах бэлэн байдал</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Тийм</SelectItem>
                      <SelectItem value="no">Үгүй</SelectItem>
                      <SelectItem value="depends">Нөхцөлөөс хамаарч</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="additional-info">Бусад мэдээлэл</Label>
                  <Textarea 
                    id="additional-info" 
                    placeholder="Таны талаар нэмж хэлэх зүйл байвал..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1">CV хадгалах</Button>
              <Button variant="outline" className="flex-1">PDF татах</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;