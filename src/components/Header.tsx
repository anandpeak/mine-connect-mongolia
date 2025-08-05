// src/components/Header.tsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { path: "/", label: "Ажлын байр" },
    { path: "/companies", label: "Компаниуд" },
    { path: "#profile", label: "Миний анкет", requiresAuth: true },
  ];

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAuthDialog(true);
    setStep('phone');
    setPhoneNumber('');
    setOtpCode('');
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      toast({
        title: "Алдаа",
        description: "Зөв утасны дугаар оруулна уу",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    try {
      // For testing purposes - your phone number
      if (phoneNumber === '80019922') {
        setTimeout(() => {
          setStep('otp');
          setIsLoading(false);
          toast({
            title: "OTP илгээгдлээ",
            description: `${phoneNumber} дугаарт баталгаажуулах код илгээгдлээ`,
          });
        }, 500);
      } else {
        // For other phone numbers
        setTimeout(() => {
          setStep('otp');
          setIsLoading(false);
          toast({
            title: "OTP илгээгдлээ",
            description: `${phoneNumber} дугаарт баталгаажуулах код илгээгдлээ`,
          });
        }, 1000);
      }
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Алдаа",
        description: "OTP илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
        variant: "destructive"
      });
    }
  };

  const handleOTPSubmit = async () => {
    if (!otpCode || otpCode.length !== 4) {
      toast({
        title: "Алдаа",
        description: "4 оронтой баталгаажуулах кодыг оруулна уу",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Special handling for your phone number with OTP 1234
      if (phoneNumber === '80019922' && otpCode === '1234') {
        setTimeout(() => {
          setIsLoading(false);
          setShowAuthDialog(false);
          navigate('/profile');
          toast({
            title: "Амжилттай нэвтэрлээ",
            description: "Таны анкет ачааллагдлаа",
          });
        }, 500);
        return;
      }

      // For other phone numbers, simulate checking if user exists
      setTimeout(() => {
        setIsLoading(false);
        
        // Simulate random user existence (50% chance for demo)
        const userExists = Math.random() > 0.5;
        
        if (userExists) {
          // User exists, go to profile page
          setShowAuthDialog(false);
          navigate('/profile');
          toast({
            title: "Амжилттай нэвтэрлээ",
            description: "Таны анкет ачааллагдлаа",
          });
        } else {
          // User doesn't exist, redirect to registration
          setShowAuthDialog(false);
          window.open('https://burtgel.uurkhaichin.mn', '_blank');
          toast({
            title: "Анкет олдсонгүй",
            description: "Бүртгэл үүсгэхийн тулд burtgel.uurkhaichin.mn сайтад очоо уу",
          });
        }
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Алдаа",
        description: "Баталгаажуулах кодыг шалгахад алдаа гарлаа",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/uurkhaichin-logo-black.svg" 
                alt="Uurkhaichin.mn Logo" 
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  // Fallback to a simple mining icon if logo fails to load
                  console.log('Logo failed to load, using fallback');
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback icon (hidden by default) */}
              <div className="w-32 h-32 bg-primary rounded flex items-center justify-center hidden">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
                  <path d="M11 3 8 9l4 13 4-13-3-6"/>
                  <path d="M2 9h20"/>
                </svg>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-6">
              {navItems.map((item) => {
                if (item.requiresAuth) {
                  return (
                    <button
                      key={item.path}
                      onClick={handleProfileClick}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                        "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === item.path
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {step === 'phone' ? 'Нэвтрэх' : 'Баталгаажуулах код'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Утасны дугаар</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="80019922"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-center"
                  />
                  <p className="text-sm text-muted-foreground">
                    Утасны дугаараа оруулбал баталгаажуулах код илгээх болно
                  </p>
                  {phoneNumber === '80019922' && (
                    <p className="text-sm text-green-600 font-medium">
                      Тест дугаар: OTP код 1234
                    </p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handlePhoneSubmit}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Илгээж байна..." : "OTP илгээх"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAuthDialog(false)}
                    disabled={isLoading}
                  >
                    Цуцлах
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Баталгаажуулах код</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="0000"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="text-center text-2xl font-mono tracking-widest"
                    maxLength={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    {phoneNumber} дугаарт илгээсэн 4 оронтой кодыг оруулна уу
                  </p>
                  {phoneNumber === '80019922' && (
                    <p className="text-sm text-green-600 font-medium">
                      Тест код: 1234
                    </p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleOTPSubmit}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Шалгаж байна..." : "Баталгаажуулах"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('phone')}
                    disabled={isLoading}
                  >
                    Буцах
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;