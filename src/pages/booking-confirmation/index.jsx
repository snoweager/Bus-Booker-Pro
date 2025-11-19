import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgress from '../../components/ui/BookingProgress';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ConfirmationHeader from './components/ConfirmationHeader';
import JourneyDetails from './components/JourneyDetails';
import PassengerInfo from './components/PassengerInfo';
import QRCodeSection from './components/QRCodeSection';
import TicketActions from './components/TicketActions';
import ImportantInfo from './components/ImportantInfo';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BookingConfirmation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Load booking data
  useEffect(() => {
    // Simulate loading booking data
    setTimeout(() => {
      const mockBookingData = {
        reference: "BB" + Math.random()?.toString(36)?.substr(2, 8)?.toUpperCase(),
        origin: "New York, NY",
        destination: "Washington, DC",
        date: "October 20, 2025",
        departureTime: "08:30 AM",
        arrivalTime: "01:15 PM",
        duration: "4h 45m",
        operator: "Greyhound Lines",
        busType: "Luxury Coach",
        seats: ["A1", "A2"],
        totalFare: 89.50,
        boardingPoint: "Port Authority Bus Terminal - Gate 15",
        boardingTime: "08:15 AM",
        droppingPoint: "Union Station - Platform 3",
        passengers: [
          {
            name: "John Smith",
            age: 32,
            gender: "Male",
            seat: "A1",
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567"
          },
          {
            name: "Sarah Smith",
            age: 28,
            gender: "Female",
            seat: "A2",
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567"
          }
        ]
      };

      setBookingData(mockBookingData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const translations = {
    en: {
      loading: 'Processing your booking...',
      backToHome: 'Back to Home',
      newBooking: 'Book Another Trip'
    },
    es: {
      loading: 'Procesando su reserva...',
      backToHome: 'Volver al Inicio',
      newBooking: 'Reservar Otro Viaje'
    },
    fr: {
      loading: 'Traitement de votre réservation...',
      backToHome: 'Retour à l\'Accueil',
      newBooking: 'Réserver un Autre Voyage'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const customBreadcrumbs = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Payment', path: '/payment-processing' },
    { label: 'Confirmation', path: '/booking-confirmation' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BookingProgress />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-center min-h-96">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{t?.loading}</h2>
              <p className="text-muted-foreground text-center">Please wait while we confirm your booking details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-center min-h-96">
              <Icon name="AlertTriangle" size={48} className="text-warning mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Booking Not Found</h2>
              <p className="text-muted-foreground text-center mb-6">We couldn't find your booking details. Please try again.</p>
              <Button
                variant="default"
                onClick={() => navigate('/landing-page')}
                iconName="Home"
                iconPosition="left"
              >
                {t?.backToHome}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgress />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
          </div>

          {/* Confirmation Header */}
          <div className="mb-8">
            <ConfirmationHeader 
              bookingReference={bookingData?.reference}
              language={currentLanguage}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Journey & Passenger Details */}
            <div className="lg:col-span-2 space-y-8">
              <JourneyDetails 
                journeyData={bookingData}
                language={currentLanguage}
              />
              
              <PassengerInfo 
                passengers={bookingData?.passengers}
                language={currentLanguage}
              />
              
              <ImportantInfo language={currentLanguage} />
            </div>

            {/* Right Column - QR Code & Actions */}
            <div className="space-y-8">
              <QRCodeSection 
                bookingReference={bookingData?.reference}
                language={currentLanguage}
              />
              
              <TicketActions 
                bookingData={bookingData}
                language={currentLanguage}
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/landing-page')}
                iconName="Home"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                {t?.backToHome}
              </Button>
              
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('/landing-page')}
                iconName="Plus"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                {t?.newBooking}
              </Button>
            </div>
          </div>

          {/* Success Animation */}
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-bounce">
                <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center opacity-0 animate-fade-in">
                  <Icon name="CheckCircle" size={48} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;