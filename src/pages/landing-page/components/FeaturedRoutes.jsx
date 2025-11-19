import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedRoutes = ({ currentLanguage }) => {
  const translations = {
    en: {
      title: "Popular Routes",
      subtitle: "Discover our most traveled destinations",
      from: "From",
      starting: "Starting from",
      bookNow: "Book Now",
      operators: "operators",
      duration: "Duration",
      frequency: "Daily trips"
    },
    es: {
      title: "Rutas Populares",
      subtitle: "Descubre nuestros destinos más viajados",
      from: "Desde",
      starting: "Desde",
      bookNow: "Reservar Ahora",
      operators: "operadores",
      duration: "Duración",
      frequency: "Viajes diarios"
    },
    fr: {
      title: "Routes Populaires",
      subtitle: "Découvrez nos destinations les plus fréquentées",
      from: "De",
      starting: "À partir de",
      bookNow: "Réserver Maintenant",
      operators: "opérateurs",
      duration: "Durée",
      frequency: "Voyages quotidiens"
    },
    de: {
      title: "Beliebte Routen",
      subtitle: "Entdecken Sie unsere meistbereisten Ziele",
      from: "Von",
      starting: "Ab",
      bookNow: "Jetzt Buchen",
      operators: "Betreiber",
      duration: "Dauer",
      frequency: "Tägliche Fahrten"
    },
    zh: {
      title: "热门路线",
      subtitle: "探索我们最受欢迎的目的地",
      from: "从",
      starting: "起价",
      bookNow: "立即预订",
      operators: "运营商",
      duration: "时长",
      frequency: "每日班次"
    },
    ar: {
      title: "الطرق الشائعة",
      subtitle: "اكتشف وجهاتنا الأكثر سفراً",
      from: "من",
      starting: "ابتداءً من",
      bookNow: "احجز الآن",
      operators: "مشغلين",
      duration: "المدة",
      frequency: "رحلات يومية"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const featuredRoutes = [
  {
    id: 1,
    from: "New York",
    to: "Washington DC",
    price: "$45",
    duration: "4h 30m",
    operators: 8,
    frequency: 24,
    image: "https://images.unsplash.com/photo-1655455303460-0db251721fa1",
    imageAlt: "Modern city skyline with tall skyscrapers and busy streets during golden hour",
    discount: "20% OFF"
  },
  {
    id: 2,
    from: "Los Angeles",
    to: "San Francisco",
    price: "$65",
    duration: "6h 45m",
    operators: 12,
    frequency: 18,
    image: "https://images.unsplash.com/photo-1537003526950-390b2936c06b",
    imageAlt: "Golden Gate Bridge spanning across San Francisco Bay with fog rolling in",
    popular: true
  },
  {
    id: 3,
    from: "Chicago",
    to: "Detroit",
    price: "$38",
    duration: "5h 15m",
    operators: 6,
    frequency: 16,
    image: "https://images.unsplash.com/photo-1480793571234-2759ea58ba95",
    imageAlt: "Chicago downtown skyline with Willis Tower and Lake Michigan waterfront"
  },
  {
    id: 4,
    from: "Houston",
    to: "Austin",
    price: "$28",
    duration: "3h 20m",
    operators: 10,
    frequency: 22,
    image: "https://images.unsplash.com/photo-1586794000129-536f1bc43cca",
    imageAlt: "Austin Texas State Capitol building with downtown skyline in background"
  },
  {
    id: 5,
    from: "Miami",
    to: "Orlando",
    price: "$42",
    duration: "4h 10m",
    operators: 9,
    frequency: 20,
    image: "https://images.unsplash.com/photo-1712630710722-ab67bcf73640",
    imageAlt: "Orlando theme park castle with colorful fireworks display in evening sky"
  },
  {
    id: 6,
    from: "Boston",
    to: "New York",
    price: "$52",
    duration: "4h 45m",
    operators: 11,
    frequency: 26,
    image: "https://images.unsplash.com/photo-1700527340381-9ee8ad0e4410",
    imageAlt: "Boston harbor with historic buildings and modern skyscrapers reflecting in water"
  }];


  const handleBookRoute = (route) => {
    // Store route data and navigate to search with pre-filled data
    const searchData = {
      from: route?.from?.toLowerCase()?.replace(' ', '-'),
      to: route?.to?.toLowerCase()?.replace(' ', '-'),
      departureDate: new Date()?.toISOString()?.split('T')?.[0],
      passengers: 1
    };
    localStorage.setItem('busSearchData', JSON.stringify(searchData));
    console.log('Booking route:', route);
    alert(`Booking route from ${route?.from} to ${route?.to}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t?.subtitle}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRoutes?.map((route) =>
          <div
            key={route?.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">

              {/* Route Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                src={route?.image}
                alt={route?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {route?.discount &&
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold">
                      {route?.discount}
                    </span>
                }
                  {route?.popular &&
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold">
                      Popular
                    </span>
                }
                </div>

                {/* Route Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <div className="text-sm opacity-90">{t?.from}</div>
                      <div className="font-semibold">{route?.from}</div>
                    </div>
                    <Icon name="ArrowRight" size={20} className="opacity-75" />
                    <div className="text-right">
                      <div className="text-sm opacity-90">To</div>
                      <div className="font-semibold">{route?.to}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Details */}
              <div className="p-6">
                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">{route?.price}</div>
                    <div className="text-sm text-muted-foreground">{t?.starting}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{route?.duration}</div>
                    <div className="text-sm text-muted-foreground">{t?.duration}</div>
                  </div>
                </div>

                {/* Route Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Bus" size={16} />
                    <span>{route?.operators} {t?.operators}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{route?.frequency} {t?.frequency}</span>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                onClick={() => handleBookRoute(route)}
                variant="outline"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-300">

                  {t?.bookNow}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* View All Routes Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="MapPin"
            iconPosition="left"
            onClick={() => console.log('View all routes')}>

            View All Routes
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedRoutes;