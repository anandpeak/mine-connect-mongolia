import React from 'react';

const Stats = () => {
  const stats = [
    { number: "5,000+", label: "Ажилтай холбогдсон" },
    { number: "500+", label: "Бүртгэлтэй компани" },
    { number: "95%", label: "Амжилттай ажилд орох" },
    { number: "24/7", label: "Дэмжлэг үйлчилгээ" }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Тэргүүлэгч компаниудын итгэлийг хүлээсэн
          </h2>
          <p className="text-xl text-muted-foreground">
            Монголын уул уурхайн салбарын хамгийн том платформ
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;