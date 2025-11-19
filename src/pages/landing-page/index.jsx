import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedRoutes from './components/FeaturedRoutes';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';
import { useTranslation } from '../../hooks/useTranslation';

const LandingPage = () => {
  const { currentLanguage } = useTranslation();

  const pageTitle = {
    en: "BusBooker Pro - Book Bus Tickets Online | Comfortable Travel",
    es: "BusBooker Pro - Reserva Boletos de Autobús en Línea | Viaje Cómodo",
    fr: "BusBooker Pro - Réservez des Billets de Bus en Ligne | Voyage Confortable",
    de: "BusBooker Pro - Bustickets Online Buchen | Komfortables Reisen",
    zh: "BusBooker Pro - 在线预订巴士票 | 舒适旅行",
    ar: "BusBooker Pro - احجز تذاكر الحافلة عبر الإنترنت | سفر مريح"
  };

  const pageDescription = {
    en: "Book bus tickets online with BusBooker Pro. Compare prices, choose your seats, and travel comfortably to 500+ destinations. Multi-language support available.",
    es: "Reserve boletos de autobús en línea con BusBooker Pro. Compare precios, elija sus asientos y viaje cómodamente a más de 500 destinos. Soporte multiidioma disponible.",
    fr: "Réservez des billets de bus en ligne avec BusBooker Pro. Comparez les prix, choisissez vos sièges et voyagez confortablement vers plus de 500 destinations. Support multilingue disponible.",
    de: "Buchen Sie Bustickets online mit BusBooker Pro. Vergleichen Sie Preise, wählen Sie Ihre Plätze und reisen Sie bequem zu über 500 Zielen. Mehrsprachiger Support verfügbar.",
    zh: "使用BusBooker Pro在线预订巴士票。比较价格，选择座位，舒适地前往500多个目的地。提供多语言支持。",
    ar: "احجز تذاكر الحافلة عبر الإنترنت مع BusBooker Pro. قارن الأسعار، اختر مقاعدك، وسافر براحة إلى أكثر من 500 وجهة. دعم متعدد اللغات متاح."
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle?.[currentLanguage] || pageTitle?.en}</title>
        <meta name="description" content={pageDescription?.[currentLanguage] || pageDescription?.en} />
        <meta name="keywords" content="bus booking, online tickets, travel, transportation, multi-language" />
        <meta property="og:title" content={pageTitle?.[currentLanguage] || pageTitle?.en} />
        <meta property="og:description" content={pageDescription?.[currentLanguage] || pageDescription?.en} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://busbookerpro.com/landing-page" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section with Search Widget */}
          <HeroSection />

          {/* Featured Routes */}
          <FeaturedRoutes currentLanguage={currentLanguage} />

          {/* Trust Signals */}
          <TrustSignals currentLanguage={currentLanguage} />
        </main>

        {/* Footer */}
        <Footer currentLanguage={currentLanguage} />
      </div>
    </>
  );
};

export default LandingPage;