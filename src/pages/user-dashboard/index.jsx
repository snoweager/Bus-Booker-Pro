import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import UpcomingBookings from './components/UpcomingBookings';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import AccountSettings from './components/AccountSettings';

const UserDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Load language preference and user data on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/user-authentication';
    }
  }, []);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome back',
      overview: 'Overview',
      bookings: 'Bookings',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      lastLogin: 'Last login'
    },
    es: {
      dashboard: 'Panel de Control',
      welcome: 'Bienvenido de vuelta',
      overview: 'Resumen',
      bookings: 'Reservas',
      settings: 'Configuración',
      profile: 'Perfil',
      logout: 'Cerrar Sesión',
      lastLogin: 'Último acceso'
    },
    fr: {
      dashboard: 'Tableau de Bord',
      welcome: 'Bon retour',
      overview: 'Aperçu',
      bookings: 'Réservations',
      settings: 'Paramètres',
      profile: 'Profil',
      logout: 'Déconnexion',
      lastLogin: 'Dernière connexion'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  // Mock data
  const mockStats = {
    totalBookings: 24,
    upcomingTrips: 3,
    loyaltyPoints: 2450,
    totalSavings: 340
  };

  const mockUpcomingBookings = [
  {
    id: "BK001",
    bookingId: "BUS2024001",
    operatorName: "Express Travel Co",
    operatorLogo: "https://images.unsplash.com/photo-1727696647453-8fc8bf620432",
    busType: "Luxury AC Sleeper",
    origin: "New York",
    destination: "Boston",
    departureTime: "2024-10-16T08:30:00",
    arrivalTime: "2024-10-16T12:45:00",
    seatNumber: "A12",
    status: "Confirmed"
  },
  {
    id: "BK002",
    bookingId: "BUS2024002",
    operatorName: "Metro Bus Lines",
    operatorLogo: "https://images.unsplash.com/photo-1703342308086-1fe11ddefb82",
    busType: "Semi-Sleeper AC",
    origin: "Chicago",
    destination: "Detroit",
    departureTime: "2024-10-18T14:15:00",
    arrivalTime: "2024-10-18T19:30:00",
    seatNumber: "B08",
    status: "Confirmed"
  },
  {
    id: "BK003",
    bookingId: "BUS2024003",
    operatorName: "Comfort Coaches",
    operatorLogo: "https://images.unsplash.com/photo-1727696647453-8fc8bf620432",
    busType: "Executive AC",
    origin: "Los Angeles",
    destination: "San Francisco",
    departureTime: "2024-10-20T09:00:00",
    arrivalTime: "2024-10-20T15:30:00",
    seatNumber: "C15",
    status: "Pending"
  }];


  const mockRecentActivity = [
  {
    id: 1,
    type: "booking",
    title: "New booking confirmed",
    description: "Booking #BUS2024003 for Los Angeles to San Francisco",
    timestamp: "2024-10-15T10:30:00",
    amount: 85
  },
  {
    id: 2,
    type: "payment",
    title: "Payment processed",
    description: "Payment successful for booking #BUS2024002",
    timestamp: "2024-10-14T16:45:00",
    amount: 65
  },
  {
    id: 3,
    type: "modification",
    title: "Booking modified",
    description: "Seat changed from A10 to A12 for booking #BUS2024001",
    timestamp: "2024-10-13T09:15:00"
  },
  {
    id: 4,
    type: "refund",
    title: "Refund processed",
    description: "Refund of $45 processed for cancelled booking",
    timestamp: "2024-10-12T14:20:00",
    amount: 45
  },
  {
    id: 5,
    type: "cancellation",
    title: "Booking cancelled",
    description: "Booking #BUS2024000 cancelled successfully",
    timestamp: "2024-10-11T11:30:00"
  }];


  const mockFavoriteRoutes = [
  {
    id: 1,
    origin: "New York",
    destination: "Boston",
    lastBooked: "2024-10-01T00:00:00"
  },
  {
    id: 2,
    origin: "Chicago",
    destination: "Detroit",
    lastBooked: "2024-09-15T00:00:00"
  },
  {
    id: 3,
    origin: "Los Angeles",
    destination: "San Diego",
    lastBooked: "2024-09-01T00:00:00"
  }];


  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "2023-01-15T00:00:00",
    loyaltyPoints: 2450,
    tier: "Gold",
    currency: "USD",
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    lastLogin: "2024-10-15T08:30:00"
  };

  const currentUser = user || mockUser;

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/landing-page';
  };

  const getUserDisplayName = () => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser?.firstName} ${currentUser?.lastName}`;
    }
    return currentUser?.name || currentUser?.email || 'User';
  };

  const tabItems = [
  { id: 'overview', label: t?.overview, icon: 'LayoutDashboard' },
  { id: 'bookings', label: t?.bookings, icon: 'Calendar' },
  { id: 'settings', label: t?.settings, icon: 'Settings' }];


  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t?.dashboard}</h1>
              <p className="text-muted-foreground mt-1">
                {t?.welcome}, {getUserDisplayName()}
              </p>
              <p className="text-sm text-muted-foreground">
                {t?.lastLogin}: {new Date(currentUser.lastLogin)?.toLocaleString(currentLanguage)}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <Link to="/landing-page">
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Book New Trip
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} iconName="LogOut" iconPosition="left">
                {t?.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabItems?.map((tab) =>
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab?.id ?
              'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'}`
              }>

                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            )}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' &&
        <div className="space-y-8">
            {/* Stats */}
            <DashboardStats stats={mockStats} currentLanguage={currentLanguage} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Bookings and Activity */}
              <div className="lg:col-span-2 space-y-8">
                <UpcomingBookings bookings={mockUpcomingBookings} currentLanguage={currentLanguage} />
                <RecentActivity activities={mockRecentActivity} currentLanguage={currentLanguage} />
              </div>

              {/* Right Column - Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions
                currentLanguage={currentLanguage}
                favoriteRoutes={mockFavoriteRoutes} />

              </div>
            </div>
          </div>
        }

        {activeTab === 'bookings' &&
        <div className="space-y-8">
            <UpcomingBookings bookings={mockUpcomingBookings} currentLanguage={currentLanguage} />
            <div className="text-center py-8">
              <Link to="/booking-management">
                <Button variant="default" iconName="ArrowRight" iconPosition="right">
                  View All Bookings
                </Button>
              </Link>
            </div>
          </div>
        }

        {activeTab === 'settings' &&
        <AccountSettings
          user={currentUser}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange} />

        }
      </div>
    </div>);

};

export default UserDashboard;