import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = ({ currentLanguage }) => {
  const translations = {
    en: {
      title: "Trusted by Millions",
      subtitle: "Join millions of satisfied travelers who choose us for their bus journeys",
      securityTitle: "Your Safety is Our Priority",
      securityDesc: "Advanced security measures and verified operators",
      testimonialsTitle: "What Our Customers Say",
      ratingsTitle: "Excellent Service Rating"
    },
    es: {
      title: "Confiado por Millones",
      subtitle: "Únete a millones de viajeros satisfechos que nos eligen para sus viajes en autobús",
      securityTitle: "Tu Seguridad es Nuestra Prioridad",
      securityDesc: "Medidas de seguridad avanzadas y operadores verificados",
      testimonialsTitle: "Lo que Dicen Nuestros Clientes",
      ratingsTitle: "Excelente Calificación de Servicio"
    },
    fr: {
      title: "Approuvé par des Millions",
      subtitle: "Rejoignez des millions de voyageurs satisfaits qui nous choisissent pour leurs voyages en bus",
      securityTitle: "Votre Sécurité est Notre Priorité",
      securityDesc: "Mesures de sécurité avancées et opérateurs vérifiés",
      testimonialsTitle: "Ce que Disent Nos Clients",
      ratingsTitle: "Excellente Note de Service"
    },
    de: {
      title: "Von Millionen Vertraut",
      subtitle: "Schließen Sie sich Millionen zufriedener Reisender an, die uns für ihre Busreisen wählen",
      securityTitle: "Ihre Sicherheit ist Unsere Priorität",
      securityDesc: "Erweiterte Sicherheitsmaßnahmen und verifizierte Betreiber",
      testimonialsTitle: "Was Unsere Kunden Sagen",
      ratingsTitle: "Ausgezeichnete Service-Bewertung"
    },
    zh: {
      title: "数百万人的信赖",
      subtitle: "加入数百万满意的旅客，选择我们的巴士旅程",
      securityTitle: "您的安全是我们的首要任务",
      securityDesc: "先进的安全措施和经过验证的运营商",
      testimonialsTitle: "客户评价",
      ratingsTitle: "优秀的服务评级"
    },
    ar: {
      title: "موثوق من قبل الملايين",
      subtitle: "انضم إلى ملايين المسافرين الراضين الذين يختاروننا لرحلاتهم بالحافلة",
      securityTitle: "سلامتك هي أولويتنا",
      securityDesc: "تدابير أمنية متقدمة ومشغلين معتمدين",
      testimonialsTitle: "ما يقوله عملاؤنا",
      ratingsTitle: "تقييم خدمة ممتاز"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const securityFeatures = [
  {
    icon: "Shield",
    title: "SSL Encryption",
    description: "256-bit SSL encryption for secure transactions"
  },
  {
    icon: "CheckCircle",
    title: "Verified Operators",
    description: "All bus operators are licensed and verified"
  },
  {
    icon: "Lock",
    title: "Secure Payments",
    description: "PCI DSS compliant payment processing"
  },
  {
    icon: "Users",
    title: "24/7 Support",
    description: "Round-the-clock customer assistance"
  }];


  const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "Excellent service! The booking process was smooth and the bus was comfortable and on time.",
    avatar: "https://images.unsplash.com/photo-1683203438694-b428d712b8da",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling at camera"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    location: "Los Angeles, USA",
    rating: 5,
    comment: "I\'ve been using this service for years. Always reliable and great customer support.",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of Hispanic man with dark hair in navy suit"
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "San Francisco, USA",
    rating: 4,
    comment: "Great value for money. The multi-language support made booking so much easier for my family.",
    avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    avatarAlt: "Professional headshot of Asian woman with long black hair in white blouse"
  }];


  const stats = [
  {
    number: "2M+",
    label: "Happy Travelers",
    icon: "Users"
  },
  {
    number: "500+",
    label: "Routes Available",
    icon: "MapPin"
  },
  {
    number: "99.9%",
    label: "On-Time Performance",
    icon: "Clock"
  },
  {
    number: "4.8/5",
    label: "Customer Rating",
    icon: "Star"
  }];


  const paymentMethods = [
  {
    name: "Visa",
    logo: "https://images.unsplash.com/photo-1609429019995-8c40f49535a5",
    alt: "Visa credit card payment method logo"
  },
  {
    name: "Mastercard",
    logo: "https://images.unsplash.com/photo-1683313041281-c2fa5f195608",
    alt: "Mastercard credit card payment method logo"
  },
  {
    name: "PayPal",
    logo: "https://images.unsplash.com/photo-1706879349461-1fdfb4f7d519",
    alt: "PayPal digital payment method logo"
  },
  {
    name: "Apple Pay",
    logo: "https://images.unsplash.com/photo-1649734924649-b559375080b0",
    alt: "Apple Pay mobile payment method logo"
  }];


  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t?.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat?.number}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          )}
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t?.securityTitle}</h3>
            <p className="text-muted-foreground">{t?.securityDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures?.map((feature, index) =>
            <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={20} className="text-success" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature?.title}</h4>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t?.testimonialsTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial) =>
            <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover mr-4" />

                  <div>
                    <div className="font-semibold text-foreground">{testimonial?.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial?.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(5)]?.map((_, i) =>
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < testimonial?.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />

                )}
                </div>
                
                <p className="text-muted-foreground text-sm italic">"{testimonial?.comment}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Secure Payment Methods</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {paymentMethods?.map((method, index) =>
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                src={method?.logo}
                alt={method?.alt}
                className="h-8 w-auto object-contain" />

              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustSignals;