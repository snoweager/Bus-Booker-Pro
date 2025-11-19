import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const Footer = ({ currentLanguage }) => {
  const translations = {
    en: {
      tagline: "Your trusted partner for comfortable bus travel",
      quickLinks: "Quick Links",
      support: "Support",
      company: "Company",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterDesc: "Subscribe to get updates on new routes and offers",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      copyright: "All rights reserved.",
      links: {
        searchBook: "Search & Book",
        myBookings: "My Bookings",
        support: "Help & Support",
        about: "About Us",
        careers: "Careers",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact Us"
      }
    },
    es: {
      tagline: "Tu socio de confianza para viajes cómodos en autobús",
      quickLinks: "Enlaces Rápidos",
      support: "Soporte",
      company: "Empresa",
      followUs: "Síguenos",
      newsletter: "Boletín",
      newsletterDesc: "Suscríbete para recibir actualizaciones sobre nuevas rutas y ofertas",
      emailPlaceholder: "Ingresa tu email",
      subscribe: "Suscribirse",
      copyright: "Todos los derechos reservados.",
      links: {
        searchBook: "Buscar y Reservar",
        myBookings: "Mis Reservas",
        support: "Ayuda y Soporte",
        about: "Acerca de Nosotros",
        careers: "Carreras",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        contact: "Contáctanos"
      }
    },
    fr: {
      tagline: "Votre partenaire de confiance pour les voyages en bus confortables",
      quickLinks: "Liens Rapides",
      support: "Support",
      company: "Entreprise",
      followUs: "Suivez-nous",
      newsletter: "Newsletter",
      newsletterDesc: "Abonnez-vous pour recevoir des mises à jour sur les nouvelles routes et offres",
      emailPlaceholder: "Entrez votre email",
      subscribe: "S\'abonner",
      copyright: "Tous droits réservés.",
      links: {
        searchBook: "Rechercher et Réserver",
        myBookings: "Mes Réservations",
        support: "Aide et Support",
        about: "À Propos",
        careers: "Carrières",
        privacy: "Politique de Confidentialité",
        terms: "Conditions de Service",
        contact: "Nous Contacter"
      }
    },
    de: {
      tagline: "Ihr vertrauensvoller Partner für komfortable Busreisen",
      quickLinks: "Schnelle Links",
      support: "Support",
      company: "Unternehmen",
      followUs: "Folgen Sie uns",
      newsletter: "Newsletter",
      newsletterDesc: "Abonnieren Sie Updates zu neuen Routen und Angeboten",
      emailPlaceholder: "E-Mail eingeben",
      subscribe: "Abonnieren",
      copyright: "Alle Rechte vorbehalten.",
      links: {
        searchBook: "Suchen & Buchen",
        myBookings: "Meine Buchungen",
        support: "Hilfe & Support",
        about: "Über Uns",
        careers: "Karriere",
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
        contact: "Kontakt"
      }
    },
    zh: {
      tagline: "您值得信赖的舒适巴士旅行伙伴",
      quickLinks: "快速链接",
      support: "支持",
      company: "公司",
      followUs: "关注我们",
      newsletter: "通讯",
      newsletterDesc: "订阅以获取新路线和优惠的更新",
      emailPlaceholder: "输入您的邮箱",
      subscribe: "订阅",
      copyright: "版权所有。",
      links: {
        searchBook: "搜索和预订",
        myBookings: "我的预订",
        support: "帮助与支持",
        about: "关于我们",
        careers: "职业机会",
        privacy: "隐私政策",
        terms: "服务条款",
        contact: "联系我们"
      }
    },
    ar: {
      tagline: "شريكك الموثوق للسفر المريح بالحافلة",
      quickLinks: "روابط سريعة",
      support: "الدعم",
      company: "الشركة",
      followUs: "تابعنا",
      newsletter: "النشرة الإخبارية",
      newsletterDesc: "اشترك للحصول على تحديثات حول الطرق الجديدة والعروض",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      subscribe: "اشتراك",
      copyright: "جميع الحقوق محفوظة.",
      links: {
        searchBook: "البحث والحجز",
        myBookings: "حجوزاتي",
        support: "المساعدة والدعم",
        about: "معلومات عنا",
        careers: "الوظائف",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        contact: "اتصل بنا"
      }
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" }
  ];

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    const email = e?.target?.email?.value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
    e?.target?.reset();
  };

  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bus" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">BusBooker Pro</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              {t?.tagline}
            </p>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">{t?.followUs}</h4>
              <div className="flex space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t?.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/landing-page"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.searchBook}
                </Link>
              </li>
              <li>
                <Link
                  to="/booking-management"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.myBookings}
                </Link>
              </li>
              <li>
                <Link
                  to="/user-dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/user-authentication"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t?.support}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/support"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.support}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.about}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.careers}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t?.links?.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t?.newsletter}</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {t?.newsletterDesc}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder={t?.emailPlaceholder}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={16} />
                <span>{t?.subscribe}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} BusBooker Pro. {t?.copyright}
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t?.links?.privacy}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t?.links?.terms}
              </a>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;